import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminHome from "../pages/Dashboard/AdminHome";
import BuyerHome from "../pages/Dashboard/BuyerHome";
import WorkerHome from "../pages/Dashboard/WorkerHome";
import AddTask from "../pages/Dashboard/AddTask";
import MyTasks from "../pages/Dashboard/MyTasks";
import TaskList from "../pages/Dashboard/TaskList";
import TaskDetails from "../pages/Dashboard/TaskDetails";
import UpdateTask from "../pages/Dashboard/UpdateTask";
import Withdrawals from "../pages/Dashboard/Withdrawals";
import MySubmissions from "../pages/Dashboard/MySubmissions";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import ManageTasks from "../pages/Dashboard/ManageTasks";
import WithdrawRequests from "../pages/Dashboard/WithdrawRequests";
import PurchaseCoin from "../pages/Dashboard/PurchaseCoin";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import TaskToReview from "../pages/Dashboard/TaskToReview";
import PaymentSuccess from "../pages/Dashboard/PaymentSuccess";

import Profile from "../pages/Dashboard/Profile";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import WorkerRoute from "./WorkerRoute";

import DashboardRedirect from "../pages/Dashboard/DashboardRedirect";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
        ],
    },
    {
        path: "dashboard",
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                index: true,
                element: <DashboardRedirect></DashboardRedirect>
            },
            {
                path: 'worker-home',
                element: <WorkerRoute><WorkerHome></WorkerHome></WorkerRoute>
            },
            {
                path: 'buyer-home',
                element: <BuyerRoute><BuyerHome></BuyerHome></BuyerRoute>
            },
            {
                path: 'admin-home',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: 'add-task',
                element: <BuyerRoute><AddTask></AddTask></BuyerRoute>
            },
            {
                path: 'my-tasks',
                element: <BuyerRoute><MyTasks></MyTasks></BuyerRoute>
            },
            {
                path: 'update-task/:id',
                element: <BuyerRoute><UpdateTask></UpdateTask></BuyerRoute>,

            },
            {
                path: 'task-list',
                element: <WorkerRoute><TaskList></TaskList></WorkerRoute>
            },
            {
                path: 'task-details/:id',
                element: <WorkerRoute><TaskDetails></TaskDetails></WorkerRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/tasks/${params.id}`).then(res => res.json())
            },
            {
                path: 'task-to-review',
                element: <BuyerRoute><TaskToReview></TaskToReview></BuyerRoute>
            },
            {
                path: 'purchase-coin',
                element: <BuyerRoute><PurchaseCoin></PurchaseCoin></BuyerRoute>
            },
            {
                path: 'payment-history',
                element: <BuyerRoute><PaymentHistory></PaymentHistory></BuyerRoute>
            },
            {
                path: 'my-submissions',
                element: <WorkerRoute><MySubmissions></MySubmissions></WorkerRoute>
            },
            {
                path: 'withdrawals',
                element: <WorkerRoute><Withdrawals></Withdrawals></WorkerRoute>
            },
            {
                path: 'manage-tasks',
                element: <AdminRoute><ManageTasks></ManageTasks></AdminRoute>
            },
            {
                path: 'withdraw-requests',
                element: <AdminRoute><WithdrawRequests></WithdrawRequests></AdminRoute>
            },
            {
                path: 'payment/success',
                element: <BuyerRoute><PaymentSuccess></PaymentSuccess></BuyerRoute>
            },
            {
                path: 'profile',
                element: <Profile></Profile>
            }
        ]
    }
]);
