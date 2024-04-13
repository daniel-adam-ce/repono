import { useRoutes } from 'react-router-dom';

// import { Landing } from '@/features/misc';
// import { useAuth } from '@/lib/auth';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { Landing } from '../features/landing';

export const AppRoutes = () => {
//   const auth = useAuth();

    const commonRoutes = [{path: "/", element: <Landing/>}];

//   const routes = auth.user ? protectedRoutes : publicRoutes;

    const routes = [...publicRoutes, ...protectedRoutes];

    const element = useRoutes([...routes, ...commonRoutes]);

    return <>{element}</>;
};