import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import useRole from "../../hooks/useRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { imageUpload } from "../../api/utils";

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [role] = useRole();
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    const { data: userData = {}, refetch } = useQuery({
        queryKey: ['userProfile', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data;
        }
    })

    const onSubmit = async (data) => {
        setUploading(true);
        try {
            let imageUrl = userData.image || user?.photoURL;

            // Check if a new image file is provided
            if (data.image && data.image[0]) {
                const imageFile = data.image[0];
                imageUrl = await imageUpload(imageFile);
            }

            // 1. Update Firebase Profile
            await updateUserProfile(data.name, imageUrl);

            // 2. Update Backend
            const res = await axiosSecure.patch(`/users/${user?.email}`, {
                name: data.name,
                image: imageUrl
            });

            if (res.data.modifiedCount > 0) {
                refetch();
                setIsModalOpen(false);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Profile Updated Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: error.message || "Something went wrong!",
            });
        } finally {
            setUploading(false);
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setValue("image", null);
    };

    return (
        <div className="p-10 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-10">My Profile</h2>

            <div className="card w-96 bg-base-100 shadow-xl border border-gray-200">
                <figure className="px-10 pt-10">
                    <div className="avatar">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={userData.image || user?.photoURL} alt="Profile" />
                        </div>
                    </div>
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-2xl">{userData.name || user?.displayName}</h2>
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

                    <div className="card-actions mt-6 w-full">
                        <button onClick={() => {
                            setIsModalOpen(true);
                            setImagePreview(null);
                            reset({
                                name: userData.name || user?.displayName,
                            });
                        }} className="btn btn-outline btn-primary w-full max-w-xs mx-auto">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="modal-box relative">
                        <button onClick={() => setIsModalOpen(false)} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
                        <h3 className="font-bold text-lg mb-4">Edit Profile</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control w-full mb-4">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="input input-bordered w-full"
                                    {...register("name", { required: true })}
                                />
                            </div>

                            <div className="form-control w-full mb-4">
                                <label className="label">
                                    <span className="label-text">Profile Picture</span>
                                </label>

                                <div className="flex justify-center mb-4 relative w-fit mx-auto">
                                    <img
                                        src={imagePreview || userData.image || user?.photoURL}
                                        alt="Current Profile"
                                        className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                                    />
                                    {imagePreview && (
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="btn btn-xs btn-circle btn-error absolute top-0 right-0 text-white transform translate-x-1/4 -translate-y-1/4"
                                            title="Remove image"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>

                                <input
                                    type="file"
                                    className="file-input file-input-bordered w-full"
                                    accept="image/*"
                                    {...register("image", {
                                        onChange: handleImageChange
                                    })}
                                />
                            </div>

                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary" disabled={uploading}>
                                    {uploading ? <span className="loading loading-spinner"></span> : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
