"use server";
import { db } from "./db";
import bcrypt from "bcryptjs";

export async function handleUser(formData: FormData) {
    const userName = formData.get("userName") as string;
    const userEmail = formData.get("userEmail") as string;
    const password = formData.get("password") as string;

    // Validate input
    if (!userName || !userEmail || !password) {
        return { error: "All fields are required" };
    }

    try {
        // Check if user already exists
        const userValidate = await db.user.findFirst({ 
            where: { email: userEmail } 
        });
        
        if (userValidate) {
            return { error: "User already exists" };
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user with hashed password
        const newUser = await db.user.create({
            data: {
                name: userName,  // Fixed: match your schema
                email: userEmail,
                password: hashedPassword,  // Store hashed password
            }
        });

        // Return user without password
        const { password: _, ...userWithoutPassword } = newUser;
        return { success: "User created successfully", user: userWithoutPassword };
    } catch (error) {
        console.error("Error creating user:", error);
        return { error: "Failed to create user" };
    }
}