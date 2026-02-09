import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { FaQuoteLeft, FaStar } from "react-icons/fa";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import SectionTitle from '../SectionTitle/SectionTitle';

const Testimonial = () => {
    const reviews = [
        {
            _id: 1,
            name: "Sarah Jenkins",
            details: "Micro Earn has been a game-changer! I earned $50 in my first week just by doing simple tasks in my free time.",
            rating: 5,
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            _id: 2,
            name: "David Chen",
            details: "The withdrawal process is incredibly fast. I got my payment via Stripe within minutes. Highly recommended!",
            rating: 4,
            img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            _id: 3,
            name: "Emily Davis",
            details: "As a student, this is the perfect way to make pocket money without affecting my studies. The tasks are easy and fun.",
            rating: 5,
            img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            _id: 4,
            name: "Michael Wilson",
            details: "I've tried many earning sites, but this one is the most legitimate. Great support team and transparent payments.",
            rating: 4,
            img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
        {
            _id: 5,
            name: "Jessica Taylor",
            details: "Love the variety of tasks available. From surveys to app testing, there's always something to do.",
            rating: 5,
            img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        },
    ]

    return (
        <section className="my-20 max-w-6xl mx-auto px-4">
            <SectionTitle subHeading="What Our Clients Say" heading="Testimonials" />

            <Swiper
                navigation={true}
                modules={[Navigation, Autoplay]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                className="mySwiper"
            >
                {
                    reviews.map(review => <SwiperSlide key={review._id}>
                        <div className="flex flex-col items-center mx-10 md:mx-24 my-10 space-y-4">

                            <div className="avatar">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={review.img} alt={review.name} />
                                </div>
                            </div>

                            <div className="flex text-yellow-500 text-xl">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
                                ))}
                            </div>

                            <FaQuoteLeft className="text-6xl text-black mt-4 opacity-10" />

                            <p className="py-4 text-center text-gray-700 max-w-2xl text-lg italic">"{review.details}"</p>
                            <h3 className="text-2xl font-bold text-orange-500">{review.name}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </section>
    );
};

export default Testimonial;
