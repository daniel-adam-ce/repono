import { Suspense, } from 'react';
import { Outlet, Route } from 'react-router-dom';
import { useDashboardRoutes, useHouseRoutes } from '../features';

export const ProtectedApp = () => {
    return (
        <div>
            <div>
                nav
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

export const useProtectedRoutes = () => {
    const dashboardRoutes = useDashboardRoutes();
    const houseRoutes = useHouseRoutes();
    return (
        <Route element={<ProtectedApp />}>
            { dashboardRoutes }
            { houseRoutes }
            <Route path="*" element={<div>not found</div>}/>
        </Route>
    )
}