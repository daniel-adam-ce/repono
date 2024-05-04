// import React                    from "react";
// import type { BreakpointsType } from "../../";

// /***
//  * Get the breakpoint (xs, sm, md, lg, xl) from :before body
//  * @returns {string}
//  */
// export const getBreakpoint = (): BreakpointsType => {
//     return window.getComputedStyle( document.body, ":before" ).content.replaceAll( "\"", "" ) as BreakpointsType;
// };

// /**
//  * A custom hook to retrieve the current breakpoint value.
//  *
//  * @returns {BreakpointsType} The current breakpoint value.
//  */
// export function useBreakpoint(): BreakpointsType {
// 	const [breakpoint, setBreakpoint] = React.useState<BreakpointsType>(null);

// 	React.useEffect(() => {
// 		function handleResize() {
// 			const $bp: BreakpointsType = getBreakpoint();
// 			setBreakpoint($bp);
// 		}

// 		window.addEventListener("resize", handleResize);

// 		handleResize();

// 		return () => window.removeEventListener("resize", handleResize);
// 	}, []);

// 	return breakpoint;
// }

export {}