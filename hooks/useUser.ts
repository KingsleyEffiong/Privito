"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Interest = {
  amountAdded: number;
};

type User = {
  _id: string;
  full_name?: string;
  email?: string;
  username?: string;
  lastInterestApplied: Date | string;
  depositBalance?: number;
  interestHistory?: Interest[];
  depositHistory?: [];
};

type ApiResponse = {
  success: boolean;
  message?: string;
  data?: User;
};

async function getUser(): Promise<ApiResponse> {
  const res = await axios.get<ApiResponse>("/api/v1/user", {
    withCredentials: true,
  });
  return res.data;
}

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
