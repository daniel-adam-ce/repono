import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    return (
        <div
            className={Styles["title-wrapper"]}
            onClick={() => {
                navigate("/")
            }}
            style={{
                cursor: "pointer",
            }}
        >
            <ReponoLogo/>
            <ReponoTitle/>
        </div>
    )
}


export default { ReponoLogo, ReponoTitle, ReponoLogoTitle, Styles, Types }

