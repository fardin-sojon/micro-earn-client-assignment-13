import Banner from "../../components/Banner/Banner";
import BestWorkers from "../../components/BestWorkers/BestWorkers";
import Testimonial from "../../components/Testimonial/Testimonial";

const Home = () => {
    return (
        <div>
            <Banner />
            <BestWorkers />
            <Testimonial />
            {/* Extra Sections placeholders if needed, but Testimonial and BestWorkers are already extra enough for structure now, 
               requirements say "3 Extra Sections".
               Let's add 3 simple extra sections for "Innovative" ideas.
            */}
            {/* Extra Section 1: Process */}
            <section className="my-16 px-4 md:px-12">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold mb-4">How It Works</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Getting started is easy. Follow these simple steps to start earning or getting your tasks completed.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-primary">
                        <div className="card-body items-center text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-3xl">📝</div>
                            <h3 className="card-title text-2xl">1. Register</h3>
                            <p>Create an account as a Worker or Buyer. Get free coins on signup!</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-secondary">
                         <div className="card-body items-center text-center">
                            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4 text-3xl">✅</div>
                            <h3 className="card-title text-2xl">2. Complete Tasks</h3>
                            <p>Browse available tasks and complete them to earn coins instantly.</p>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-accent">
                         <div className="card-body items-center text-center">
                            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 text-3xl">💰</div>
                            <h3 className="card-title text-2xl">3. Get Paid</h3>
                            <p>Accumulate coins and withdraw them to your preferred payment method.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Extra Section 2: Motivation/Stats */}
             <section className="my-16 py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-6">Join the Community of Earners</h2>
                    <p className="text-xl mb-10 opacity-90">Thousands of users are already earning daily. Don't miss out!</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-bold mb-2">10k+</div>
                            <div className="text-lg opacity-80">Active Workers</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">$50k+</div>
                            <div className="text-lg opacity-80">Paid Out</div>
                        </div>
                        <div>
                            <div className="text-5xl font-bold mb-2">5k+</div>
                            <div className="text-lg opacity-80">Tasks Completed</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Extra Section 3: FAQ */}
             <section className="my-16 px-4 md:px-12 max-w-4xl mx-auto">
                <h2 className="text-4xl text-center mb-10 font-bold">Frequently Asked Questions</h2>
                <div className="join join-vertical w-full">
                    <div className="collapse collapse-plus join-item border border-base-300">
                        <input type="radio" name="my-accordion-4" defaultChecked /> 
                        <div className="collapse-title text-xl font-medium">
                            How do I withdraw money?
                        </div>
                        <div className="collapse-content"> 
                            <p>Once you reach 200 coins, you can request a withdrawal. We process payments via Stripe, Bkash, and other local methods.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus join-item border border-base-300">
                        <input type="radio" name="my-accordion-4" /> 
                        <div className="collapse-title text-xl font-medium">
                            Is it free to join?
                        </div>
                        <div className="collapse-content"> 
                            <p>Yes, registration is completely free. We even give you a welcome bonus of 10 coins (Worker) or 50 coins (Buyer).</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus join-item border border-base-300">
                        <input type="radio" name="my-accordion-4" /> 
                        <div className="collapse-title text-xl font-medium">
                            Can I be both a Buyer and a Worker?
                        </div>
                        <div className="collapse-content"> 
                            <p>Currently, you need to register separate accounts if you want to perform both roles.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
