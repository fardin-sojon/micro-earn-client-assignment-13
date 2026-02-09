import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const WithdrawRequests = () => {
    const axiosSecure = useAxiosSecure();

    const { data: withdrawals = [], refetch } = useQuery({
        queryKey: ['withdraw-requests'],
        queryFn: async () => {
            // Admin sees pending withdrawals
            const res = await axiosSecure.get('/withdrawals');
            return res.data;
        }
    })

    const handleApprove = (id) => {
        axiosSecure.patch(`/withdrawals/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Withdrawal Approved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold mb-10">Withdraw Requests: {withdrawals.length}</h2>
            {/* Desktop Table View */}
            <div className="overflow-x-auto hidden lg:block">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Worker Name</th>
                            <th>Worker Email</th>
                            <th>Amount</th>
                            <th>Coins</th>
                            <th>Payment System</th>
                            <th>Account No</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            withdrawals.map((withdrawal, index) => <tr key={withdrawal._id}>
                                <th>{index + 1}</th>
                                <td>{withdrawal.worker_name}</td>
                                <td>{withdrawal.worker_email}</td>
                                <td>${withdrawal.withdrawal_amount}</td>
                                <td>{withdrawal.withdrawal_coin}</td>
                                <td>{withdrawal.payment_system}</td>
                                <td>{withdrawal.account_number}</td>
                                <td>
                                    <button onClick={() => handleApprove(withdrawal._id)} className="btn btn-primary btn-xs">Approve Payment</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
                {
                    withdrawals.map((withdrawal) => (
                        <div key={withdrawal._id} className="card bg-base-100 shadow-xl border border-gray-200">
                            <div className="card-body p-4">
                                <h2 className="card-title text-primary">{withdrawal.worker_name}</h2>
                                <p className="text-sm text-gray-500 mb-2">{withdrawal.worker_email}</p>

                                <div className="grid grid-cols-2 gap-2 text-sm my-2">
                                    <div>
                                        <p className="font-bold">Amount:</p>
                                        <p>${withdrawal.withdrawal_amount}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold">Coins:</p>
                                        <p>{withdrawal.withdrawal_coin}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold">System:</p>
                                        <p>{withdrawal.payment_system}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold">Account:</p>
                                        <p className="break-all">{withdrawal.account_number}</p>
                                    </div>
                                </div>

                                <div className="card-actions justify-end mt-2">
                                    <button onClick={() => handleApprove(withdrawal._id)} className="btn btn-primary btn-sm">Approve Payment</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default WithdrawRequests;
