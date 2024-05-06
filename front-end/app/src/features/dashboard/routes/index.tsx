import { GlobalApp } from '@/routes/protected';
import { Suspense, lazy } from 'react';
import { Outlet, Route } from 'react-router-dom';

const Dashboard = lazy(() => import('./Dashboard'));


export const useDashboardRoutes = () => {
    return (
        <>
            <Route element={<GlobalApp/>}>

                <Route path="/" element={<Dashboard />} />
            </Route>

        </>
    );
};

export {
    Dashboard
}