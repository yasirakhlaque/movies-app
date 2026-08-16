import { Movie } from "@/components/MoviesCard";
import { db } from "./db";

export async function getMovies() {
        const movies = await db.movie.findMany({
            orderBy:{
                createdAt: 'desc' 
            }
        });
        if (!movies) {
            throw new Error('Failed to fetch movies');
        }
        return movies;
}

export async function getMovieById(id: string): Promise<Movie | null> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const url = `${baseUrl}/api/movies/${id}`;
        
        const res = await fetch(url, {
            cache: 'no-store' // Always fetch fresh data
        });

        if (!res.ok) {
            console.error(`Failed to fetch movie: ${res.status} ${res.statusText}`);
            return null;
        }

        const data = await res.json();
        return data.movie || null;
    } catch (error) {
        console.error('Error fetching movie:', error);
        return null; // Return null if fetch fails
    }
}