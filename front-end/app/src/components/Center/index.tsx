import { useEffect, useRef } from "react";
import Styles from "./index.module.scss";
import * as Types from "./types";

export const Center = (props: Types.CenterProps) => {
    const centerRef = useRef<HTMLDivElement>(null);

    const handleResize = () => {
        // console.log("resize")
        const windowWidth = window.innerWidth;
        // console.log(windowWidth, centerRef?.current?.style?.width )
        if (centerRef.current) {
            if (windowWidth > 1000) {
                if (centerRef.current.style.width !== "33%") centerRef.current.style.width = "33%";
            } else if (windowWidth > 800) {
                if (centerRef.current.style.width !== "50%") centerRef.current.style.width = "50%";
            } else if (windowWidth > 600) {
                if (centerRef.current.style.width !== "75%") centerRef.current.style.width = "75%";
            } else if (windowWidth > 200) {
                if (centerRef.current.style.width !== "100%") centerRef.current.style.width = "100%";
            } 
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])
    return (
        <div
            className={Styles["center-parent"]}
        >
            <div
                className={Styles.center}
                ref={centerRef}
            >
                {
                    props.children
                }
            </div>
        </div>
    )
}


export default { Center, Styles, Types }

