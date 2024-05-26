import { Route } from 'react-router-dom';
import { lazy } from 'react';

const Users = lazy(() => import('./Users'));
const CreateUser = lazy(() => import('./CreateUser'));

export const useUserRoutes = () => {
    return (
        <>
            <Route path="/house/:houseId/users">
                <Route path="" element={<Users />} />
                <Route path=":roomId" element={<Users />} />
                <Route path="/house/:houseId/users/create" element={<CreateUser />} />
                {/* { itemRoutesSingleHouse } */}
            </Route>
        </>
    );
};

// export default AuthRoutes;