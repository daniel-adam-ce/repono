import { useContext } from "react";
import Styles from "./index.module.scss";
import * as Types from "./types";
import { ThemeContext, ThemeContextType } from "../../../providers";
import { classCombine } from "../../../@utils";


export const Label2 = (
    {
        ...restProps
    }: Types.LabelProps) => {
    const theme = useContext<ThemeContextType>(ThemeContext);
    return (
        <label
            {
                ...restProps
            }
            className={classCombine(Styles.label, Styles[theme.theme])}
        />
    )
}


export default { Label2, Styles, Types }

