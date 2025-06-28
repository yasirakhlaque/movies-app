import { getMovieById } from "@/utils/getMovies";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { MdDeleteOutline } from "react-icons/md";
import { deleteMovies } from "@/utils/createMovies";

export default async function MoviesDetails({ params }: { params: { id: string } }) {
    const { id } = await params;
    const movie = await getMovieById(id);

    if (!movie) {
        return (
            <div className="bg-gray-900 min-h-screen">
                <Navbar />
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
                    <h1 className="text-4xl font-bold mb-4">Movie Not Found</h1>
                    <p className="text-gray-400 text-lg mb-8">The movie you are looking for does not exist.</p>
                    <Link
                        href="/movies"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                    >
                        Go Back to Movies
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="flex flex-col lg:flex-row gap-8 mb-8">
                    {/* Poster */}
                    <div className="lg:w-1/3">
                        <img
                            src={movie.posterUrl}
                            alt={movie.title}
                            className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                        />
                    </div>

                    {/* Movie Info */}
                    <div className="lg:w-2/3 text-white space-y-6">
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{movie.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                                    {movie.genre}
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-yellow-400 text-xl">★</span>
                                    <span className="text-white font-semibold text-lg">{movie.rating}</span>
                                    <span className="text-gray-400">/10</span>
                                </div>
                                <span className="text-gray-400">
                                    Released: {new Date(movie.releaseData).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold mb-4">Overview</h2>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                {movie.description}
                            </p>
                        </div>
                        <div className="flex gap-4 pt-6">
                            <form>
                                <input type="hidden" name="movieId" value={id} />
                                <button className="bg-red-500 text-white py-3 px-4 rounded-lg" formAction={deleteMovies}><MdDeleteOutline /></button>
                            </form>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                                Watch Now
                            </button>
                            <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                                Add to Watchlist
                            </button>
                            <Link
                                href="/movies"
                                className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                            >
                                Back to Movies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}