import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: role, isPending: isRoleLoading } = useQuery({
        queryKey: [user?.email, 'role'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data?.role;
        }
    })
    return [role, isRoleLoading]
};

export default useRole;
