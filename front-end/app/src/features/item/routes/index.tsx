import { Route } from 'react-router-dom';

import { Landing } from '../../landing';
import { Dashboard } from '../../dashboard';

export const useItemRoutesSingleHouse = () => {
    return (
        <>
            <Route path="/house/:houseId/rooms/:roomId/items">
                <Route path="" element={<Landing />} />
                <Route path=":itemId" element={<Dashboard />} />
            </Route>
            <Route path="/house/:houseId/rooms/items">
                <Route path="" element={<Landing />} />
                <Route path=":itemId" element={<Dashboard />} />
            </Route>

        </>
    );
};

export const useItemRoutesGeneric = () => {
    return (
        <>
            <Route path="/house/rooms/items">
                <Route path="" element={<Landing />} />
                <Route path=":itemId" element={<Dashboard />} />
            </Route>

            <Route path="/house/rooms/:id/items">
                <Route path="" element={<Landing />} />
                <Route path=":roomId" element={<Dashboard />} />
            </Route>
        </>
    )
}

// export default AuthRoutes;