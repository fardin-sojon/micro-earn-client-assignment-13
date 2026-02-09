import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PurchaseCoin = () => {
    const axiosSecure = useAxiosSecure();
    // 10 coins = 1$, 150 = 10$, 500 = 20$, 1000 = 35$
    const packages = [
        { coins: 10, price: 1 },
        { coins: 150, price: 10 },
        { coins: 500, price: 20 },
        { coins: 1000, price: 35 },
    ];
    
    const [selectedPackage, setSelectedPackage] = useState(null);

    const handlePayment = async () => {
        if(!selectedPackage) return;
        try {
            const res = await axiosSecure.post('/create-checkout-session', {
                price: selectedPackage.price,
                coins: selectedPackage.coins
            });
            console.log("Checkout Session Response:", res.data);
            if(res.data.url){
                window.location.href = res.data.url;
            } else {
                 Swal.fire({
                    icon: "error",
                    title: "Redirection Failed",
                    text: "No URL returned from server.",
                });
            }
        } catch (error) {
            console.error("Payment session creation failed", error);
             Swal.fire({
                icon: "error",
                title: "Payment Error",
                text: error.response?.data?.message || "Failed to initiate payment session.",
            });
        }
    }

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold mb-10 text-center">Purchase Coins</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {packages.map((pkg, index) => (
                    <div 
                        key={index} 
                        onClick={() => setSelectedPackage(pkg)}
                        className={`card bg-base-100 shadow-xl cursor-pointer border-2 hover:border-primary transition-all ${selectedPackage === pkg ? 'border-primary bg-primary/10' : 'border-transparent'}`}
                    >
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-3xl font-bold">{pkg.coins} Coins</h2>
                            <p className="text-xl">= ${pkg.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedPackage && (
                <div className="card w-full max-w-md mx-auto shadow-2xl bg-base-100">
                    <div className="card-body text-center">
                         <h3 className="text-xl mb-4">Pay ${selectedPackage.price} for {selectedPackage.coins} Coins</h3>
                         <button onClick={handlePayment} className="btn btn-primary btn-lg w-full">
                            Pay with Stripe
                         </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PurchaseCoin;
