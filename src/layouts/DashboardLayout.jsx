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
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Mobile Header / Hamburger */}
                <div className="w-full navbar bg-orange-400 lg:hidden text-white mb-4">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost drawer-button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2 text-xl font-bold">Micro Earn</div>
                </div>

                {/* Main Content */}
                <div className="p-8">
                    <div className="flex justify-end items-center gap-4 mb-4">
                        <div className="avatar">
                            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user?.photoURL} referrerPolicy="no-referrer" alt="User" />
                            </div>
                        </div>
                        <div>
                            <p className="font-bold">{user?.displayName}</p>
                            <p className="text-sm">{user?.email}</p>
                        </div>
                    </div>
                    <Outlet></Outlet>
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="menu p-4 w-64 min-h-full bg-orange-400 text-base-content flex flex-col justify-between">
                    {/* Sidebar Content */}
                    <div>
                        <div className="mb-6">
                            <Link to="/" className="btn btn-ghost normal-case text-xl flex items-center gap-2 px-0">
                                <img src={logo} alt="Micro Earn Logo" className="w-12 h-12" />
                                <span className="text-white block">Micro Earn</span>
                            </Link>
                            <p className="text-xs text-white ml-2">Earn Money by Tasks</p>
                        </div>
                        <ul className="space-y-2">
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
                        </ul>
                    </div>

                    {/* Logout Button at Bottom */}
                    <div className="mb-4">
                        <button onClick={handleLogout} className="btn w-full btn-outline border-white text-white hover:bg-white hover:text-orange-500 flex items-center gap-2">
                            <FaSignOutAlt></FaSignOutAlt>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
