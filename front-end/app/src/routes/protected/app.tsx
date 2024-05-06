import { AuthContext } from "@/providers";
import React, { ReactElement, Suspense, cloneElement, useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Styles from "./index.module.scss";
import { classCombine } from "@/@utils";
import { ReponoLogoTitle, ToolTip } from "@/components";
import { LuBox, LuDoorOpen } from "react-icons/lu";
import { RiDashboard3Line } from "react-icons/ri";
import { HouseContext } from "@/providers/house";
import { TbHome2, TbHomeStar } from "react-icons/tb";

interface NavButtonProps {
    icon: React.ReactNode;
    text: string;
    route?: string;
}

const NavButton = ({ icon, text }: NavButtonProps) => {
    const [temp, setTemp] = useState<boolean>(false);
    return (
        <li
            className={classCombine(Styles["nav-button-container"], temp ? Styles["active"] : "")}
            onClick={() => {
                setTemp(!temp);
            }}
        >
            <ToolTip
                text={text}
            >

                <a
                    className={classCombine(Styles["nav-button"], temp ? Styles["active"] : "")}
                >
                    {
                        cloneElement(icon as ReactElement, { size: 24 })
                    }
                </a>
            </ToolTip>
        </li>
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

const NavbarHouse = () => {
    return (
        <Navbar>
            <NavButton
                icon={<RiDashboard3Line />}
                text={"Dashboard"}
            />
            <NavButton
                icon={<LuDoorOpen />}
                text={"Rooms"}
            />
            <NavButton
                icon={<LuBox />}
                text={"Items"}
            />
            <NavButton
                icon={<TbHomeStar />}
                text={"House Settings"}
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
            />
            <NavButton
                icon={<LuBox />}
                text={"Items"}
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

                {house?.house && <select
                    defaultValue={house.house?.house_name}
                    onChange={(e) => {
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
                </select>}
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
                        {/* <Spinner size="xl" /> */}
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