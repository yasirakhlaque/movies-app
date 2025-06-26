import { db } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const movies = await db.movie.findMany({
            orderBy: {
                createdAt: 'desc' // Show newest movies first
            }
        });

        return NextResponse.json(
            { movies },
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

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const genre = formData.get("genre") as string;
        const posterUrl = formData.get("posterUrl") as string;
        const rating = formData.get("rating") as string;
        const releaseData = formData.get("releaseData") as string;

        console.log("Received form data:", {
            title,
            description,
            genre,
            posterUrl,
            rating,
            releaseData
        });

        // Validate required fields
        if (!title || !description || !genre || !posterUrl || !rating || !releaseData) {
            const missingFields = [];
            if (!title) missingFields.push("title");
            if (!description) missingFields.push("description");
            if (!genre) missingFields.push("genre");
            if (!posterUrl) missingFields.push("posterUrl");
            if (!rating) missingFields.push("rating");
            if (!releaseData) missingFields.push("releaseData");
            
            console.log("Missing fields:", missingFields);
            
            return NextResponse.json(
                { error: "All fields are required", missingFields },
                { status: 400 }
            );
        }

        // Validate rating is a number
        const ratingNum = parseFloat(rating);
        if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 10) {
            return NextResponse.json(
                { error: "Rating must be a number between 1 and 10" },
                { status: 400 }
            );
        }

        // Validate date
        const releaseDate = new Date(releaseData);
        if (isNaN(releaseDate.getTime())) {
            return NextResponse.json(
                { error: "Invalid release date" },
                { status: 400 }
            );
        }

        const movie = await db.movie.create({
            data: {
                title,
                description,
                genre,
                posterUrl,
                rating: ratingNum,
                releaseData: releaseDate,
            }
        });

        return NextResponse.json(
            { message: "Movie created successfully", movie },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating movie:", error);
        return NextResponse.json(
            { error: "Failed to create movie", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
