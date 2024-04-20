import { useRoutes } from 'react-router-dom';

// import { Landing } from '@/features/misc';
// import { useAuth } from '@/lib/auth';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { Landing } from '../features/landing';
import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../providers';

export const AppRoutes = () => {
//   const auth = useAuth();
    const auth = useContext<AuthContextType>(AuthContext);

    const routes = auth.user ? protectedRoutes : publicRoutes;
    const element = useRoutes([...routes,]);

    return <>{element}</>;
};