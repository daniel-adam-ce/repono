import { Suspense } from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import { useAuthRoutes } from '../features/auth';


export const PublicApp = () => {
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


export const usePublicRoutes = () => {
    const authRoutes = useAuthRoutes();

    return (
        <Route element={<PublicApp />}>
            { authRoutes }
            <Route path="*" element={<Navigate to={"/"}/>}/>
        </Route>
    )
}