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
                <img src={posterUrl} alt={title} className="h-[100%] w-[100%] object-cover rounded-2xl" />
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="text-gray-500 font-medium">{genre}</p>
            </div>
        </div>
    )
}
