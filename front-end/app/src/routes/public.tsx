import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { lazyImport } from '../@utils';

const { AuthRoutes } = lazyImport(() => import('../features/auth'), "AuthRoutes");


export const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRoutes/>,
  },
];