import { useContext, useId } from "react";
import Styles from "./index.module.scss";
import * as Types from "./types";
import { ThemeContext, ThemeContextType } from "../../../providers";
import { classCombine } from "../../../@utils";
import { Label } from "../Label";


export const TextInputField = (
    {
        onChange,
        label,
        ...restProps
    }: Types.TextInputField) => {
    const theme = useContext<ThemeContextType>(ThemeContext);

    const id = useId();
    return (
        <div>
            {
                label &&
                <Label
                    htmlFor={id}
                >
                    {
                        label
                    }
                </Label>
            }
            <input
                {
                ...restProps
                }
                id={id}
                className={classCombine(Styles.input, Styles[theme.theme])}
                onChange={(e) => {
                    if (onChange) onChange(e.currentTarget.value, e)
                }
                }
                type={"text"}
            />
            {
                false && <div

                >

                </div>

            }
        </div>
    )
}


export default { TextInputField, Styles, Types }

