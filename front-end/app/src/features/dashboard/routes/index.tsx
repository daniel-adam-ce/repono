import { useItemRoutesGlobal } from '@/features';
import { GlobalApp } from '@/routes/protected';
import { lazy } from 'react';
import { Route } from 'react-router-dom';

const Dashboard = lazy(() => import('./Dashboard'));

export const useDashboardRoutes = () => {
    const itemRoutesGlobal = useItemRoutesGlobal()
    return (
        <>
            <Route element={<GlobalApp/>}>
                <Route path="/" element={<Dashboard />} />
                {
                    itemRoutesGlobal
                }
            </Route>

        </>
    );
};

export {
    Dashboard
}