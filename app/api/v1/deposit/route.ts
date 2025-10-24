import { NextResponse } from "next/server";
import connectToDB from "@/utils/database";
import User from "@/model/user";

export async function POST(req: Request) {
  try {
    const { email, amount, transactionId, receiptUrl } = await req.json();

    if (!email || !amount || !transactionId || !receiptUrl) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    await connectToDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update deposit balance
    user.depositBalance = (user.depositBalance || 0) + amount;

    // Add deposit history entry
    user.depositHistory.push({
      amount,
      date: new Date(),
      transactionId,
      receiptUrl,
    });

    await user.save();

    return NextResponse.json(
      {
        message: "Deposit successful",
        depositBalance: user.depositBalance,
        transactionId,
        receiptUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Deposit Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
