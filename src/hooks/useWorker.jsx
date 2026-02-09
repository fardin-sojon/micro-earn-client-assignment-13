import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useWorker = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: isWorker, isPending: isWorkerLoading } = useQuery({
        queryKey: [user?.email, 'isWorker'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/worker/${user.email}`);
            return res.data?.worker;
        }
    })
    return [isWorker, isWorkerLoading]
};

export default useWorker;
