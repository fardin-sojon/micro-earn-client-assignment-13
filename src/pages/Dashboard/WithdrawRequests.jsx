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
                if(res.data.modifiedCount > 0){
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
            <div className="overflow-x-auto">
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
        </div>
    );
};

export default WithdrawRequests;
