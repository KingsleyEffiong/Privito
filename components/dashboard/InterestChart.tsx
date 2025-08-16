"use client";
import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useUser } from "@/hooks/useUser";

interface DataPoint {
  day: string;
  interest: number;
}

interface InterestEntry {
  amountAdded: number;
  date?: string;
  createdAt?: string; // some APIs use createdAt
}

const InterestChart: React.FC = () => {
  const { data, isLoading } = useUser();

  // Transform interestHistory into chart-friendly format
  const chartData: DataPoint[] = useMemo(() => {
    if (data?.success && Array.isArray(data?.data?.interestHistory)) {
      return (data.data.interestHistory as InterestEntry[]).map(
        (entry: InterestEntry) => {
          const date = new Date(entry.createdAt ?? entry.date ?? new Date());
          return {
            day: date.toLocaleDateString("en-US", {
              weekday: "short",
            }),
            interest: entry.amountAdded ?? 0,
          };
        }
      );
    }
    return [];
  }, [data]);

  const hasData = chartData.length > 0;

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg">
      <h2 className="text-lg font-semibold text-white mb-4">Daily Interest</h2>

      {isLoading ? (
        <div className="flex items-center justify-center h-[300px] text-gray-400 text-lg font-medium animate-pulse">
          Loading interest...
        </div>
      ) : hasData ? (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis dataKey="day" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(17, 25, 40, 0.85)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                color: "#fff",
              }}
            />
            <Area
              type="monotone"
              dataKey="interest"
              stroke="#38bdf8"
              fill="url(#colorInterest)"
              strokeWidth={3}
              dot={{ r: 4, fill: "#38bdf8", strokeWidth: 2, stroke: "#fff" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-[300px] text-gray-300 text-lg font-medium">
          No Interest Yet
        </div>
      )}
    </div>
  );
};

export default InterestChart;
