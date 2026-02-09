import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../api/utils";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const onSubmit = async (data) => {
        try {
            // 1. Upload Image
            const imageFile = data.image[0];
            const photoURL = await imageUpload(imageFile);

            // 2. Create User
            const result = await createUser(data.email, data.password);
            const loggedUser = result.user;
            console.log(loggedUser);

            // 3. Update Profile
            await updateUserProfile(data.name, photoURL);

            // 4. Save to Database
            const userInfo = {
                name: data.name,
                email: data.email,
                role: data.role,
                image: photoURL,
                coins: data.role === 'worker' ? 10 : 50
            }
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);
            if (res.data.insertedId || res.data._id) {
                console.log('user added to the database');
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: res.data.message || "User already exists or failed to save.",
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: error.message,
            });
        }
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(async result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    image: result.user?.photoURL,
                    role: 'worker',
                    coins: 10
                }
                await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);
                navigate('/');
            })
            .catch(error => console.log(error));
    }

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

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign up now!</h1>
                    <p className="py-6">Join our platform to earn or get work done.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                            {errors.name && <span className="text-red-600">Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Profile Picture</span>
                            </label>
                            <input
                                type="file"
                                {...register("image", { required: true, onChange: handleImageChange })}
                                className="file-input file-input-bordered w-full max-w-xs"
                            />
                            {imagePreview && (
                                <div className="mt-2 flex justify-center relative w-fit mx-auto">
                                    <div className="avatar">
                                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={imagePreview} alt="Preview" />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute -top-2 -right-2 btn btn-xs btn-circle btn-error text-white shadow-md z-10"
                                    >
                                        <FaTimes size={12} />
                                    </button>
                                </div>
                            )}
                            {errors.image && <span className="text-red-600">Image is required</span>}
                        </div>
                        <div className="form-control">

                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                            {errors.email && <span className="text-red-600">Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"} {...register("password", { required: true, minLength: 6, maxLength: 20 })} placeholder="password" className="input input-bordered w-full" />
                                <button
                                    type="button"
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.password && <span className="text-red-600">Password is required (min 6 chars)</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Role</span>
                            </label>
                            <select {...register("role", { required: true })} className="select select-bordered w-full max-w-xs">
                                <option value="worker">Worker</option>
                                <option value="buyer">Buyer</option>
                            </select>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                    <div className="text-center mb-4 px-8">
                        <button onClick={handleGoogleSignIn} className="btn btn-outline w-full flex items-center justify-center gap-2">
                            <FcGoogle className="text-2xl" />
                            Google Sign In
                        </button>
                    </div>
                    <p className="text-center mb-4">Already have an account? <Link to="/login" className="font-bold text-primary">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
