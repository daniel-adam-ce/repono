import { Route } from 'react-router-dom';

import { Landing } from '../../landing';
import { useRoomRoutes } from '../../room';
import { Dashboard } from '../../dashboard';

export const useHouseRoutes = () => {
    const roomRoutes = useRoomRoutes()
    return (
        <Route path="/house">
            <Route path="" element={<Landing />} />
            <Route path=":id" element={<Dashboard />} >
            </Route>
            {
                roomRoutes
            }
        </Route>
    );
};

// export default AuthRoutes;