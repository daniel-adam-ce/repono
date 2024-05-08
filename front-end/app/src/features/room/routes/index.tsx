import { Route } from 'react-router-dom';
import { useItemRoutesSingleHouse } from '../../item';
import { lazy } from 'react';

const Rooms = lazy(() => import('./Rooms'));
const CreateRoom = lazy(() => import('./CreateRoom'));

export const useRoomRoutes = () => {
    const itemRoutesSingleHouse = useItemRoutesSingleHouse()
    return (
        <>
            <Route path="/house/:houseId/rooms">
                <Route path="" element={<Rooms />} />
                <Route path=":roomId" element={<Rooms />} />
                <Route path="/house/:houseId/rooms/create" element={<CreateRoom />} />
                { itemRoutesSingleHouse }
            </Route>
        </>
    );
};

// export default AuthRoutes;