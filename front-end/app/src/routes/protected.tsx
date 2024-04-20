import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { lazyImport } from '../@utils';

const { Dashboard } = lazyImport(() => import('../features/dashboard'), 'Dashboard');
// const { Profile } = lazyImport(() => import('@/features/users'), 'Profile');

// const { Dashboard } = lazy( async () => import("../features/dashboard") );

const App = () => {
    return (
        <div>
            <div>

            </div>
            <div>
                <Suspense
                    fallback={
                        <div>
                            {/* <Spinner size="xl" /> */}
                            suspense 2
                        </div>
                    }
                >
                    <Outlet />
                </Suspense>
            </div>
        </div>
    );
};

export const protectedRoutes = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <Dashboard /> },
        ],
    },
];