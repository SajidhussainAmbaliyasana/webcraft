import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "../redux/api/authApi";
import PageLoader from "../components/PageLoader";

const PublicRoutes = () => {
    const { data, isLoading } = useMeQuery();

    if (isLoading) {
        return <PageLoader/>;
    }

    if (data?.success) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default PublicRoutes;