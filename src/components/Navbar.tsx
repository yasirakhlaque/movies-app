"use client"
import Link from "next/link"
import { FaBookmark, FaSearch } from "react-icons/fa"
import { LuBookmark } from "react-icons/lu"
import { useState, useEffect } from "react"

export default function Navbar() {
    const [mobileNavigation, setMobileNavigation] = useState<boolean>(false);
    const [isUser, setIsUser] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Check authentication status
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // Check if token exists in localStorage or cookie
                const token = localStorage.getItem('token') || getCookieValue('token');

                if (!token) {
                    setIsUser(false);
                    setIsLoading(false);
                    return;
                }
                if (token) {
                    setIsUser(true);
                } else {
                    // Token is invalid, remove it
                    localStorage.removeItem('token');
                    setIsUser(false);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setIsUser(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    // Helper function to get cookie value
    const getCookieValue = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
        return null;
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        // Clear cookie
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setIsUser(false);
        window.location.href = '/login';
    };

    // Handle login navigation
    const handleAuth = () => {
        if (isUser) {
            handleLogout();
        } else {
            window.location.href = '/login';
        }
    };

    const navLinks = [
        { name: "Home", link: "/" },
        { name: "Movies", link: "/movies" },
        { name: "People", link: "/people" },
    ]

    return (
        <>
            <nav className="hidden md:flex justify-between items-center p-4 text-white border-b-1">
                {/*Desktop Navigation*/}
                <div className="flex justify-center items-center gap-8">
                    <h1 className="font-bold text-[1.3rem]">CineMatch</h1>
                    <ul className="flex justify-center items-center gap-16 font-semibold">
                        {navLinks.map((option, index) => (
                            <li key={index}>
                                <Link href={option.link}>
                                    <h1 className="hover:text-blue-400 transition-colors duration-300">{option.name}</h1>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex justify-center items-center gap-12">
                    <div className="flex gap-5">
                        <div className="bg-gray-800 rounded-2xl flex justify-center items-center">
                            <button className="p-3"><FaSearch /></button>
                            <input type="text" name="search" placeholder="Search Movies...." className="outline-none bg-transparent text-white placeholder-gray-400" />
                        </div>
                        {isUser && (
                            <button className="bg-gray-700 rounded-full p-3 cursor-pointer hover:bg-gray-950 transition-all duration-300">
                                <LuBookmark />
                            </button>
                        )}
                    </div>
                    {
                        isLoading ? "..." : (isUser ?
                            <button
                                onClick={handleAuth}
                                disabled={isLoading}
                                className="bg-red-800 h-10 w-20 rounded-[1.5vh] font-semibold cursor-pointer hover:bg-red-950 transition-all duration-300 disabled:opacity-50"
                            >
                                Logout
                            </button>
                            : <button
                                onClick={handleAuth}
                                disabled={isLoading}
                                className="bg-gray-800 h-10 w-20 rounded-[1.5vh] font-semibold cursor-pointer hover:bg-gray-950 transition-all duration-300 disabled:opacity-50"
                            >
                                Login
                            </button>)
                    }
                </div>
            </nav>

            {/*Mobile Navigation*/}
            <div className="md:hidden bg-gray-900 text-white relative">
                {/* Mobile Header */}
                <div className="flex justify-between items-center p-4 text-white border-b border-gray-700 relative z-20">
                    <h1 className="font-bold text-[1.3rem]">CineMatch</h1>
                    <button
                        className="text-2xl font-semibold text-white p-2 transition-transform duration-300 ease-in-out hover:scale-110"
                        onClick={() => setMobileNavigation(!mobileNavigation)}
                    >
                        <div className={`transition-transform duration-300 ease-in-out ${mobileNavigation ? 'rotate-90' : ''}`}>
                            {mobileNavigation ? <button className="text-6xl rotate-45">+</button> : "|||"}
                        </div>
                    </button>
                </div>

                {/* Mobile Overlay Menu */}
                <div className={`fixed inset-0 bg-gray-900 z-10 flex justify-center items-center flex-col gap-8 transition-all duration-500 ease-in-out ${mobileNavigation
                    ? 'translate-x-0 opacity-100 visible'
                    : 'translate-x-full opacity-0 invisible'
                    }`}>

                    {/* Navigation Links */}
                    <div className="flex flex-col justify-center items-center gap-8">
                        <ul className="flex justify-center items-center flex-col gap-8 font-semibold text-xl">
                            {navLinks.map((option, index) => (
                                <li
                                    key={index}
                                    className={`transition-all duration-700 ease-out transform ${mobileNavigation
                                        ? 'translate-y-0 opacity-100'
                                        : 'translate-y-8 opacity-0'
                                        }`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <Link
                                        href={option.link}
                                        onClick={() => setMobileNavigation(false)}
                                        className="hover:text-blue-400 transition-colors duration-300"
                                    >
                                        <h1>{option.name}</h1>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className={`flex justify-center items-center gap-6 flex-col transition-all duration-700 ease-out transform ${mobileNavigation
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-8 opacity-0'
                        }`}
                        style={{ transitionDelay: '400ms' }}>
                        {isUser && (
                            <button className="bg-gray-700 rounded-full p-4 cursor-pointer hover:bg-gray-600 transition-all duration-300 hover:scale-110">
                                <LuBookmark size={20} />
                            </button>
                        )}
                        {
                            isLoading ? "..." : (isUser ?
                                <button
                                    onClick={handleAuth}
                                    disabled={isLoading}
                                    className="bg-red-800 h-10 w-20 rounded-[1.5vh] font-semibold cursor-pointer hover:bg-red-950 transition-all duration-300 disabled:opacity-50"
                                >
                                    Logout
                                </button>
                                : <button
                                    onClick={handleAuth}
                                    disabled={isLoading}
                                    className="bg-gray-800 h-10 w-20 rounded-[1.5vh] font-semibold cursor-pointer hover:bg-gray-950 transition-all duration-300 disabled:opacity-50"
                                >
                                    Login
                                </button>
                            )}
                    </div>
                </div>

                {/* Backdrop */}
                {mobileNavigation && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-5 transition-opacity duration-300"
                        onClick={() => setMobileNavigation(false)}
                    />
                )}
            </div>
        </>
    )
}