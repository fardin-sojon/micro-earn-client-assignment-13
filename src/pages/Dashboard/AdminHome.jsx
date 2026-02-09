import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    })

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold mb-10">Admin Dashboard</h2>
            <div className="stats shadow w-full">
                <div className="stat">
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value">{stats.users}</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Total Coins</div>
                    <div className="stat-value text-secondary">{stats.totalCoins}</div>
                    <div className="stat-desc">Total system coins</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Total Payments</div>
                    <div className="stat-value text-primary">{stats.totalPayments}</div>
                     <div className="stat-desc">Completed transactions</div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
