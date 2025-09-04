"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Coins, QrCode, Wallet} from "lucide-react";
import axiosInstance from "@/lib/fetch/axiosConfig/axiosConfig";
import { useMutation } from "@tanstack/react-query";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/toast/ToastSuccess";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { addFund } from "@/components/types/addFund/addFung";

export default function AddFundsPage() {
  const [selectedCurrency, setSelectedCurrency] = useState("USDT");
  const [selectedWallet, setSelectedWallet] = useState("deposit");
  const [depositAmount, setDepositAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<
    "form" | "invoice" | "completed"
  >("form");
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { wallet: string; amount: number }) => {
      const response = await axiosInstance.post<addFund>(`/deposit`, data);
      return response.data;
    },
    onSuccess: (data: addFund) => {
      if (data.data.status === false) {
        showErrorAlert(data.data.message);
      } else {
        const invoice_id = data.data.invoice_id;
        showSuccessAlert(data.data.message);
        router.push(`/dashboard/invoice?id=${invoice_id}`);
      }
    },

    onError: (err: AxiosError<{ message: string }>) => {
      showErrorAlert(err.response?.data.message || "Something went wrong");
    },
  });

  const handleGenerateInvoice = () => {
    if (!depositAmount || parseFloat(depositAmount) < 10) return;
    const finalData = {
      wallet: selectedWallet,
      amount: Number(depositAmount),
    };
    mutate(finalData);
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-6">
      {/* Add Funds form */}
      {paymentStatus === "form" && (
        <div className="bg-slate-800/95 text-white rounded-lg p-6 border border-slate-700/50 backdrop-blur-sm space-y-4">
          <div className="flex items-center gap-3 text-xl mb-4">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            Add Funds to Wallet
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="currency" className="text-slate-300 font-medium">
                Payment Currency
              </Label>
              <Select
                value={selectedCurrency}
                onValueChange={setSelectedCurrency}
              >
                <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-white mt-2 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem
                    value="USDT"
                    className="text-white hover:bg-slate-700 w-full"
                  >
                    <div className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-green-400" />
                      USDT (BEP-20)
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="wallet" className="text-slate-300 font-medium">
                Select Wallet
              </Label>
              <Select value={selectedWallet} onValueChange={setSelectedWallet}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-white mt-2 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem
                    value="deposit"
                    className="text-white hover:bg-slate-700 w-full"
                  >
                    <div className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-green-400" />
                      Deposit Wallet
                    </div>
                  </SelectItem>
                  <SelectItem
                    value="active"
                    className="text-white hover:bg-slate-700 w-full"
                  >
                    <div className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-green-400" />
                      Active Wallet
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="amount" className="text-slate-300 font-medium">
                Deposit Amount
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount in USDT"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="bg-slate-700/50 border-slate-600/50 text-white mt-2"
                min="1"
                step="0.01"
              />
              <p className="text-xs text-slate-400 mt-1">
                Minimum deposit: $10 USDT
              </p>
            </div>

            <Button
              onClick={handleGenerateInvoice}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 shadow-lg"
              disabled={!depositAmount || parseFloat(depositAmount) < 10}
            >
              <QrCode className="h-4 w-4 mr-2" />
              {isPending ? "Processing" : "Generate Payment Invoice"}
            </Button>
          </div>
        </div>
      )}

    
    </div>
  );
}
