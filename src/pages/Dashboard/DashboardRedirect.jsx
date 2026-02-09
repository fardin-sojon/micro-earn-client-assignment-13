import { Navigate } from "react-router-dom";
import useRole from "../../hooks/useRole";

const DashboardRedirect = () => {
    const [role, isRoleLoading] = useRole();

    if (isRoleLoading) return <div className="flex justify-center items-center h-full"><span className="loading loading-spinner loading-lg"></span></div>;

    if (role === 'admin') return <Navigate to="/dashboard/admin-home" replace />;
    if (role === 'buyer') return <Navigate to="/dashboard/buyer-home" replace />;
    if (role === 'worker') return <Navigate to="/dashboard/worker-home" replace />;

    return <Navigate to="/" replace />;
};

export default DashboardRedirect;
