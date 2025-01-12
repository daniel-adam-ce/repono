import { Route, Routes } from 'react-router-dom';
import { usePublicRoutes, } from './public';
import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../providers';
import { useProtectedRoutes } from './protected';

export const AppRoutes = () => {
    const auth = useContext<AuthContextType>(AuthContext);
    const protectedRoutes = useProtectedRoutes();
    const publicRoutes = usePublicRoutes();
    
    return (
        <Routes>
            {
                auth.authenticating
                    ? <Route path={"*"} element={<div>authenticating</div>} />
                    : auth.authenticated
                        ? protectedRoutes
                        : publicRoutes
            }
        </Routes>
    );
};
