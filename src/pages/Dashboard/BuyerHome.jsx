import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const BuyerHome = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: stats = [] } = useQuery({
        queryKey: ['buyer-stats', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/buyer-stats/${user.email}`);
            return res.data;
        }
    })

    if (loading || !user) {
        return <div className="text-center mt-10"><span className="loading loading-spinner loading-lg"></span></div>;
    }


    const handleNavigateToReview = () => {
        navigate('/dashboard/task-to-review');
    }

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold mb-10">Buyer Dashboard</h2>
            <div className="stats shadow w-full">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div className="stat-title">Total Tasks</div>
                    <div className="stat-value">{stats.totalTasks}</div>
                    <div className="stat-desc">Tasks posted by you</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                    </div>
                    <div className="stat-title">Pending Tasks</div>
                    <div className="stat-value">{stats.pendingTasks}</div>
                    <div className="stat-desc">Remaining required workers</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                    </div>
                    <div className="stat-title">Total Payment</div>
                    <div className="stat-value">${stats.totalPayment}</div>
                    <div className="stat-desc">Amount paid by you</div>
                </div>
            </div>
            
             <section className="my-10 bg-base-200 p-8 rounded-xl text-center">
                 <h3 className="text-2xl font-bold mb-4">Task To Review</h3>
                 <p className="mb-6">Check pending submissions from workers.</p>
                 <button onClick={handleNavigateToReview} className="btn btn-primary">Go to Review</button>
            </section>
        </div>
    );
};

export default BuyerHome;
