import MoviesCard from "@/components/MoviesCard";
import Navbar from "@/components/Navbar";
import { Movie } from "@/components/MoviesCard";

async function getMovies(): Promise<Movie[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/movies`, {
      cache: 'no-store' // Always fetch fresh data
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch movies');
    }
    
    const data = await res.json();
    return data.movies || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    return []; // Return empty array if fetch fails
  }
}

export default async function Home() {
  const movies = await getMovies();

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
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
