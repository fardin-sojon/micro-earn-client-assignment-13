import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useRole from "../hooks/useRole";

const BuyerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [role, isRoleLoading] = useRole();
    const location = useLocation();

    if (loading || isRoleLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && role === 'buyer') {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default BuyerRoute;
