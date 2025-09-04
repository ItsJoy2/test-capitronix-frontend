"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Wallet } from "lucide-react";
import axiosInstance from "@/lib/fetch/axiosConfig/axiosConfig";
import { useMutation } from "@tanstack/react-query";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/toast/ToastSuccess";
import { AxiosError } from "axios";
import { addFund } from "@/components/types/addFund/addFung";
import { useGetData } from "@/lib/fetch/axiosConfig/FetchData";
import { UserProfileResponse } from "@/components/types/profile/profile";

export default function WithdrawPage() {
  const [wallet, setWallet] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");

  const { data: profile, refetch } = useGetData<UserProfileResponse>(
    ["profile"],
    `/profile`
  );

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: {
      wallet: string;
      amount: number;
      wallet_type: string;
    }) => {
      const response = await axiosInstance.post<addFund>(`/withdraw`, data);
      return response.data;
    },
    onSuccess: (data: addFund) => {
      if (data.data.status === false) {
        showErrorAlert(data.data.message);
      } else {
        showSuccessAlert(data.data.message);
        refetch();
        setWallet("");
        setAmount("");
      }
    },
    onError: (err: AxiosError<{ message: string }>) => {
      showErrorAlert(err.response?.data.message || "Something went wrong");
    },
  });

  const handleWithdraw = () => {
    if (!wallet || !amount || amount < 10) return;
    mutate({ wallet, amount: Number(amount), wallet_type: "profit_wallet" });
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-6">
      <div className="bg-slate-800/95 text-white rounded-lg p-6 border border-slate-700/50 backdrop-blur-sm space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3 text-xl mb-4">
          <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          Withdraw
        </div>

        <div className="space-y-4">
          {/* Balance */}
          <div>
            <Label className="text-slate-300 font-medium">
              Profit Wallet Balance
            </Label>
            <Input
              type="number"
              value={profile?.data.profit_wallet}
              className="bg-slate-700/50 border-slate-600/50 text-white mt-2"
              readOnly
            />
          </div>

          {/* Network */}
          <div>
            <Label className="text-slate-300 font-medium">
              Withdraw Network
            </Label>
            <Input
              type="text"
              value="USDT BEP-20"
              className="bg-slate-700/50 border-slate-600/50 text-white mt-2"
              readOnly
            />
          </div>

          {/* Wallet */}
          <div>
            <Label className="text-slate-300 font-medium">
              Withdraw Address
            </Label>
            <Input
              type="text"
              placeholder="Enter your wallet address"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              className="bg-slate-700/50 border-slate-600/50 text-white mt-2"
            />
          </div>

          {/* Amount */}
          <div>
            <Label className="text-slate-300 font-medium">
              Withdrawal Amount
            </Label>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value ? Number(e.target.value) : "")
              }
              className="bg-slate-700/50 border-slate-600/50 text-white mt-2"
              min="1"
              step="0.01"
            />
            <p className="text-xs text-slate-400 mt-1">
              Minimum withdraw: $10 USDT
            </p>
          </div>

          {/* Button */}
          <Button
            onClick={handleWithdraw}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 shadow-lg"
            disabled={!wallet || !amount || Number(amount) < 10}
          >
            {isPending ? "Processing..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}
