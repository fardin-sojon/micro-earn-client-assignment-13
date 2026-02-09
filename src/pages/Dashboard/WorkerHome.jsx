import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const WorkerHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: stats = [] } = useQuery({
        queryKey: ['worker-stats', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/worker-stats/${user.email}`);
            return res.data;
        }
    })

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold mb-10">Worker Dashboard</h2>
            <div className="stats shadow w-full">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div className="stat-title">Total Submission</div>
                    <div className="stat-value">{stats.totalSubmissions}</div>
                    <div className="stat-desc">Tasks you submitted</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                    </div>
                    <div className="stat-title">Pending Submissions</div>
                    <div className="stat-value">{stats.pendingSubmissions}</div>
                    <div className="stat-desc">Waiting for approval</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                    </div>
                    <div className="stat-title">Total Earnings</div>
                    <div className="stat-value">{stats.totalEarnings}</div>
                    <div className="stat-desc">Approved submissions</div>
                </div>
            </div>

            <section className="my-10 bg-base-200 p-8 rounded-xl text-center">
                 <h3 className="text-2xl font-bold mb-4">Approved Submissions</h3>
                  <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Task Title</th>
                                <th>Payable Amount</th>
                                <th>Buyer Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                         <tbody>
                            {stats.approvedSubmissions && stats.approvedSubmissions.map((sub, index) => (
                                <tr key={sub._id}>
                                    <th>{index + 1}</th>
                                    <td>{sub.task_title}</td>
                                    <td>{sub.payable_amount}</td>
                                    <td>{sub.buyer_name}</td>
                                    <td className="text-success font-bold">{sub.status}</td>
                                </tr>
                            ))}
                         </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default WorkerHome;
