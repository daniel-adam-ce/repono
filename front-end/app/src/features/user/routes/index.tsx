import { Route } from 'react-router-dom';
import { lazy } from 'react';

const Users = lazy(() => import('./Users'));
// const CreateRoom = lazy(() => import('./CreateRoom'));

export const useUserRoutes = () => {
    return (
        <>
            <Route path="/house/:houseId/users">
                <Route path="" element={<Users />} />
                {/* <Route path=":roomId" element={<Rooms />} /> */}
                {/* <Route path="/house/:houseId/rooms/create" element={<CreateRoom />} /> */}
                {/* { itemRoutesSingleHouse } */}
            </Route>
        </>
    );
};

// export default AuthRoutes;