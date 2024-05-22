import { AuthContext } from "@/providers";
import React, { ReactElement, Suspense, cloneElement, useContext } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import Styles from "./index.module.scss";
import { classCombine } from "@/@utils";
import { ReponoLogoTitle, ToolTip } from "@/components";
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
    return (
        <li
            className={classCombine(Styles["nav-button-container"])}
        >
            <ToolTip
                text={text}
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
    const { houseId } = useParams();
    return (
        <Navbar>
            <NavButton
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

                {house?.house && <select
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