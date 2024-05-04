import { AuthContext } from "@/providers";
import { Suspense, useContext } from "react";
import { Outlet } from "react-router-dom";
import Styles from "./index.module.scss";
import { classCombine } from "@/@utils";
import { LuBoxes } from "react-icons/lu";

export const ProtectedApp = () => {
    const auth = useContext(AuthContext);
    return (
        <div
            className={Styles["protected-shell"]}
        >
            <div
                className={Styles.header}
            >
                <div>
                    selector
                </div>
                <div
                    className={Styles["title-wrapper"]}
                >
                    <LuBoxes size={24}/>
                    Repono
                </div>
                <button
                    onClick={() => {
                        auth.logout();
                    }}
                >
                    logout
                </button>
            </div>
            <div
                className={Styles["content-wrapper"]}
            >
                <div
                    className={Styles["nav"]}
                >
                    A
                </div>
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