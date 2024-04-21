import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { lazyImport } from '../@utils';
import { Landing } from '../features/landing';
import Login from '../features/auth/routes/Login';

const { AuthRoutes } = lazyImport(() => import('../features/auth'), "AuthRoutes");

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

export const publicRoutes = [
    {
        path: '/',
        element: <App />,
        children: [
            // { path: "*", element: <div>not found</div> },
            { path: '', element: <Landing /> },
            { path: '/login', element: <Login /> },
            // { path: "", element: <AuthRoutes/> }
        ],
    },
];