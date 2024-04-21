import { Suspense, } from 'react';
import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import { lazyImport } from '../@utils';
import { Dashboard } from '../features';

// const { Dashboard } = lazyImport(() => import('../features/dashboard'), 'Dashboard');
const { DashboardRoutes } = lazyImport(() => import('../features/dashboard'), "DashboardRoutes");
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

export const protectedRoutes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: "*", element: <Navigate to="."/>},
            { path: "", element: <Dashboard/> },
            { path: "test/*", element: <DashboardRoutes /> },
            // { path: '/app', element: <DashboardRoutes/> },
        ],
    },
    {
        path: "*",
        element: <Navigate to={"/"}/>
    }
];