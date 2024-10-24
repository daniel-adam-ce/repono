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

export const ReponoTitleBase = () => {
    return (
        <div
            className={Styles.title}
        >
            Repono
        </div>

    )
}

// todo: refactor into just "ReponoTitle", make logo a prop
export const ReponoTitle = ({style, logo}: {style?: React.CSSProperties, logo?: boolean}) => {
    const navigate = useNavigate();
    return (
        <div
            className={Styles["title-wrapper"]}
            onClick={() => {
                navigate("/")
            }}
            style={{
                cursor: "pointer",
                ...(style ?? {})
            }}
        >
            {logo && <ReponoLogo/>}
            <ReponoTitleBase/>
        </div>
    )
}


export default { ReponoLogo, ReponoTitle, ReponoTitleBase, Styles, Types }

