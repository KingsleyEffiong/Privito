import { NextResponse } from "next/server";
import connectToDB from "@/utils/database";
import User from "@/model/user";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();
    console.log(userId);

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    await connectToDB();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const now = new Date();
    let hoursSince = Infinity;

    if (user.lastInterestApplied) {
      hoursSince =
        (now.getTime() - user.lastInterestApplied.getTime()) / (1000 * 60 * 60);
    }

    // ✅ Determine interest rate based on deposit balance
    let interestRate = 0;
    const balance = user.depositBalance || 0;

    if (balance >= 100 && balance < 500) {
      interestRate = 0.01; // 1% starter
    } else if (balance >= 500 && balance < 1000) {
      interestRate = 0.04; // 4% pro
    } else if (balance >= 1000) {
      interestRate = 0.08; // 8% premium
    }

    // ✅ Only apply if 2 minutes passed and interest rate > 0
    if (hoursSince >= 24 && interestRate > 0) {
      const interestAmount = balance * interestRate;
      const newBalance = balance + interestAmount;

      user.depositBalance = newBalance;

      user.interestHistory.push({
        amountAdded: interestAmount,
        oldBalance: balance,
        newBalance,
        appliedAt: now,
      });

      console.log(`💰 Interest applied: ${interestAmount}`);

      user.lastInterestApplied = now;

      await user.save();
    }

    return NextResponse.json(
      {
        message:
          hoursSince >= 24 && interestRate > 0
            ? "Interest applied"
            : "No update needed yet",
        depositBalance: user.depositBalance,
        interestHistory: user.interestHistory,
        lastInterestApplied: user.lastInterestApplied,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Interest Update Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
