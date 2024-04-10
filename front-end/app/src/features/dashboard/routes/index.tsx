import { Route, Routes } from 'react-router-dom';
import { Dashboard } from './Dashboard';


export const DashboardRoutes = () => {
  return (
        <Routes>
            <Route path="dashboard" element={<Dashboard/>} />
        </Routes>
    );
};

export { Dashboard };