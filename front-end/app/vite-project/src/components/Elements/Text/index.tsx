import Styles from "./index.module.scss";
import * as Types from "./types";

export const Text = (props: any) => {
    return (
        <p className={Styles.text}>{props.children}</p>
    )
}

// export default ;

export default { Text, Styles, Types }

