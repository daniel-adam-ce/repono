import { useContext } from "react";
import Styles from "./index.module.scss";
import * as Types from "./types";
import { ThemeProviderContext, ThemeProviderState } from "../../../providers";
import { classCombine } from "../../../@utils";


export const TextInput = (
    {
        onChange,
        label,
        ...restProps
    }: Types.TextInputProps) => {
    const theme = useContext<ThemeProviderState>(ThemeProviderContext);
    return (
        <input
            {
                ...restProps
            }
            className={classCombine(Styles.input, Styles[theme.theme])}
            onChange={(e) => {
                if (onChange) onChange(e.currentTarget.value, e)}
            }
            type={"text"}
        />
    )
}


export default { TextInput, Styles, Types }

