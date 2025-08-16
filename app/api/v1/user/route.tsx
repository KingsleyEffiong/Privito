import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "@/model/user";
import { NextRequest } from "next/server";
import { JWT_SECRET } from "@/config/env";
import connectToDB from "@/utils/database";

interface DecodedToken extends JwtPayload {
  userId?: string;
}

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    // Extract token from cookies
    const token = req.cookies.get("session")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    if (!decoded.userId) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 403 }
      );
    }

    // Fetch user
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    console.error("Get User Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
