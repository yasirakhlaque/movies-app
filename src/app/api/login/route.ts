import { db } from "@/utils/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return new Response(JSON.stringify({ message: "Email and password are required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Find user by email
        const user = await db.user.findFirst({
            where: { email: email },
        });

        if (!user) {
            return new Response(JSON.stringify({ message: "Invalid email or password" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return new Response(JSON.stringify({ message: "Invalid email or password" }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET || "your-secret-key",
            { expiresIn: "24h" }
        );

        // Return success response (fixed field names)
        return new Response(JSON.stringify({ 
            message: "Login successful", 
            user: { 
                id: user.id,
                email: user.email,
                userName: user.name  // Fixed: match your schema
            },
            token 
        }), {
            status: 200,
            headers: { 
                "Content-Type": "application/json",
                "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        return new Response(JSON.stringify({ message: "Internal server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}