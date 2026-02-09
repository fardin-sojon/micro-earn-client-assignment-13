import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const TaskList = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');
    const [minReward, setMinReward] = useState('');
    const [maxReward, setMaxReward] = useState('');
    const [sortBy, setSortBy] = useState('');

    const { data: tasks = [] } = useQuery({
        queryKey: ['available-tasks', search, minReward, maxReward, sortBy],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (minReward) params.append('minReward', minReward);
            if (maxReward) params.append('maxReward', maxReward);
            if (sortBy) params.append('sortBy', sortBy);

            const res = await axiosSecure.get(`/tasks/available?${params.toString()}`);
            return res.data;
        }
    })

    const handleReset = () => {
        setSearch('');
        setMinReward('');
        setMaxReward('');
        setSortBy('');
    }

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold mb-6">Available Tasks: {tasks.length}</h2>
            
            {/* Filter Section */}
            <div className="bg-base-100 p-4 rounded-lg shadow mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Search Task</span>
                    </label>
                    <input type="text" placeholder="Title..." className="input input-bordered w-full" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Min Reward</span>
                    </label>
                    <input type="number" placeholder="Min" className="input input-bordered w-full" value={minReward} onChange={e => setMinReward(e.target.value)} />
                </div>
                
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Max Reward</span>
                    </label>
                    <input type="number" placeholder="Max" className="input input-bordered w-full" value={maxReward} onChange={e => setMaxReward(e.target.value)} />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Sort By</span>
                    </label>
                    <select className="select select-bordered w-full" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                        <option value="">Default</option>
                        <option value="reward_asc">Reward (Low &gt; High)</option>
                        <option value="reward_desc">Reward (High &gt; Low)</option>
                    </select>
                </div>

                <button onClick={handleReset} className="btn btn-warning w-full">Reset Filter</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    tasks.map(task => <div key={task._id} className="bg-base-100 rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col">
                        <div className="p-6 flex-grow">
                             <div className="flex justify-between items-start mb-4">
                                <h2 className="text-xl font-bold text-gray-800 line-clamp-2">{task.task_title}</h2>
                                <div className="badge badge-secondary badge-outline shrink-0 ml-2">{task.required_workers} slots</div>
                             </div>
                            <p className="text-gray-600 mb-2"><span className="font-semibold">Buyer:</span> {task.buyer_name}</p>
                            <p className="text-gray-600 mb-4"><span className="font-semibold">Deadline:</span> {task.completion_date}</p>
                            <div className="divider my-2"></div>
                            <p className="text-2xl font-bold text-primary flex items-center justify-between">
                                <span>{task.payable_amount} Coins</span>
                            </p>
                        </div>
                         <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-end">
                            <Link to={`/dashboard/task-details/${task._id}`} className="w-full">
                                <button className="btn btn-primary w-full shadow-md font-bold text-white">View Details</button>
                            </Link>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default TaskList;
