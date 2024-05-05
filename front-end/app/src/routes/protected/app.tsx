import { AuthContext } from "@/providers";
import { ReactElement, Suspense, cloneElement, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Styles from "./index.module.scss";
import { classCombine } from "@/@utils";
import { ReponoLogoTitle, ToolTip } from "@/components";
import { LuBox, LuDoorOpen } from "react-icons/lu";
import { RiDashboard3Line } from "react-icons/ri";

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

const NavBar = () => {
    return (
        <nav
            className={Styles["nav"]}
        >
            <ul
                className={Styles["nav-list"]}
            >
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
            </ul>
        </nav>
    )
}


const Header = () => {
    const auth = useContext(AuthContext);
    return (
        <header
            className={Styles["nav-header"]}
        >
            <div>
                selector
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

export const ProtectedApp = () => {
    return (
        <div
            className={Styles["protected-shell"]}
        >
            <Header />
            <div
                className={Styles["main"]}
            >
                <NavBar />
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
            </div>
        </div>
    );
};