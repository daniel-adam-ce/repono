import { Route, Routes } from 'react-router-dom';

import { Login } from './Login';
import { Landing } from '../../landing';

export const HouseRoutes = () => {
  return (
    <Routes>
      <Route path="/house" element={<Landing/>} />
    </Routes>
  );
};

// export default AuthRoutes;