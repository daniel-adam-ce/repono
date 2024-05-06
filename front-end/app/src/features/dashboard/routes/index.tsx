import { GlobalApp } from '@/routes/protected';
import { lazy } from 'react';
import { Route } from 'react-router-dom';

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