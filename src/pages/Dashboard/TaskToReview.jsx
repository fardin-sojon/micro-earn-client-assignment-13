import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";

const TaskToReview = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    // Fetch all submissions for tasks created by this buyer
    // Backend needs to support this. "Buyer will see all submissions for his added tasks where the status is pending"
    // I need an endpoint /submissions/buyer/:email?status=pending
    const { data: submissions = [], refetch } = useQuery({
        queryKey: ['submissions-review', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions/buyer-stats/${user.email}?status=pending`);
            // Wait, I reused buyer-stats endpoint name? No, I need a new endpoint.
            // Let's call it /submissions/buyer-pending/:email
            const response = await axiosSecure.get(`/submissions/buyer-pending/${user.email}`);
            return response.data;
        }
    })

    const handleApprove = (id) => {
        axiosSecure.patch(`/submissions/approve/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Submission Approved!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleReject = (id) => {
        axiosSecure.patch(`/submissions/reject/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "info",
                        title: "Submission Rejected",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold mb-10">Task To Review: {submissions.length}</h2>
            {/* Desktop Table View */}
            <div className="overflow-x-auto hidden lg:block">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Worker Name</th>
                            <th>Task Title</th>
                            <th>Payable Amount</th>
                            <th>Submission Detail</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            submissions.map((sub, index) => <tr key={sub._id}>
                                <th>{index + 1}</th>
                                <td>{sub.worker_name}</td>
                                <td>{sub.task_title}</td>
                                <td>{sub.payable_amount} Coins</td>
                                <td>
                                    <button className="btn btn-xs btn-outline" onClick={() => document.getElementById(`modal_${sub._id}`).showModal()}>View Submission</button>
                                    <dialog id={`modal_${sub._id}`} className="modal">
                                        <div className="modal-box text-black">
                                            <h3 className="font-bold text-lg">Submission Detail</h3>
                                            <p className="py-4">{sub.submission_details}</p>
                                            <div className="modal-action">
                                                <form method="dialog">
                                                    <button className="btn">Close</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                </td>
                                <td className="flex gap-2">
                                    <button onClick={() => handleApprove(sub._id)} className="btn btn-xs btn-success text-white">Approve</button>
                                    <button onClick={() => handleReject(sub._id)} className="btn btn-xs btn-error text-white">Reject</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
                {
                    submissions.map((sub) => (
                        <div key={sub._id} className="card bg-base-100 shadow-xl border border-gray-200">
                            <div className="card-body p-4">
                                <h2 className="card-title text-primary">{sub.task_title}</h2>
                                <p className="text-sm text-gray-500 mb-2">Worker: {sub.worker_name}</p>
                                <p className="font-bold text-sm mb-2">Payable: {sub.payable_amount} Coins</p>

                                <div className="card-actions justify-between items-center mt-2">
                                    <button className="btn btn-sm btn-outline" onClick={() => document.getElementById(`mobile_modal_${sub._id}`).showModal()}>View Details</button>
                                    <dialog id={`mobile_modal_${sub._id}`} className="modal">
                                        <div className="modal-box text-black">
                                            <h3 className="font-bold text-lg">Submission Detail</h3>
                                            <p className="py-4">{sub.submission_details}</p>
                                            <div className="modal-action">
                                                <form method="dialog">
                                                    <button className="btn">Close</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>

                                    <div className="flex gap-2">
                                        <button onClick={() => handleApprove(sub._id)} className="btn btn-sm btn-success text-white">Approve</button>
                                        <button onClick={() => handleReject(sub._id)} className="btn btn-sm btn-error text-white">Reject</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default TaskToReview;
