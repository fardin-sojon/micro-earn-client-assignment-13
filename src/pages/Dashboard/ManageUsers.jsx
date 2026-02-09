import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleRemoveUser = user => {
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
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    // "Update Role" - let's make a simple toggle or select.
    // Requirement says "Update Role". Often means dropdown.
    const handleUpdateRole = (user, newRole) => {
        axiosSecure.patch(`/users/role/${user._id}`, { role: newRole })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `User Role Updated to ${newRole}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold mb-10">Manage Users: {users.length}</h2>
            {/* Desktop Table View */}
            <div className="overflow-x-auto hidden lg:block">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Coins</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={user.image} alt="User" />
                                        </div>
                                    </div>
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <select
                                        defaultValue={user.role}
                                        onChange={(e) => handleUpdateRole(user, e.target.value)}
                                        className="select select-bordered select-xs w-full max-w-xs"
                                    >
                                        <option value="worker">Worker</option>
                                        <option value="buyer">Buyer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td>{user.coins}</td>
                                <td>
                                    <button onClick={() => handleRemoveUser(user)} className="btn btn-ghost btn-xs bg-red-600 text-white">Remove</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
                {
                    users.map((user) => (
                        <div key={user._id} className="card bg-base-100 shadow-xl border border-gray-200">
                            <figure className="px-10 pt-10">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-24 h-24">
                                        <img src={user.image} alt="User" />
                                    </div>
                                </div>
                            </figure>
                            <div className="card-body items-center text-center p-4">
                                <h2 className="card-title">{user.name}</h2>
                                <p className="text-sm text-gray-500 mb-2">{user.email}</p>

                                <div className="w-full flex justify-between items-center my-2">
                                    <span className="font-bold">Role:</span>
                                    <select
                                        defaultValue={user.role}
                                        onChange={(e) => handleUpdateRole(user, e.target.value)}
                                        className="select select-bordered select-sm max-w-xs"
                                    >
                                        <option value="worker">Worker</option>
                                        <option value="buyer">Buyer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>

                                <div className="w-full flex justify-between items-center mb-4">
                                    <span className="font-bold">Coins:</span>
                                    <span className="badge badge-lg badge-primary text-white">{user.coins}</span>
                                </div>

                                <div className="card-actions">
                                    <button onClick={() => handleRemoveUser(user)} className="btn btn-error btn-sm text-white">Remove User</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ManageUsers;
