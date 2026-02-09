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
    element: <DashboardLayout></DashboardLayout>,
    children: [
        {
            path: 'worker-home',
            element: <WorkerHome></WorkerHome>
        },
        {
            path: 'buyer-home',
            element: <BuyerHome></BuyerHome>
        },
        {
            path: 'admin-home',
            element: <AdminHome></AdminHome>
        },
        {
            path: 'manage-users',
            element: <ManageUsers></ManageUsers>
        },
        {
            path: 'add-task',
            element: <AddTask></AddTask>
        },
        {
            path: 'my-tasks',
            element: <MyTasks></MyTasks>
        },
        {
            path: 'update-task/:id',
            element: <UpdateTask></UpdateTask>,

        },
        {
            path: 'task-list',
            element: <TaskList></TaskList>
        },
        {
            path: 'task-details/:id',
            element: <TaskDetails></TaskDetails>,
             loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/tasks/${params.id}`).then(res => res.json())
        },
        {
            path: 'task-to-review',
            element: <TaskToReview></TaskToReview>
        },
        {
            path: 'purchase-coin',
            element: <PurchaseCoin></PurchaseCoin>
        },
        {
            path: 'payment-history',
            element: <PaymentHistory></PaymentHistory>
        },
         {
             path: 'my-submissions',
            element: <MySubmissions></MySubmissions>
        },
        {
             path: 'withdrawals',
            element: <Withdrawals></Withdrawals>
        },
        {
            path: 'manage-tasks',
            element: <ManageTasks></ManageTasks>
        },
        {
            path: 'withdraw-requests',
            element: <WithdrawRequests></WithdrawRequests>
        },
        {
            path: 'payment/success',
            element: <PaymentSuccess></PaymentSuccess>
        }
    ]
  }
]);
