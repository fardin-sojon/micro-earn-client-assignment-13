import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import useRole from "../../hooks/useRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [role] = useRole();
    const axiosSecure = useAxiosSecure();

    const { data: userData = {} } = useQuery({
        queryKey: ['userProfile', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data;
        }
    })

    return (
        <div className="p-10 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-10">My Profile</h2>

            <div className="card w-96 bg-base-100 shadow-xl border border-gray-200">
                <figure className="px-10 pt-10">
                    <div className="avatar">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user?.photoURL} alt="Profile" />
                        </div>
                    </div>
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-2xl">{user?.displayName}</h2>
                    <p className="text-gray-500">{user?.email}</p>

                    <div className="divider"></div>

                    <div className="w-full flex justify-between px-4">
                        <span className="font-bold">Role:</span>
                        <span className="badge badge-primary uppercase">{role}</span>
                    </div>

                    <div className="w-full flex justify-between px-4 mt-2">
                        <span className="font-bold">User ID:</span>
                        <span className="text-xs text-gray-400 self-center">{userData._id?.slice(0, 10)}...</span>
                    </div>

                    {userData.coins !== undefined && (
                        <div className="w-full flex justify-between px-4 mt-2">
                            <span className="font-bold">Coins:</span>
                            <span className="badge badge-warning text-white font-bold">{userData.coins}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
