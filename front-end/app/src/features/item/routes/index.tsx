import { Route } from 'react-router-dom';

import { Landing } from '../../landing';
import { Dashboard } from '../../dashboard';

export const useItemRoutesSingleHouse = () => {
    return (
        <>
            <Route path="/house/:id/rooms/:id/items">
                <Route path="" element={<Landing />} />
                <Route path=":id" element={<Dashboard />} />
            </Route>
            <Route path="/house/:id/rooms/items">
                <Route path="" element={<Landing />} />
                <Route path=":id" element={<Dashboard />} />
            </Route>

        </>
    );
};

export const useItemRoutesGeneric = () => {
    return (
        <>
            <Route path="/house/rooms/items">
                <Route path="" element={<Landing />} />
                <Route path=":id" element={<Dashboard />} />
            </Route>

            <Route path="/house/rooms/:id/items">
                <Route path="" element={<Landing />} />
                <Route path=":id" element={<Dashboard />} />
            </Route>
        </>
    )
}

// export default AuthRoutes;