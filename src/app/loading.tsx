export default function Loading(){
    return(
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-600"></div>
            <p className="text-white ml-4">Loading...</p>
        </div>
    )
}