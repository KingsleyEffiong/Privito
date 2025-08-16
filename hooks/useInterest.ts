"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type InterestPayload = {
  userId: string;
};

type InterestResponse = {
  message: string;
  depositBalance: number;
  interestHistory: {
    amountAdded: number;
    oldBalance: number;
    newBalance: number;
    appliedAt: string;
  }[];
  lastInterestApplied: string;
};

async function applyInterest(
  payload: InterestPayload
): Promise<InterestResponse> {
  const res = await axios.post("/api/v1/interest", payload, {
    withCredentials: true,
  });
  return res.data;
}

export function useInterest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applyInterest,
    onSuccess: () => {
      // Refresh the user data so updated balance & interest history is visible
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
