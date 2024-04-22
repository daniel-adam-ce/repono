import { lazy } from 'react';
import { Route } from 'react-router-dom';

const Dashboard = lazy(() => import('./Dashboard'));

export const useDashboardRoutes = () => {
    return (
        <>
            <Route path="/" element={<Dashboard />} />
        </>
    );
};

export {
    Dashboard
}