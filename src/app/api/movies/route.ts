import { db } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET_BY_ID(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const movieId = Number(params.id);
        const movie = db.movie.findUnique({
            where: {
                id: movieId,
            }
        })
         return NextResponse.json(
            { movie },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching movies:", error);
        return NextResponse.json(
            { error: "Failed to fetch movies" },
            { status: 500 }
        );
    }
}
