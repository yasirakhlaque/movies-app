import MoviesCard from "@/components/MoviesCard";
import Navbar from "@/components/Navbar";
import { getMovies } from "@/utils/getMovies";

export default async function Home() {
  const movies = await getMovies();
  return (
    <div className="bg-gray-900 min-h-screen overflow-hidden">
      <Navbar />
      <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-white font-semibold text-center text-3xl hover:scale-110 transition-all duration-300">Recent</h1>
        <div className="flex justify-center items-center flex-wrap gap-8 p-8">
          {movies.slice(0, 3).map((movie) => (
            <MoviesCard key={movie.id} movie={movie} />
          ))
          }
        </div>
      </div>

      <h1 className="text-white font-semibold text-3xl text-center hover:scale-110 transition-all duration-300">All Movies</h1>
      <div className="flex justify-center items-center flex-wrap gap-8 p-8">
        {movies.length === 0 ? (
          <div className="text-white text-center">
            <h2 className="text-2xl mb-4">No movies found</h2>
            <p className="text-gray-400">Add some movies to get started!</p>
          </div>
        ) : (
          movies.map((movie) => (
            <MoviesCard key={movie.id} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
}
