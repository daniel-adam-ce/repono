import { useDashboardRoutes, useHouseRoutes } from "@/features";
import { ProtectedApp } from "./app";
import { Route } from "react-router-dom";

export const useProtectedRoutes = () => {
    const dashboardRoutes = useDashboardRoutes();
    const houseRoutes = useHouseRoutes();

    return (
        <Route element={<ProtectedApp />}>
            {dashboardRoutes}
            {houseRoutes}
            <Route path="*" element={<div>not found</div>} />
        </Route>
    )
}

export * from "./app";