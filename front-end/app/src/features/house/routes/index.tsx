import { Navigate, Route, useParams } from 'react-router-dom';
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

const NavigateFromHouseId = () => {
    const { houseId } = useParams();
    return (
        <Navigate to={`/house/${houseId}/dashboard`}/>
    )
}

export const useHouseRoutes = () => {
    const roomRoutes = useRoomRoutes()
    return (
        <Route path="/house" element={<HouseRoutesApp />}>
            <Route path="" element={<Navigate to={"/"}/>} />
            <Route path=":houseId" element={<NavigateFromHouseId/>} />
            <Route path=":houseId/dashboard" element={<HouseDashboard />}/>
            <Route path=":houseId/settings" element={<HouseDashboard />}/>
            {
                roomRoutes
            }
        </Route>
    );
};