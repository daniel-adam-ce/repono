import Styles from "./index.module.scss";
import * as Types from "./types";
import { useContext } from "react";
import { ThemeContext, ThemeContextType } from "@/providers";
import { classCombine } from "@/@utils";

 interface ToolTipProps {
    children: React.ReactNode
    text: string
 }

export const ToolTip = ({children, text}: ToolTipProps) => {
    const themeContext = useContext<ThemeContextType>(ThemeContext);
    return (
        <div
            className={classCombine(Styles["tool-tip-wrapper"], Styles[themeContext.theme])}
        >
            {children}
            <div
                className={classCombine(Styles["tool-tip"], Styles[themeContext.theme])}
            >
                <div
                    className={classCombine(Styles["tool-tip-arrow"], Styles[themeContext.theme])}
                >

                </div>
                <div
                    className={classCombine(Styles["tool-tip-text"], Styles[themeContext.theme])}
                >
                    {text}
                </div>
            </div>
        </div>
    )
}

export default { ToolTip, Styles, Types }

