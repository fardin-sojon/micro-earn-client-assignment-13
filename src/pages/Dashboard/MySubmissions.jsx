import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const MySubmissions = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: submissions = [] } = useQuery({
        queryKey: ['my-submissions', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions/my-submissions/${user.email}`);
            return res.data;
        }
    })

    if (loading || !user) {
        return <div className="text-center mt-10"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold mb-10">My Submissions: {submissions.length}</h2>
            {/* Desktop Table View */}
            <div className="overflow-x-auto hidden lg:block">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Task Title</th>
                            <th>Buyer</th>
                            <th>Payable Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            submissions.map((sub, index) => (
                                <tr key={sub._id}>
                                    <th>{index + 1}</th>
                                    <td>{sub.task_title}</td>
                                    <td>{sub.buyer_name}</td>
                                    <td>{sub.payable_amount}</td>
                                    <td className={`font-bold ${sub.status === 'approved' ? 'text-green-600' : sub.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                                        {sub.status}
                                    </td>
                                </tr>
                            ))
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
                                <h2 className="card-title text-orange-500">{sub.task_title}</h2>
                                <p><span className="font-bold">Buyer:</span> {sub.buyer_name}</p>
                                <p><span className="font-bold">Payable Amount:</span> {sub.payable_amount}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="font-bold">Status:</span>
                                    <span className={`badge badge-lg text-white ${sub.status === 'approved' ? 'badge-success' : sub.status === 'rejected' ? 'badge-error' : 'badge-warning'}`}>
                                        {sub.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default MySubmissions;
