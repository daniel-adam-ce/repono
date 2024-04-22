import { Route, Routes } from 'react-router-dom';
import { useProtectedRoutes } from './protected';
import { usePublicRoutes,  } from './public';
import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../providers';

export const AppRoutes = () => {
    const auth = useContext<AuthContextType>(AuthContext);
    const protectedRoutes = useProtectedRoutes();
    const publicRoutes = usePublicRoutes();
    // const element = useRoutes([...routes,]);

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
