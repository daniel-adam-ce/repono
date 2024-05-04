import { classCombine } from "../../@utils";
import Styles from "./index.module.scss";
import * as Types from "./types";

export const ProtectedShell = (props: any) => {
    return (
        <div
            className={classCombine(Styles["outer-shell-protected"])}
        >
            
        </div>
    )
}


export default { ProtectedShell, Styles, Types }

