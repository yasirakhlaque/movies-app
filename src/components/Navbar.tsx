import Link from "next/link"
import { FaBookmark, FaSearch } from "react-icons/fa"
import { LuBookmark } from "react-icons/lu"

export default function Navbar() {
    const navLinks = [
        { name: "Home", link: "/" },
        { name: "Movies", link: "/movies" },
        { name: "People", link: "/people" },
    ]
    return (
        <>
            <nav className="flex justify-between items-center p-4 text-white border-b-1">
                <div className="flex justify-center items-center gap-8">
                    <h1 className="font-bold text-[1.3rem]">CineMatch</h1>
                    <ul className="flex justify-center items-center gap-16 font-semibold">
                        {navLinks.map((option, index) => (
                            <li key={index}>
                                <Link href={option.link}>
                                    <h1>{option.name}</h1>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex justify-center items-center gap-12">

                    <div className="flex gap-5">
                        <div className="bg-gray-800 rounded-2xl flex justify-center items-center">
                            <button className="p-3"><FaSearch /></button>
                            <input type="text" name="search" placeholder="Search Movies...." className="outline-none"/>
                        </div>
                        <button className="bg-gray-700 rounded-full p-3  cursor-pointer hover:bg-gray-950 transition-all duration-300"><LuBookmark /></button>
                    </div>
                    <button className="bg-gray-800 h-10 w-20 rounded-[1.5vh] font-semibold cursor-pointer hover:bg-gray-950 transition-all duration-300">Login</button>
                </div>
            </nav>
        </>
    )
}