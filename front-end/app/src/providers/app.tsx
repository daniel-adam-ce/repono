import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './auth';
import { ThemeProvider } from './theme';
import { TanQueryProvider } from './query';

type AppProviderProps = {
    children: React.ReactNode;
};


export const AppProvider = ({ children }: AppProviderProps) => {

    return (
        <Suspense
            fallback={
                <div>
                    suspense
                </div>
            }
        >
            <TanQueryProvider
            >
                <AuthProvider>
                    <ThemeProvider>
                        {/* <HouseProvider> */}
                            <Router>
                                {
                                    children
                                }
                            </Router>
                        {/* </HouseProvider> */}
                    </ThemeProvider>
                </AuthProvider>
            </TanQueryProvider>
        </Suspense>
    )
}

export { }