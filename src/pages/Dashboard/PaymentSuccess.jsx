import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(true);

    useEffect(() => {
        if (sessionId) {
            axiosSecure.post('/payments/success', { sessionId })
                .then(res => {
                    if (res.data.status === 'success') {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Payment Successful! Coins Added.",
                            showConfirmButton: false,
                            timer: 2000
                        });
                        navigate('/dashboard/payment-history');
                    }
                })
                .catch(err => {
                    console.error(err);
                    Swal.fire({
                        icon: "error",
                        title: "Payment Verification Failed",
                        text: "Please contact support if you were charged.",
                    });
                     navigate('/dashboard/purchase-coin');
                })
                .finally(() => {
                    setProcessing(false);
                });
        }
    }, [sessionId, axiosSecure, navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            {processing ? (
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="mt-4 text-xl">Verifying Payment...</p>
                </div>
            ) : (
                <div className="text-center">
                     <h2 className="text-3xl font-bold text-green-600 mb-4">Processing...</h2>
                     <p>Please wait while we confirm your transaction.</p>
                </div>
            )}
        </div>
    );
};

export default PaymentSuccess;
