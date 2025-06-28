"use client"
import { useState } from "react";
import { FaRegEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const formData = new FormData(e.currentTarget);
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            // Basic validation
            if (!email || !password) {
                setError("Please fill in all fields");
                setIsLoading(false);
                return;
            }

            const response = await fetch("/api/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login successful:", data);
                
                // Save token to localStorage
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    console.log("Token saved to localStorage");
                }
                
                // Optional: Also save user data
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                }
                
                // Redirect to home page
                window.location.href = "/";
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
            <div className="w-full max-w-md">
                <form 
                    onSubmit={handleSubmit} 
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl p-8 space-y-6"
                >
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Welcome Back
                        </h1>
                        <p className="text-gray-400">Sign in to your account</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                            <p className="text-red-400 text-sm text-center">{error}</p>
                        </div>
                    )}

                    {/* Email Field */}
                    <div className="space-y-1">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaRegEnvelope className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                required
                                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                required
                                className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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

                    {/* Forgot Password */}
                    <div className="text-right">
                        <a 
                            href="/forgot-password" 
                            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            Forgot your password?
                        </a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg shadow-lg transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isLoading ? "Signing in..." : "Sign In"}
                    </button>

                    {/* Sign Up Link */}
                    <div className="text-center">
                        <p className="text-gray-400">
                            Don't have an account?{" "}
                            <a href="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                                Sign up
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}