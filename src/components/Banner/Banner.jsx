import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { motion } from "framer-motion";

import banner1 from '../../assets/banner1.jpg';
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.jpg';

const Banner = () => {
    return (
        <Carousel className="text-center" autoPlay infiniteLoop interval={3000}>
            <div className="relative h-[600px]">
                <img src={banner1} alt="Micro tasks" className="object-cover h-full w-full" />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
                    <motion.h2 
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-bold mb-4"
                    >
                        Earn Money by Simple Tasks
                    </motion.h2>
                    <p className="text-xl md:text-2xl">Complete micro tasks and get paid instantly.</p>
                </div>
            </div>
            <div className="relative h-[600px]">
                <img src={banner2} alt="Work from home" className="object-cover h-full w-full" />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
                    <motion.h2 
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-bold mb-4"
                    >
                        Join as a Buyer or Worker
                    </motion.h2>
                    <p className="text-xl md:text-2xl">Flexible opportunities for everyone.</p>
                </div>
            </div>
            <div className="relative h-[600px]">
                <img src={banner3} alt="Secure Payment" className="object-cover h-full w-full" />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
                     <motion.h2 
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-bold mb-4"
                    >
                        Secure & Fast Payments
                    </motion.h2>
                    <p className="text-xl md:text-2xl">Withdraw your earnings hassle-free.</p>
                </div>
            </div>
        </Carousel>
    );
};

export default Banner;
