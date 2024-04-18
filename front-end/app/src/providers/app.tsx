import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ErrorBoundary } from 'react-error-boundary';
// import { HelmetProvider } from 'react-helmet-async';
// import { QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
// import { BrowserRouter as Router } from 'react-router-dom';

// import { Button, Spinner } from '@/components/Elements';
// import { Notifications } from '@/components/Notifications/Notifications';
// import { AuthProvider } from '@/lib/auth';
// import { queryClient } from '@/lib/react-query';

// const ErrorFallback = () => {
//   return (
//     <div
//       className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
//       role="alert"
//     >
//       <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
//       <Button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
//         Refresh
//       </Button>
//     </div>
//   );
// };

// type AppProviderProps = {
//   children: React.ReactNode;
// };

// export const AppProvider = ({ children }: AppProviderProps) => {
//   return (
//     <React.Suspense
//       fallback={
//         <div className="flex items-center justify-center w-screen h-screen">
//           <Spinner size="xl" />
//         </div>
//       }
//     >
//       <ErrorBoundary FallbackComponent={ErrorFallback}>
//         <HelmetProvider>
//           <QueryClientProvider client={queryClient}>
//             {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
//             <Notifications />
//             <AuthProvider>
//               <Router>{children}</Router>
//             </AuthProvider>
//           </QueryClientProvider>
//         </HelmetProvider>
//       </ErrorBoundary>
//     </React.Suspense>
//   );
// };

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