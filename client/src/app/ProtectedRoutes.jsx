import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "../redux/api/authApi";
import PageLoader from "../components/PageLoader";

const ProtectedRoutes = () => {

    const { data, isLoading, isError } = useMeQuery();

    if (isLoading) {
        return <PageLoader/>;
    }

    if (isError || !data?.success) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;