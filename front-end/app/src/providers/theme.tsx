import { Context, ReactNode, createContext, useCallback, useEffect, useState } from "react"

export type ThemeType = "light" | "dark";

export interface ThemeContextType {
    theme: ThemeType
};

export const ThemeContext: Context<ThemeContextType> = createContext<ThemeContextType>({
    theme: "light"
})

interface ThemeProviderProps {
    children: ReactNode
}



export const ThemeProvider = (props: ThemeProviderProps) => {
    const [theme, setTheme] = useState<ThemeType>("light");
    // const [user, setUser] = useState<any>(null);

    // const validateSession = useCallback(
    //     async () => {
    //         try {
    //             setAuthenticating(true);
    //             const res = await endpoints.session.getSession();
    //             console.log(res);
    //             setUser(res);
    //             setAuthenticated(true);
    //         } catch (error) {
    //             setAuthenticated(false);
    //             console.log(error);
    //         } finally {
    //             setAuthenticating(false);
    //         }
    //     }
    // , [])

    // useEffect(() => {
    //     validateSession();
    // }, [validateSession])


    return (
        <ThemeContext.Provider
            value={{
                theme
            }}
            children={props.children}
        />
    )
}