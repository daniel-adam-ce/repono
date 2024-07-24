import Styles from "./index.module.scss";
import * as Types from "./types";

export const Center = (props: Types.CenterProps) => {
    return (
        <div
            className={Styles["center-parent"]}
        >
            <div
                className={"w-full sm:w-9/12 md:w-6/12 lg:w-4/12"}
                // ref={centerRef}
            >
                {
                    props.children
                }
            </div>
        </div>
    )
}


export default { Center, Styles, Types }

