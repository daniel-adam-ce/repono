import { Navigate, Outlet, Route } from 'react-router-dom';
import { useRoomRoutes } from '../../room';
import { HouseProvider } from '@/providers/house';
import { lazy } from 'react';
import { HouseApp } from '@/routes/protected';

const HouseRoutesApp = () => {
    return (
        <HouseProvider>
            <HouseApp/>
        </HouseProvider>
    )
}


const HouseDashboard = lazy(() => import('./HouseDashboard'));


export const useHouseRoutes = () => {
    const roomRoutes = useRoomRoutes()
    return (
        <Route path="/house" element={<HouseRoutesApp />}>
            <Route path="" element={<Navigate to={"/"}/>} />
            <Route path=":houseId" element={<HouseDashboard />} >
            </Route>
            {
                roomRoutes
            }
        </Route>
    );
};

// export default AuthRoutes;