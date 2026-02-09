import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import SectionTitle from '../SectionTitle/SectionTitle';

const BestWorkers = () => {
    const { data: workers = [] } = useQuery({
        queryKey: ['bestWorkers'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/best`);
            return res.data;
        }
    });

    return (
        <section className="my-10 px-4 md:px-12">
            <SectionTitle heading="Best Workers" subHeading="Top performers of the month" />
            <div className="flex flex-wrap justify-center gap-8">
                {workers.map((worker, index) => (
                    <div key={worker._id} className="bg-base-100 w-full sm:w-80 rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-secondary group relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                            #{index + 1}
                        </div>
                        <div className="avatar mb-4">
                            <div className="w-24 h-24 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                                <img src={worker.image} alt={worker.name} className="object-cover" />
                            </div>
                        </div>
                        <h2 className="text-xl font-bold mb-1 group-hover:text-secondary transition-colors">{worker.name}</h2>
                        <div className="badge badge-secondary badge-outline mt-2 font-bold p-3">
                            {worker.coins} Coins
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BestWorkers;
