import Styles from "./index.module.scss";
import * as Types from "./types";
import { useContext } from "react";
import { ThemeProviderContext, ThemeProviderState } from "@/providers";
import { classCombine } from "@/@utils";

 interface ToolTipProps {
    children: React.ReactNode
    text: string
 }

export const ToolTip = ({children, text}: ToolTipProps) => {
    const theme = useContext<ThemeProviderState>(ThemeProviderContext);
    return (
        <div
            className={classCombine(Styles["tool-tip-wrapper"], Styles[theme.theme])}
        >
            {children}
            <div
                className={classCombine(Styles["tool-tip"], Styles[theme.theme])}
            >
                <div
                    className={classCombine(Styles["tool-tip-arrow"], Styles[theme.theme])}
                >

                </div>
                <div
                    className={classCombine(Styles["tool-tip-text"], Styles[theme.theme])}
                >
                    {text}
                </div>
            </div>
        </div>
    )
}

export default { ToolTip, Styles, Types }

