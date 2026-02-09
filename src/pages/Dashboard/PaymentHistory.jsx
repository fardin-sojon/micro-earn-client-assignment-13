import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const PaymentHistory = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>
    }

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold mb-10">Total Payments: {payments.length}</h2>
            {/* Desktop Table View */}
            <div className="overflow-x-auto hidden lg:block">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Amount</th>
                            <th>Coins</th>
                            <th>Transaction Id</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => <tr key={payment._id}>
                            <th>{index + 1}</th>
                            <td>${payment.price}</td>
                            <td>{payment.coins}</td>
                            <td>{payment.transactionId}</td>
                            <td>{payment.status}</td>
                        </tr>)}

                    </tbody>
                </table>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
                {
                    payments.map((payment) => (
                        <div key={payment._id} className="card bg-base-100 shadow-xl border border-gray-200">
                            <div className="card-body p-4">
                                <h2 className="card-title text-primary">${payment.price}</h2>
                                <p className="text-sm text-gray-500 mb-2">Coins: {payment.coins}</p>

                                <div className="grid grid-cols-1 gap-2 text-sm my-2">
                                    <div>
                                        <p className="font-bold">Transaction ID:</p>
                                        <p className="break-all text-xs">{payment.transactionId}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold">Status:</p>
                                        <span className="badge badge-success text-white">{payment.status}</span>
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

export default PaymentHistory;
