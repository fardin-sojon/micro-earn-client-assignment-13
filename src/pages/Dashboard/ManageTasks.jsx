import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageTasks = () => {
    const axiosSecure = useAxiosSecure();

    const { data: tasks = [], refetch } = useQuery({
        queryKey: ['manage-tasks'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tasks');
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
                                text: "Task has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold mb-10">Manage Tasks: {tasks.length}</h2>
            {/* Table View for Desktop (Large Screens) */}
            <div className="overflow-x-auto hidden lg:block">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Buyer Name</th>
                            <th>Buyer Email</th>
                            <th>Availability</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map((task, index) => <tr key={task._id}>
                                <th>{index + 1}</th>
                                <td>{task.task_title}</td>
                                <td>{task.buyer_name}</td>
                                <td>{task.buyer_email}</td>
                                <td>{task.required_workers} slots</td>
                                <td>
                                    <button onClick={() => handleDelete(task._id)} className="btn btn-ghost btn-xs bg-red-600 text-white">Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {/* Card View for Mobile & Tablet */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
                {
                    tasks.map((task) => (
                        <div key={task._id} className="card bg-base-100 shadow-xl border border-gray-200">
                            <div className="card-body p-4">
                                <h2 className="card-title text-orange-500">{task.task_title}</h2>
                                <p><span className="font-bold">Buyer:</span> {task.buyer_name}</p>
                                <p><span className="font-bold">Email:</span> {task.buyer_email}</p>
                                <p><span className="font-bold">Availability:</span> {task.required_workers} slots</p>
                                <div className="card-actions justify-end mt-2">
                                    <button onClick={() => handleDelete(task._id)} className="btn btn-sm bg-red-600 text-white hover:bg-red-700">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ManageTasks;
