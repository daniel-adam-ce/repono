import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



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

export const TanQueryProvider = ({ children }: any) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
