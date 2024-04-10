import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { lazyImport } from '../@utils';

// const { DiscussionsRoutes } = lazyImport(
//   () => import('@/features/discussions'),
//   'DiscussionsRoutes'
// );
const { Dashboard } = lazyImport(() => import('../features/dashboard'), 'Dashboard');
// const { Profile } = lazyImport(() => import('@/features/users'), 'Profile');

// const { Dashboard } = lazy( async () => import("../features/dashboard") );

const App = () => {
    return (
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
    );
};

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
        { path: '/app/dashboard', element: <Dashboard/> },
    ],
  },
];