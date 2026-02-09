import { Link, NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import logo from "../assets/logo.svg";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaBell } from "react-icons/fa";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const location = useLocation();

    // Fetch user info for coins
    const { data: userInfo = {} } = useQuery({
        queryKey: ['userInfo', user?.email],
        enabled: !!user?.email && !!localStorage.getItem('access-token'), // Only fetch if user and token exist
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data;
        }
    });

    // Fetch notifications
    const { data: notifications = [] } = useQuery({
        queryKey: ['notifications', user?.email],
        enabled: !!user?.email && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const res = await axiosSecure.get(`/notifications/${user.email}`);
            return res.data;
        }
    });


    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const navOptions = <>
        <li><a href="https://github.com/fardin-sojon" target="_blank" className="bg-black text-white hover:bg-gray-800">Join as Developer</a></li>
        <li><NavLink to="/" end className={({ isActive }) => isActive ? "text-yellow-400 font-bold" : "text-white"}>Home</NavLink></li>
        {
            user ? <>
                <li>
                    <Link to="/dashboard/worker-home" className={location.pathname.includes('dashboard') ? "text-yellow-400 font-bold" : "text-white"}>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <button className="btn btn-ghost btn-sm bg-yellow-400 text-black">
                        Available Coin: {userInfo.coins || 0}
                    </button>
                </li>
                <li>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <FaBell className="h-5 w-5" />
                                <span className="badge badge-xs badge-primary indicator-item">{notifications.length}</span>
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 overflow-y-auto max-h-96 text-black">
                            {
                                notifications.length === 0 ? <li><a>No notifications</a></li> :
                                    notifications.map(notif => (
                                        <li key={notif._id}>
                                            <Link to={notif.actionRoute} className="text-xs text-black">
                                                {notif.message}
                                                <br />
                                                <span className="text-[10px] text-gray-500">{new Date(notif.time).toLocaleString()}</span>
                                            </Link>
                                        </li>
                                    ))
                            }
                        </ul>
                    </div>
                </li>
            </> : <>
                <li><NavLink to="/login" className={({ isActive }) => isActive ? "text-yellow-400 font-bold" : "text-white"}>Login</NavLink></li>
                <li><NavLink to="/register" className={({ isActive }) => isActive ? "text-yellow-400 font-bold" : "text-white"}>Register</NavLink></li>
            </>
        }
    </>

    return (
        <>
            <div className="fixed z-10 w-full bg-neutral bg-opacity-30 text-white flex justify-center">
                <div className="navbar max-w-screen-xl w-full">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-52">
                                {navOptions}
                            </ul>
                        </div>
                        <Link to="/" className="btn btn-ghost normal-case text-xl h-16">
                            <img src={logo} alt="Micro Earn Logo" className="w-21 h-10" />
                        </Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 items-center">
                            {navOptions}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        {
                            user ? <>
                                <div className="dropdown dropdown-end text-black">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full border-2 border-primary">
                                            <img src={user?.photoURL} alt="user" referrerPolicy="no-referrer" />
                                        </div>
                                    </label>
                                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                        <li>
                                            <a className="justify-between">
                                                {user?.displayName}
                                                <span className="badge">User</span>
                                            </a>
                                        </li>
                                        <li><button onClick={handleLogOut}>Logout</button></li>
                                    </ul>
                                </div>
                            </> : <>
                                <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
