import { FaStar } from "react-icons/fa";

export type Movie = {
    id: number,
    title: string,
    description: string,
    genre: string,
    posterUrl: string,
    rating: number,
    releaseData: string, // Added releaseData field
    createdAt?: string, // Optional database fields
    updatedAt?: string,
}

export default function MoviesCard({ movie }: { movie: Movie }) {
    const { title, description, genre, posterUrl, rating } = movie;

    return (
        <div className="flex justify-center flex-col h-[55vh] p-4">
            <div className="h-[80%] rounded-2xl">
                <img src={posterUrl} alt={title} className="h-[100%] w-[100%] object-cover rounded-2xl hover:scale-110 transition-all duration-300" />
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-white hover:translate-1 transition-all duration-200">{title}</h3>
                <div className="flex justify-between items-center">
                    <p className="text-gray-500 font-medium">{genre}</p>
                    <h4 className="text-yellow-600 flex justify-center items-center gap-1 text-[.8rem]"><FaStar className="text-yellow-600 hover:scale-130 transition-all duration-200"/>{rating}/10</h4>
                </div>
            </div>
        </div>
    )
}
