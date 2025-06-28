import LongCard from "@/components/LongCard";
import Navbar from "@/components/Navbar";
import { getMovies } from "@/utils/getMovies";

export default async function MoviesPage() {
    const movies = await getMovies();
    return (
        <div className="bg-gray-900">
            <Navbar />
            <div className="p-4">
                <h1 className="text-3xl font-bold text-center text-white mt-10">Movies Page</h1>
                <p className="text-center text-gray-400 mt-4">This is the movies page where you can view and manage your movies.</p>
                {movies.map((movie) => (
                    <LongCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}