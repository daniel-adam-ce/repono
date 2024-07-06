import { AuthContext } from "@/providers";
import React, { ReactElement, Suspense, cloneElement, useContext, useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import Styles from "./index.module.scss";
import { classCombine } from "@/@utils";
import { ReponoLogoTitle, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Toggle, Tooltip, ToolTip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components";
import { LuBox, LuDoorOpen } from "react-icons/lu";
import { RiDashboard3Line } from "react-icons/ri";
import { HouseContext } from "@/providers/house";
import { TbHome2, TbHomeStar, TbUsers } from "react-icons/tb";

interface NavButtonProps {
    icon: React.ReactNode;
    text: string;
    to: string;
}

const NavButton = ({ icon, text, to }: NavButtonProps) => {
    const navLinkRef = useRef<HTMLAnchorElement>(null);
    return (
        <li
            className={classCombine(Styles["nav-button-container"])}
        >
            <ToolTip
                text={text}
            >

                <NavLink
                    ref={navLinkRef}
                    to={to}
                    className={({ isActive }) => {
                        return classCombine(Styles["nav-button"], isActive ? Styles["active"] : "")
                    }}

                >
                    {
                        cloneElement(icon as ReactElement, { size: 24 })
                    }
                </NavLink>
            </ToolTip>
        </li>
    )
}

const NavButton2 = ({ icon, text, to }: NavButtonProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger
                    asChild
                    datatype={"instant-open"}
                >
                    <li
                        className={classCombine(Styles["nav-button-container"])}
                    >
                        <NavLink
                            to={to}
                            className={({ isActive }) => {
                                return classCombine(Styles["nav-button"], isActive ? Styles["active"] : "")
                            }}

                        >
                            {
                                cloneElement(icon as ReactElement, { size: 24 })
                            }
                        </NavLink>
                    </li>
                </TooltipTrigger>
                <TooltipContent
                    side={"bottom"}
                >
                    <p>{text}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

const Navbar = (props: { children: React.ReactNode }) => {
    return (

        <nav
            className={Styles["nav"]}
        >
            <ul
                className={Styles["nav-list"]}
            >
                {
                    props.children
                }
            </ul>
        </nav>
    )
}

const Navbar2 = (props: { children: React.ReactNode }) => {
    return (

        <nav
            className={Styles["nav2"]}
        >
            <ul
                className={Styles["nav-list2"]}
            >
                {
                    props.children
                }
            </ul>
        </nav>
    )
}

const NavbarHouse = () => {
    const { houseId } = useParams();
    return (
        <Navbar>
            <NavButton2
                icon={<RiDashboard3Line />}
                text={"Dashboard"}
                to={`${houseId}/dashboard`}
            />
            <NavButton
                icon={<LuDoorOpen />}
                text={"Rooms"}
                to={`${houseId}/rooms`}
            />
            <NavButton
                icon={<LuBox />}
                text={"Items"}
                to={`${houseId}/items`}
            />
            <NavButton
                icon={<TbUsers />}
                text={"Users"}
                to={`${houseId}/users`}
            />
            <NavButton
                icon={<TbHomeStar />}
                text={"House Settings"}
                to={`${houseId}/settings`}
            />
        </Navbar>
    )
}



const NavbarGlobal = () => {
    return (
        <Navbar>
            <NavButton
                icon={<TbHome2 />}
                text={"Houses"}
                to={"/"}
            />
            <NavButton
                icon={<LuBox />}
                text={"Items"}
                to={"/items"}
            />
        </Navbar>
    )
}


const Header = () => {
    const auth = useContext(AuthContext);
    const house = useContext(HouseContext);
    const navigate = useNavigate();
    return (
        <header
            className={Styles["nav-header"]}
        >
            <div>
                <Select
                    value={(house.house?.house_id).toString()}
                    onValueChange={(value) => {
                        console.log(value)
                        if (value !== "-1") {
                            navigate(`/house/${value}`);
                        } else {
                            navigate("/")
                        }
                    }}
                    
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="House" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {/* <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem> */}

                            {
                                auth.houses.map((house) => {
                                    return (
                                        <SelectItem
                                            value={(house.house_id).toString()}
                                            key={house.house_id}
                                        >
                                            {
                                                `${house.house_id}-${house.house_name}`
                                            }
                                        </SelectItem>
                                    )
                                })
                            }
                            <SelectItem
                                value={"-1"}
                                key={"dashboard"}
                            >
                                dashboard
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {/* {house?.house && <select
                    value={house.house?.house_id}
                    onChange={(e) => {
                        console.log(e.currentTarget.value);
                        if (e.currentTarget.value) {
                            navigate(`/house/${e.currentTarget.value}`);
                        } else {
                            navigate("/")
                        }
                    }}
                >
                    {
                        auth.houses.map((house) => {
                            return (
                                <option
                                    value={house.house_id}
                                    key={house.house_id}
                                >
                                    {
                                        `${house.house_id}-${house.house_name}`
                                    }
                                </option>
                            )
                        })
                    }
                    <option
                        value={""}
                        key={"dashboard"}
                    >
                        dashboard
                    </option>
                </select>} */}
            </div>
            <ReponoLogoTitle />
            <button
                onClick={() => {
                    auth.logout();
                }}
            >
                logout
            </button>
        </header>
    )
}

const Main = (props: { children: React.ReactNode }) => {
    return (

        <div
            className={Styles["main"]}
        >
            {
                props.children
            }
        </div>
    )
}

const Content = () => {
    return (
        <div
            className={classCombine(Styles.content)}
        >
            <Suspense
                fallback={
                    <div>
                        suspense 2
                    </div>
                }
            >
                <Outlet />
            </Suspense>
        </div>
    )
}

export const GlobalApp = () => {
    return (
        <>
            <Header />
            <Main>
                <NavbarGlobal />
                <Content />
            </Main>
        </>
    )
}


export const HouseApp = () => {
    return (
        <>
            <Header />
            <Main>
                <NavbarHouse />
                <Content />
            </Main>
        </>
    )
}

export const ProtectedApp = () => {
    return (
        <div
            className={Styles["protected-shell"]}
        >
            <Outlet />
        </div>
    );
};