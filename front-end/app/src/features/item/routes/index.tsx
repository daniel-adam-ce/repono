import { Route, Routes } from 'react-router-dom';

import { Landing } from '../../landing';
import { Dashboard } from '../../dashboard';

export const HouseRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<Landing />} />
            <Route path="/:id">
                <Route index element={<Dashboard/>}/>
                <Route path="/:id/rooms" element={<Landing/>}/>
            </Route>
        </Routes>
    );
};

// export default AuthRoutes;