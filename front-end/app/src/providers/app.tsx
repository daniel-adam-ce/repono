import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './theme';
import { HouseProvider } from './house';

type AppProviderProps = {
    children: React.ReactNode;
};

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1 * 60 * 60 * 1000,
            refetchOnWindowFocus: false,
            refetchInterval: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
        }
    }
});

export const AppProvider = ({ children }: AppProviderProps) => {

    return (
        <Suspense
            fallback={
                <div>
                    suspense
                </div>
            }
        >
            <QueryClientProvider
                client={queryClient}
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
            </QueryClientProvider>
        </Suspense>
    )
}

export { }