import { useContext } from "react";
import Styles from "./index.module.scss";
import * as Types from "./types";
import { ThemeContext, ThemeContextType } from "../../../providers";
import { classCombine } from "../../../@utils";


export const Label = (
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


export default { Label, Styles, Types }

