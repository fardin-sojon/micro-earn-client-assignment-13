import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useBuyer = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: isBuyer, isPending: isBuyerLoading } = useQuery({
        queryKey: [user?.email, 'isBuyer'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/buyer/${user.email}`);
            return res.data?.buyer;
        }
    })
    return [isBuyer, isBuyerLoading]
};

export default useBuyer;
