import Styles from "./index.module.scss";
import * as Types from "./types";

export const Input = (props: any) => {
    return (
        <p className={Styles.text}>{props.children}</p>
    )
}


export default { Input, Styles, Types }

