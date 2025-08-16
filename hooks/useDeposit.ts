"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type DepositPayload = {
  email: string;
  amount: number;
  transactionId: string;
  receiptUrl: string;
};

type DepositResponse = {
  message: string;
  depositBalance: number;
};

async function depositMoney(payload: DepositPayload): Promise<DepositResponse> {
  const res = await axios.post("/api/v1/deposit", payload, {
    withCredentials: true,
  });
  return res.data;
}

export function useDeposit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: depositMoney,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
