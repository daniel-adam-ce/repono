import { Route } from 'react-router-dom';

import { Landing } from '../../landing';
import { Dashboard } from '../../dashboard';
import { lazy } from 'react';

const Items = lazy(() => import("./Items"));
const CreateItem = lazy(() => import("./CreateItem"));
const EditItem = lazy(() => import("./EditItem"));

export const useItemRoutesSingleHouse = () => {
    return (
        <>
            <Route path="/house/:houseId/rooms/:roomId/items">
                <Route path="" element={<Landing />} />
                <Route path=":itemId" element={<EditItem />} />
                <Route path="/house/:houseId/rooms/:roomId/items/create" element={<CreateItem />} />
            </Route>
            <Route path="/house/:houseId/rooms/items">
                <Route path="" element={<Landing />} />
                <Route path=":itemId" element={<EditItem />} />
            </Route>
        </>
    );
};

export const useItemRoutesGeneric = () => {
    return (
        <>
            <Route path="/house/:houseId/items">
                <Route path="" element={<Items />} />
                <Route path=":itemId" element={<EditItem />} />
                <Route path="/house/:houseId/items/create" element={<CreateItem />} />
            </Route>
        </>
    )
}

export const useItemRoutesGlobal = () => {
    return (
        <>
            <Route path="/items">
                <Route path="" element={<Items />} />
                <Route path=":itemId" element={<EditItem />} />
                {/* <Route path="/house/:houseId/items/create" element={<CreateItem />} /> */}
            </Route>
        </>
    )
}

// export default AuthRoutes;