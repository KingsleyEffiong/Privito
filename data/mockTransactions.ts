// data/mockTransactions.ts

export type Transaction = {
  id: string;
  type: "Deposit" | "Withdrawal";
  amount: number;
  currency: "USD";
  date: string; // ISO string
  status: "Completed";
};

// ✅ Use a fixed seed so it's deterministic across server & client
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// ✅ Generate mock transactions deterministically
export const mockTransactions: Transaction[] = Array.from({ length: 50 }).map(
  (_, i) => {
    const type = i % 2 === 0 ? "Deposit" : "Withdrawal"; // predictable
    const baseAmount = Math.floor(seededRandom(i + 1) * 5000);
    const amount = type === "Deposit" ? baseAmount : -baseAmount;

    return {
      id: `TXN-${1000 + i}`,
      type,
      amount,
      currency: "USD",
      // ✅ Make dates deterministic (e.g., last `i` days)
      date: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
      status: "Completed",
    };
  }
);
