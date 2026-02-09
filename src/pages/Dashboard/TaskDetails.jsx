import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const TaskDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
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

    const onSubmit = async (data) => {
        if (!user || !user.email) {
            Swal.fire({
                icon: "error",
                title: "User not identified",
                text: "Please wait for user data to load or log in again.",
            });
            return;
        }

        const submission = {
            task_id: task._id,
            task_title: task.task_title,
            payable_amount: task.payable_amount,
            worker_email: user.email,
            worker_name: user.displayName,
            buyer_name: task.buyer_name,
            buyer_email: task.buyer_email,
            submission_details: data.submission_details,
            current_date: new Date(),
            status: 'pending'
        }

        console.log("Submitting Task:", submission);

        try {
            const res = await axiosSecure.post('/submissions', submission);
            console.log("Submission Response:", res.data);
            if(res.data.insertedId || res.data._id){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Submission Successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
                navigate('/dashboard/my-submissions');
            }
        } catch (error) {
            console.error("Submission Error:", error);
            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: error.response?.data?.message || "Something went wrong",
            });
        }
    }

    if (isLoading) return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="p-10">
            <div className="card w-full bg-base-100 shadow-xl mb-10">
                <figure><img src={task.task_image_url} alt="Task" className="h-64 w-full object-cover" /></figure>
                <div className="card-body">
                    <h2 className="card-title text-3xl">{task.task_title}</h2>
                    <p className="font-bold">Payable Amount: {task.payable_amount} Coins</p>
                    <p>Buyer: {task.buyer_name}</p>
                    <p>Deadline: {task.completion_date}</p>
                    <p className="mt-4">{task.task_detail}</p>
                    <div className="divider"></div>
                    <h3 className="font-bold">Submission Info:</h3>
                    <p>{task.submission_info}</p>
                </div>
            </div>

            <div className="card w-full bg-base-100 shadow-xl">
                 <div className="card-body">
                    <h2 className="card-title mb-4">Submit Your Work</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                         <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text">Submission Details</span>
                            </label>
                            <textarea {...register("submission_details", { required: true })} className="textarea textarea-bordered h-24" placeholder="Enter proof details..."></textarea>
                        </div>
                        <button className="btn btn-primary">Submit</button>
                    </form>
                 </div>
            </div>
        </div>
    );
};

export default TaskDetails;
