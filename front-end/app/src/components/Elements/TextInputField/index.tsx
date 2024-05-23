import { useContext, useId } from "react";
import Styles from "./index.module.scss";
import * as Types from "./types";
import { ThemeContext, ThemeContextType } from "../../../providers";
import { classCombine } from "../../../@utils";
import { Label2 } from "../Label";
import { TextInput } from "../TextInput";


export const TextInputField = (
    {
        onChange,
        label,
        ...restProps
    }: Types.TextInputField) => {
    const theme = useContext<ThemeContextType>(ThemeContext);

    const id = useId();
    return (
        <div
            className={classCombine(Styles[theme.theme], Styles["text-input-field"])}
        >
            {
                label &&
                <Label2
                    htmlFor={id}
                >
                    {
                        label
                    }
                </Label2>
            }
            <TextInput
                {
                ...restProps
                }
                id={id}
                className={classCombine(Styles.input, Styles[theme.theme])}
                onChange={(value, e) => {
                    if (onChange) onChange(value, e);
                }
                }
                type={"text"}
            />
            {
                <div

                >
                    {
                        false && "error"
                    }
                </div>

            }
        </div>
    )
}


export default { TextInputField, Styles, Types }

