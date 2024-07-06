import { useContext } from "react";
import Styles from "./index.module.scss";
import * as Types from "./types";
import { ThemeProviderContext, ThemeProviderState } from "../../../providers";
import { classCombine } from "../../../@utils";


export const Label2 = (
    {
        ...restProps
    }: Types.LabelProps) => {
    const theme = useContext<ThemeProviderState>(ThemeProviderContext);
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

