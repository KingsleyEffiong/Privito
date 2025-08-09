import connectToDB from "@/utils/database";
import User from "@/model/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "@/config/env";
import { NextRequest } from "next/server";
import ApiError from "@/utils/ApiError";
import { handleError } from "@/utils/errorHandler";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const { username, password } = await req.json();

    if (!username || !password) {
      throw new ApiError(400, "Username and password are required.");
    }

    const user = await User.findOne({ username });
    if (!user) {
      throw new ApiError(401, "Invalid credentials.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials.");
    }

    if (!JWT_SECRET) {
      throw new ApiError(500, "JWT secret is not defined.");
    }

    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET as string, // ✅ ensure it's typed correctly
      {
        expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"], // ✅ correct typing
      }
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: "Login successful.",
        data: {
          token,
          user: {
            id: user._id,
            full_name: user.full_name,
            email: user.email,
            username: user.username,
          },
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return handleError(error);
  }
}
