import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyTasks = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: tasks = [], refetch } = useQuery({
        queryKey: ['my-tasks', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks/my-tasks/${user.email}`);
            return res.data;
        }
    })

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tasks/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold mb-10">My Tasks: {tasks.length}</h2>
            {/* Desktop Table View */}
            <div className="overflow-x-auto hidden lg:block">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Deadline</th>
                            <th>Payable Amount</th>
                            <th>Required Workers</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map((task, index) => <tr key={task._id}>
                                <th>{index + 1}</th>
                                <td>{task.task_title}</td>
                                <td>{task.completion_date}</td>
                                <td>{task.payable_amount}</td>
                                <td>{task.required_workers}</td>
                                <td>
                                    <Link to={`/dashboard/update-task/${task._id}`}>
                                        <button className="btn btn-ghost btn-xs bg-orange-500 text-white">Update</button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(task._id)} className="btn btn-ghost btn-xs bg-red-600 text-white">Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
                {
                    tasks.map((task) => (
                        <div key={task._id} className="card bg-base-100 shadow-xl border border-gray-200">
                            <div className="card-body p-4">
                                <h2 className="card-title text-orange-500">{task.task_title}</h2>
                                <p className="text-sm text-gray-500 mb-2">Deadline: {task.completion_date}</p>

                                <div className="grid grid-cols-2 gap-2 text-sm my-2">
                                    <div>
                                        <p className="font-bold">Payable:</p>
                                        <p>{task.payable_amount}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold">Workers:</p>
                                        <p>{task.required_workers}</p>
                                    </div>
                                </div>

                                <div className="card-actions justify-end mt-2">
                                    <Link to={`/dashboard/update-task/${task._id}`}>
                                        <button className="btn btn-sm bg-orange-500 text-white">Update</button>
                                    </Link>
                                    <button onClick={() => handleDelete(task._id)} className="btn btn-sm bg-red-600 text-white">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default MyTasks;
