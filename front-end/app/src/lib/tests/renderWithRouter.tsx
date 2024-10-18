import { TanQueryProvider } from "@/providers/query"
import { MemoryRouter, Route, Routes } from "react-router-dom"

export function RouterWrapper(
    {
        children,
        initialEntries,
        path
    }: {
        children: React.ReactNode
        initialEntries: string[]
        path: string
    }
): JSX.Element {
    return (
        <TanQueryProvider>
            <MemoryRouter initialEntries={initialEntries}>
                <Routes>
                    <Route path={path} element={children}/>
                </Routes>
            </MemoryRouter>
        </TanQueryProvider>
    )
}