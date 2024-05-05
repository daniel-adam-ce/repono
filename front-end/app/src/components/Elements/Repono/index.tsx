import Styles from "./index.module.scss";
import * as Types from "./types";
import { LuBoxes } from "react-icons/lu";


export const ReponoLogo = () => {
    return (
        <LuBoxes
            size={24}
            className={Styles.logo}
        />
    )
}

export const ReponoTitle = () => {
    return (
        <div
            className={Styles.title}
        >
            Repono
        </div>

    )
}

export const ReponoLogoTitle = () => {
    return (
        <div
            className={Styles["title-wrapper"]}
        >
            <ReponoLogo/>
            <ReponoTitle/>
        </div>
    )
}


export default { ReponoLogo, ReponoTitle, ReponoLogoTitle, Styles, Types }

