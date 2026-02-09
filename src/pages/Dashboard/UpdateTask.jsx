import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const UpdateTask = () => {
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: task = {}, isLoading } = useQuery({
        queryKey: ['task', id],
        queryFn: async () => {
             const res = await axiosSecure.get(`/tasks/${id}`);
             return res.data;
        }
    });

    useEffect(() => {
        if (task._id) {
            reset(task);
        }
    }, [task, reset]);

    const onSubmit = async (data) => {
        const { task_title, task_detail, submission_info } = data;
        const updatedTask = {
            task_title,
            task_detail,
            submission_info
        }

        const res = await axiosSecure.patch(`/tasks/${id}`, updatedTask); // Use id from params
        if(res.data.modifiedCount > 0){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Task Updated Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/my-tasks');
        }
    }

    if (isLoading) return <div className="text-center mt-10"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold mb-10">Update Task</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Task Title</span>
                    </label>
                    <input type="text" {...register("task_title", { required: true })} className="input input-bordered w-full" />
                </div>
                
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Task Detail</span>
                    </label>
                    <textarea {...register("task_detail", { required: true })} className="textarea textarea-bordered h-24"></textarea>
                </div>

                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Submission Info</span>
                    </label>
                    <textarea {...register("submission_info", { required: true })} className="textarea textarea-bordered h-24"></textarea>
                </div>

                <button className="btn btn-primary">Update Task</button>
            </form>
        </div>
    );
};

export default UpdateTask;
