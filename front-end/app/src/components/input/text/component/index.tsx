import { CX, Styles }                      from "./styles";
import * as Types from "./types";

export const Text = (props: any) => {
    return (
        <p className={Styles.text}>{props.children}</p>
    )
}

export default Text;

export { CX, Styles, Types}

