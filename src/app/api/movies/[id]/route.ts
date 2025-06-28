import { db } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const movieId = Number(id);
        
        if (isNaN(movieId)) {
            return NextResponse.json(
                { error: "Invalid movie ID" },
                { status: 400 }
            );
        }

        const movie = await db.movie.findUnique({
            where: {
                id: movieId,
            }
        });

        if (!movie) {
            return NextResponse.json(
                { error: "Movie not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { movie },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching movie:", error);
        return NextResponse.json(
            { error: "Failed to fetch movie" },
            { status: 500 }
        );
    }
}

export async function DELETE(request :NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const movieId = Number(id);
        
        if (isNaN(movieId)) {
            return NextResponse.json(
                { error: "Invalid movie ID" },
                { status: 400 }
            );
        }

        const deletedMovie = await db.movie.delete({
            where: {
                id: movieId,
            }
        });

        return NextResponse.json(
            { message: "Movie deleted successfully", deletedMovie },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting movie:", error);
        return NextResponse.json(
            { error: "Failed to delete movie" },
            { status: 500 }
        );
    }
}