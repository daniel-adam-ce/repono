import { Route, Routes } from 'react-router-dom';

import { Login } from './Login';
import { Landing } from '../../landing';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Landing/>} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

// export default AuthRoutes;