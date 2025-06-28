import Navbar from "@/components/Navbar";
import { createMovie } from "@/utils/createMovies";
import { BiCameraMovie, BiCategory } from 'react-icons/bi';
import { MdCalendarMonth, MdOutlineDescription, MdOutlineLink, MdStars } from 'react-icons/md';

export default async function AddMovies() {

return (
    <div className="bg-gray-900 min-h-screen">
        <Navbar />
        <div className="flex flex-grow justify-center items-center w-full">
            <form className="flex flex-col gap-6 bg-gray-800 text-gray-200 p-10 rounded-xl shadow-2xl w-full max-w-lg m-8" action={createMovie}>
                <h2 className="text-3xl font-bold text-center text-white mb-6">Add New Movie</h2>
                <div className="relative flex items-center border border-gray-600 rounded-lg focus-within:border-blue-500 transition-all duration-300">
                    <BiCameraMovie size={24} className="absolute left-4 text-gray-400" />
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter Movie Title"
                        className="w-full pl-12 pr-4 py-3 bg-gray-700 rounded-lg outline-none text-white placeholder-gray-400 focus:bg-gray-600 transition-colors duration-300"
                    />
                </div>

                {/* Description */}
                <div className="relative flex items-center border border-gray-600 rounded-lg focus-within:border-blue-500 transition-all duration-300">
                    <MdOutlineDescription size={24} className="absolute left-4 text-gray-400" />
                    <textarea
                        name="description"
                        placeholder="Enter Description"
                        className="w-full pl-12 pr-4 py-3 bg-gray-700 rounded-lg outline-none text-white placeholder-gray-400 focus:bg-gray-600 resize-y transition-colors duration-300"
                    ></textarea>
                </div>

                {/* Genre */}
                <div className="relative flex items-center border border-gray-600 rounded-lg focus-within:border-blue-500 transition-all duration-300">
                    <BiCategory size={24} className="absolute left-4 text-gray-400" />
                    <input
                        type="text"
                        name="genre"
                        placeholder="Enter Movie Genre"
                        className="w-full pl-12 pr-4 py-3 bg-gray-700 rounded-lg outline-none text-white placeholder-gray-400 focus:bg-gray-600 transition-colors duration-300"
                    />
                </div>

                {/* Poster URL */}
                <div className="relative flex items-center border border-gray-600 rounded-lg focus-within:border-blue-500 transition-all duration-300">
                    <MdOutlineLink size={24} className="absolute left-4 text-gray-400" />
                    <input
                        type="text"
                        name="posterUrl"
                        placeholder="Enter Movie Poster link"
                        className="w-full pl-12 pr-4 py-3 bg-gray-700 rounded-lg outline-none text-white placeholder-gray-400 focus:bg-gray-600 transition-colors duration-300"
                    />
                </div>

                {/* Rating */}
                <div className="relative flex items-center border border-gray-600 rounded-lg focus-within:border-blue-500 transition-all duration-300">
                    <MdStars size={24} className="absolute left-4 text-gray-400" />
                    <input
                        type="number"
                        name="rating"
                        placeholder="Enter Movie Rating (1-10)"
                        min="1" // Added min/max for rating
                        max="10"
                        step="0.1" // Allow decimal ratings
                        className="w-full pl-12 pr-4 py-3 bg-gray-700 rounded-lg outline-none text-white placeholder-gray-400 focus:bg-gray-600 transition-colors duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" // Hide spin buttons
                    />
                </div>
                <div className="relative flex items-center border border-gray-600 rounded-lg focus-within:border-blue-500 transition-all duration-300">
                    <MdCalendarMonth size={24} className="absolute left-4 text-gray-400" />
                    <input
                        type="date"
                        name="releaseData"
                        className="w-full pl-12 pr-4 py-3 bg-gray-700 rounded-lg outline-none text-white placeholder-gray-400 focus:bg-gray-600 transition-colors duration-300"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                        Add Movie
                    </button>
                </div>
            </form>
        </div>
    </div>
);
}