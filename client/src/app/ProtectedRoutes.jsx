import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "../redux/api/authApi";

const ProtectedRoutes = () => {

    const { data, isLoading, isError } = useMeQuery();

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (isError || !data?.success) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;