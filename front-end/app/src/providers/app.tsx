import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

export const AppProvider = ({children}: AppProviderProps) => {

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
                    <Router>
                        {
                            children
                        }
                    </Router>
                </AuthProvider>
            </QueryClientProvider>
        </Suspense>
    )
}

export {}