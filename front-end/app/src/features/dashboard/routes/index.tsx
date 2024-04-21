import { Route, Routes } from 'react-router-dom';
import { Dashboard } from './Dashboard';


export const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path="/test" element={<div>test123</div>} />
            <Route path="" element={<Dashboard />} />
            <Route path=":id" element={<Dashboard />} />
        </Routes>
    );
};

export { Dashboard };