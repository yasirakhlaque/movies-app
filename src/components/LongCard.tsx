import { LuBookmark } from "react-icons/lu";
import { Movie } from "./MoviesCard";
import Link from "next/link";


export default async function LongCard({ movie }: { movie: Movie }) {
    const { title, description, genre, posterUrl, rating, releaseData } = movie;

    return (
        <Link href={`/movies/${movie.id}`} className="no-underline">
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-[90%] mx-auto my-6 hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-gray-600">
                <div className="flex gap-6 h-80">
                    {/* Poster Section */}
                    <div className="h-full w-60 flex-shrink-0">
                        <img
                            src={posterUrl}
                            alt={title}
                            className="h-full w-full object-cover rounded-xl shadow-md"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 flex flex-col justify-between py-2">
                        {/* Top Section - Title and Genre */}
                        <div className="space-y-4">
                            <div>
                                <h1 className="text-white font-bold text-3xl mb-2 line-clamp-2">
                                    {title}
                                </h1>
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        {genre}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center">
                                            <span className="text-yellow-400 text-lg">★</span>
                                            <span className="text-white font-semibold ml-1">{rating}</span>
                                            <span className="text-gray-400 text-sm ml-1">/10</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-gray-300 font-semibold text-lg">Overview</h3>
                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-4">
                                    {description}
                                </p>
                            </div>
                        </div>

                        {/* Bottom Section - Release Date and Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                            <div className="flex items-center gap-6">
                                <div>
                                    <span className="text-gray-500 text-xs uppercase tracking-wide">Release Date</span>
                                    <p className="text-white font-medium">{new Date(releaseData).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                                    Watch Now
                                </button>
                                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors duration-200">
                                    <LuBookmark />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}