import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "../redux/api/authApi";

const PublicRoutes = () => {
    const { data, isLoading } = useMeQuery();

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (data?.success) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default PublicRoutes;