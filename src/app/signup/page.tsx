"use client"
import { FaRegUser, FaRegEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useReducer, useState } from "react";
import { handleUser } from "@/utils/handleUser";

export default function SignUp() {
    const initialState = {
        userName: "",
        userEmail: "",
        password: "",
        confirmPassword: ""
    }

    const reducer = (state: any, action: any) => {
        switch (action.type) {
            case 'SET_FIELD':
                return {
                    ...state,
                    [action.field]: action.value
                };
            case 'RESET':
                return initialState;
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [userNameError, setUserNameError] = useState("");
    const [userEmailError, setUserEmailError] = useState("");

    const clearErrors = () => {
        setPasswordError("");
        setUserNameError("");
        setUserEmailError("");
    };

    const validateForm = (formData: FormData): boolean => {
        clearErrors();
        let isValid = true;

        const userName = formData.get("userName") as string;
        const userEmail = formData.get("userEmail") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        // Username validation
        if (userName.length < 3) {
            setUserNameError("Username must be at least 3 characters long");
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail)) {
            setUserEmailError("Please enter a valid email address");
            isValid = false;
        }

        // Password validation
        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
            isValid = false;
        } else if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            isValid = false;
        }

        return isValid;
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const isValid = validateForm(formData);

        if (isValid) {
            try {
                const response = await handleUser(formData);
                if (response.error) {
                    setPasswordError(response.error);
                } else {
                    console.log("User created successfully:", response.user);
                    dispatch({ type: 'RESET' });
                    // Redirect to login page
                    window.location.href = "/login";
                }
            } catch (error) {
                console.error("Error creating user:", error);
                setPasswordError("An error occurred while creating the user.");
            }
        }
    };
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
            <div className="w-full max-w-md">
                <form className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl p-8 space-y-6" onSubmit={handleSubmit}>
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
                            Sign Up
                        </h1>
                        <p className="text-gray-400">Create your account to get started</p>
                    </div>

                    {/* Username Field */}
                    <div className="space-y-1">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaRegUser className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="userName"
                                placeholder="Username"
                                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'userName', value: e.target.value })}
                                value={state.userName}
                                required
                            />
                        </div>
                        {userNameError && <p className="text-red-500 text-sm ml-1">{userNameError}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaRegEnvelope className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="userEmail"
                                placeholder="Email address"
                                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'userEmail', value: e.target.value })}
                                value={state.userEmail}
                                required
                            />
                        </div>
                        {userEmailError && <p className="text-red-500 text-sm ml-1">{userEmailError}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'password', value: e.target.value })}
                                value={state.password}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-1">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="text-gray-400" />
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm password"
                                className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'confirmPassword', value: e.target.value })}
                                value={state.confirmPassword}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {passwordError && <p className="text-red-500 text-sm ml-1">{passwordError}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                        Create Account
                    </button>

                    {/* Login Link */}
                    <div className="text-center">
                        <p className="text-gray-400">
                            Already have an account?{" "}
                            <a href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                                Sign in
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}