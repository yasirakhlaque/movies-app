"use server";
import { redirect } from "next/navigation";
import { db } from "./db";

export async function createMovie(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const genre = formData.get("genre") as string;
    const posterUrl = formData.get("posterUrl") as string;
    const rating = parseFloat(formData.get("rating") as string);
    const releaseData = new Date(formData.get("releaseData") as string);

    if (!title || !description || !genre || !posterUrl || isNaN(rating) || isNaN(releaseData.getTime())) {
        throw new Error("Validation failed");
    }

    await db.movie.create({
        data: {
            title,
            description,
            genre,
            posterUrl,
            rating,
            releaseData,
        },
    });

    redirect('/');
}

export async function deleteMovies(formData: FormData) {
    const movieId = await formData.get("movieId") as string;

    if (!movieId) {
        throw new Error("Movie ID is required");
    }

    await db.movie.delete({
        where: {
            id: +movieId,
        },
    });

    redirect('/');
}