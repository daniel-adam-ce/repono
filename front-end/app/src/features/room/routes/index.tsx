import { Route } from 'react-router-dom';

import { Landing } from '../../landing';
import { Dashboard } from '../../dashboard';
import { useItemRoutesSingleHouse, useItemRoutesGeneric } from '../../item';

export const useRoomRoutes = () => {
    const itemRoutesSingleHouse = useItemRoutesSingleHouse()
    const itemRoutesGeneric = useItemRoutesGeneric();
    return (
        <>
            <Route path="/house/:houseId/rooms">
                <Route path="" element={<Landing />} />
                <Route path=":roomId" element={<Dashboard />} />
                { itemRoutesSingleHouse }
            </Route>
            <Route path="/house/rooms">
                <Route path="" element={<Landing />} />
                <Route path=":roomId" element={<Dashboard />} />
                { itemRoutesGeneric }
            </Route>
            {/* <Route path="/house/rooms">
                <Route path="" element={<Landing />} />
                <Route path=":id" element={<Dashboard />} />
                {
                    itemRoutes
                }
            </Route> */}
        </>
    );
};

// export default AuthRoutes;