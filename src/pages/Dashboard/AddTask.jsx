import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { FaTimes } from "react-icons/fa";

import { imageUpload } from "../../api/utils";

const AddTask = () => {
    const { register, handleSubmit, reset, watch, setValue } = useForm();
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);

    const { data: userData = {} } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !!user?.email && !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    const required_workers = watch('required_workers');
    const payable_amount = watch('payable_amount');
    const totalCost = (parseInt(required_workers) || 0) * (parseInt(payable_amount) || 0);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    }

    const handleRemoveImage = () => {
        setImagePreview(null);
        setValue("image", null);
    }

    const onSubmit = async (data) => {
        console.log("Submitting task...", data);
        if (!user) {
            Swal.fire("Error", "User not found. Please login again.", "error");
            return;
        }

        if (userData.coins < totalCost) {
            Swal.fire({
                icon: "error",
                title: "Not enough coins",
                text: `You need ${totalCost} coins but you have ${userData.coins}. Please purchase more coins.`,
            });
            return;
        }

        const imageFile = data.image[0];
        const MAX_SIZE = 10 * 1024 * 1024; // 10MB

        if (imageFile.size > MAX_SIZE) {
            Swal.fire({
                icon: "error",
                title: "Image too large",
                text: "Please upload an image smaller than 10MB.",
            });
            return;
        }

        try {
            console.log("Uploading image...");
            const imgURL = await imageUpload(imageFile);
            console.log("Image uploaded:", imgURL);

            const { task_title, task_detail, required_workers, payable_amount, completion_date, submission_info } = data;
            const newTask = {
                task_title,
                task_detail,
                required_workers: parseInt(required_workers),
                payable_amount: parseInt(payable_amount),
                completion_date,
                submission_info,
                task_image_url: imgURL,
                buyer_email: user.email,
                buyer_name: user.displayName,
                created_at: new Date()
            }

            console.log("Sending task to server...", newTask);
            const taskRes = await axiosSecure.post('/tasks', newTask);
            console.log("Server response:", taskRes.data);

            if (taskRes.data._id) {
                reset();
                setImagePreview(null);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Task added successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/my-tasks');
            }
        } catch (error) {
            console.error("Task creation failed:", error);
            const serverMsg = error.response?.data ? JSON.stringify(error.response.data) : (error.message || "Unknown Error");
            Swal.fire({
                icon: "error",
                title: "Server Response Details:",
                text: serverMsg,
            });
        }
    };

    if (loading) return <div className="text-center mt-10"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="w-full p-10">
            <h2 className="text-3xl mb-4">Add A New Task</h2>

            <div className="stats shadow mb-6 w-full">
                <div className="stat">
                    <div className="stat-title">Your Balance</div>
                    <div className={`stat-value ${userData.coins < totalCost ? 'text-error' : 'text-primary'}`}>{userData.coins || 0} Coins</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Total Cost</div>
                    <div className="stat-value text-secondary">{totalCost} Coins</div>
                    <div className="stat-desc">Workers x Amount</div>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Task Title</span>
                    </label>
                    <input type="text" placeholder="Task Title" {...register("task_title", { required: true })} className="input input-bordered w-full" />
                </div>

                <div className="flex gap-6">
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Task Detail</span>
                        </label>
                        <textarea {...register("task_detail", { required: true })} className="textarea textarea-bordered h-24" placeholder="Task Detail"></textarea>
                    </div>
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text">Submission Info</span>
                        </label>
                        <textarea {...register("submission_info", { required: true })} className="textarea textarea-bordered h-24" placeholder="What to submit (e.g. screenshot)"></textarea>
                    </div>
                </div>

                <div className="flex gap-6">
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Required Workers</span>
                        </label>
                        <input type="number" placeholder="Required Workers" {...register("required_workers", { required: true })} className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Payable Amount</span>
                        </label>
                        <input type="number" placeholder="Payable Amount" {...register("payable_amount", { required: true })} className="input input-bordered w-full" />
                    </div>
                </div>

                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Completion Date</span>
                    </label>
                    <input type="date" {...register("completion_date", { required: true })} className="input input-bordered w-full" />
                </div>

                <div className="form-control w-full my-6">
                    <label className="label">
                        <span className="label-text">Task Image</span>
                    </label>
                    <input
                        {...register("image", { required: true, onChange: handleImageChange })}
                        type="file"
                        className="file-input w-full max-w-xs"
                    />
                    {imagePreview && (
                        <div className="mt-4 relative w-full max-w-xs">
                            <img src={imagePreview} alt="Preview" className="w-full max-w-xs h-48 object-cover rounded-lg shadow-md" />
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="absolute top-2 right-2 btn btn-sm btn-circle btn-error text-white shadow-md"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    )}
                </div>

                <button className="btn btn-primary">Add Task</button>
            </form>
        </div>
    );
};

export default AddTask;
