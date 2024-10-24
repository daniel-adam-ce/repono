import { lazy } from 'react';
import { Route } from 'react-router-dom';

const Login = lazy(() => import('./Login'));
// const Landing = lazy(() => import('../../landing/routes/Landing'));

export const useAuthRoutes = () => {
  return (
    <>
      {/* <Route path="" element={<Landing />} /> */}
      <Route path="/" element={<Login />} />
    </>
  );
};
