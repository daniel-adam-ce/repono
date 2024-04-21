import { useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../providers';

export const AppRoutes = () => {
    const auth = useContext<AuthContextType>(AuthContext);


    const routes = !auth.user ? publicRoutes : protectedRoutes;
    const element = useRoutes([...routes,]);

    return <>{auth.authenticating ? <div>loading...</div> : element}</>;
};
