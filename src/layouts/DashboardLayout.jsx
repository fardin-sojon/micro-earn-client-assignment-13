import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils, FaWallet, FaSignOutAlt } from "react-icons/fa";
import useRole from "../hooks/useRole";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import logo from "../assets/logo.svg";


const DashboardLayout = () => {
    // const [isAdmin] = useAdmin();
    // const [isBuyer] = useBuyer();
    // const [isWorker] = useWorker();

    // logic to determine role, for now using placeholder or assuming user role from context if available, 
    // but hooks are better. 
    // Since hooks depend on backend, and backend logic is not fully there for "admin/email", I will rely on the role in the hooks or user object if available.
    // For now, let's assume the hooks work or I will fix them.

    // Actually, I need to implement the backend endpoints for these hooks to work.

    const { user, logOut, loading } = useContext(AuthContext);
    const [role, isRoleLoading] = useRole();
    const isAdmin = role === 'admin';
    const isBuyer = role === 'buyer';
    const isWorker = role === 'worker';
    const navigate = useNavigate();

    if (loading || isRoleLoading) {
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    const handleLogout = () => {
        logOut()
            .then(() => {
                console.log("Logged out successfully");
                navigate('/');
            })
            .catch(error => console.error(error));
    }

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="min-h-screen w-64 bg-orange-400">
                <div className="p-4">
                    <Link to="/" className="btn btn-ghost">
                        <img src={logo} alt="Micro Earn Logo" className="w-21 h-10" />
                    </Link>
                    <p className="text-sm ml-5">Earn Money by Tasks</p>
                </div>
                <ul className="menu p-4 w-64 min-h-full bg-orange-400 text-base-content">
                    {
                        isAdmin && <>
                            <li><NavLink to="/dashboard/admin-home"><FaHome></FaHome> Admin Home</NavLink></li>
                            <li><NavLink to="/dashboard/manage-users"><FaUsers></FaUsers> Manage Users</NavLink></li>
                            <li><NavLink to="/dashboard/manage-tasks"><FaList></FaList> Manage Tasks</NavLink></li>
                            <li><NavLink to="/dashboard/withdraw-requests"><FaWallet></FaWallet> Withdraw Requests</NavLink></li>
                        </>
                    }
                    {
                        isBuyer && <>
                            <li><NavLink to="/dashboard/buyer-home"><FaHome></FaHome> Buyer Home</NavLink></li>
                            <li><NavLink to="/dashboard/add-task"><FaUtensils></FaUtensils> Add New Tasks</NavLink></li>
                            <li><NavLink to="/dashboard/my-tasks"><FaList></FaList> My Tasks</NavLink></li>
                            <li><NavLink to="/dashboard/purchase-coin"><FaShoppingCart></FaShoppingCart> Purchase Coin</NavLink></li>
                            <li><NavLink to="/dashboard/payment-history"><FaList></FaList> Payment History</NavLink></li>
                            <li><NavLink to="/dashboard/task-to-review"><FaList></FaList> Task To Review</NavLink></li>
                        </>
                    }
                    {
                        isWorker && <>
                            <li><NavLink to="/dashboard/worker-home"><FaHome></FaHome> Worker Home</NavLink></li>
                            <li><NavLink to="/dashboard/task-list"><FaList></FaList> TaskList</NavLink></li>
                            <li><NavLink to="/dashboard/my-submissions"><FaList></FaList> My Submissions</NavLink></li>
                            <li><NavLink to="/dashboard/withdrawals"><FaWallet></FaWallet> Withdrawals</NavLink></li>
                        </>
                    }
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="flex items-center gap-2">
                            <FaSignOutAlt></FaSignOutAlt>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <div className="flex justify-end items-center gap-4 mb-4">
                    {/* Show User Coins here if easy, or in Home pages */}
                    <div className="avatar">
                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user?.photoURL} />
                        </div>
                    </div>
                    <div>
                        <p className="font-bold">{user?.displayName}</p>
                        <p className="text-sm">{user?.email}</p>
                        {/* Role and Coin will be better shown in Home pages or Header */}
                    </div>
                </div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashboardLayout;
