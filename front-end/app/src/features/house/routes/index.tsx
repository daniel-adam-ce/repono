import { Navigate, Route, useParams } from 'react-router-dom';
import { useRoomRoutes } from '../../room';
import { HouseProvider } from '@/providers/house';
import { lazy } from 'react';
import { HouseApp } from '@/routes/protected';
import { useItemRoutesGeneric } from '@/features/item';
import { useUserRoutes } from '@/features/user';

const HouseRoutesApp = () => {
    return (
        <HouseProvider>
            <HouseApp/>
        </HouseProvider>
    )
}

const HouseDashboard = lazy(() => import('./HouseDashboard'));
const HouseSettings = lazy(() => import('./HouseSettings'));

const NavigateFromHouseId = () => {
    const { houseId } = useParams();
    return (
        <Navigate to={`/house/${houseId}/dashboard`}/>
    )
}

export const useHouseRoutes = () => {
    const roomRoutes = useRoomRoutes()
    const itemRoutesGeneric = useItemRoutesGeneric();
    const userRoutes = useUserRoutes();
    return (
        <Route path="/house" element={<HouseRoutesApp />}>
            <Route path="" element={<Navigate to={"/"}/>} />
            <Route path=":houseId" element={<NavigateFromHouseId/>} />
            <Route path=":houseId/dashboard" element={<HouseDashboard />}/>
            <Route path=":houseId/settings" element={<HouseSettings />}/>
            {
                roomRoutes
            }
            {
                itemRoutesGeneric
            }
            {
                userRoutes
            }
        </Route>
    );
};