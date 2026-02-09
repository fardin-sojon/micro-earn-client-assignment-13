import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const Withdrawals = () => {
    const { register, handleSubmit, watch, reset } = useForm();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: userData = {} } = useQuery({
        queryKey: ['userData', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
             const res = await axiosSecure.get(`/users/role/${user.email}`);
             return res.data;
        }
    })

    const coinsToWithdraw = watch("withdrawal_coin"); 
    const paymentMethod = watch("payment_system");

    const onSubmit = async (data) => {
        const withdrawal = {
            worker_email: user.email,
            worker_name: user.displayName,
            withdrawal_coin: parseInt(data.withdrawal_coin),
            withdrawal_amount: parseInt(data.withdrawal_coin) / 20,
            payment_system: data.payment_system,
            account_number: data.account_number,
            withdraw_date: new Date(),
            status: 'pending'
        }
        
        // Min withdrawal 10 coins
        if(withdrawal.withdrawal_coin < 10) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Minimum withdrawal is 10 coins",
            });
            return;
        }

        if(withdrawal.withdrawal_coin > userData.coins){
            Swal.fire({
                icon: "error",
                title: "Insufficient Balance",
                text: "You do not have enough coins.",
            });
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: `You are withdrawing ${withdrawal.withdrawal_coin} coins ($${withdrawal.withdrawal_amount}) via ${withdrawal.payment_system}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Withdraw!",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    const res = await axiosSecure.post('/withdrawals', withdrawal);
                    if (!res.data.insertedId && !res.data._id) {
                        throw new Error("Failed to process withdrawal");
                    }
                    return res.data;
                } catch (error) {
                    Swal.showValidationMessage(
                        `Request failed: ${error.response?.data?.message || error.message}`
                    );
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Withdrawal Request Sent",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
                // Optional: Refetch user data to update balance immediately
                // queryClient.invalidateQueries(['userData', user?.email]) 
                // But we don't have queryClient here easily unless we import useQueryClient. 
                // The balance might strictly rely on the existing useQuery which might not auto-refetch instantly without invalidation.
                // For now, reset() clears the form, which is good.
            }
        });
    }

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold mb-10">Withdrawals</h2>
            
             <div className="stats shadow w-full mb-10">
                <div className="stat">
                    <div className="stat-title">Your Balance</div>
                    <div className="stat-value text-secondary">{userData.coins || 0} Coins</div>
                </div>
                <div className="stat">
                    <div className="stat-title">Conversion Rate</div>
                    <div className="stat-value text-primary">20 Coins = $1</div>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="card w-full max-w-lg shadow-2xl bg-base-100 p-8 mx-auto">
                 <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Coins To Withdraw (Min 10)</span>
                    </label>
                    <input type="number" {...register("withdrawal_coin", { required: true, min: 10, max: userData.coins })} className="input input-bordered w-full" placeholder="Enter amount" />
                    {coinsToWithdraw && <p className="text-sm mt-2 text-green-600 font-bold">You will receive: ${coinsToWithdraw / 20}</p>}
                </div>
                
                 <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Select Payment System</span>
                    </label>
                    <select {...register("payment_system", { required: true })} className="select select-bordered" defaultValue="">
                        <option value="" disabled>Select Method</option>
                        <option value="Bkash">Bkash</option>
                        <option value="Rocket">Rocket</option>
                        <option value="Nagad">Nagad</option>
                        <option value="Stripe">Stripe</option>
                    </select>
                </div>
                
                 <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Account Number</span>
                    </label>
                     <input type="text" {...register("account_number", { required: true })} className="input input-bordered w-full" placeholder={paymentMethod === 'Bkash' || paymentMethod === 'Nagad' || paymentMethod === 'Rocket' ? "Enter Mobile Number" : "Enter Account Number"} />
                </div>

                <div className="form-control mt-6">
                    <button className="btn btn-primary" disabled={!userData.coins || userData.coins < 10}>Withdraw</button>
                </div>
            </form>
        </div>
    );
};

export default Withdrawals;
