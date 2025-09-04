"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IoIosCheckmark } from "react-icons/io";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Send, Wallet, Mail, DollarSign, Info } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/fetch/axiosConfig/axiosConfig";
import { AxiosError } from "axios";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/toast/ToastSuccess";
import { ClipLoader } from "react-spinners";

// Debounce hook
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function P2PTransferPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    walletType: "deposit",
    receiverEmail: "",
    amount: "",
  });

  const debouncedEmail = useDebounce(formData.receiverEmail, 500);
  const minTransferAmount = 10;
  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");
  // Email check mutation
  const { mutate: emailMutate, isPending: emailPending } = useMutation({
    mutationFn: async (data: { email: string }) => {
      const response = await axiosInstance.post<any>("/find-user", data);
      return response.data;
    },
    onSuccess: (data: any) => {
      if (data.data.status === true) {
        setEmailSuccess(data.data.data.name);
      } else {
        showErrorAlert(data.data.message);
      }
    },
    onError: (err: AxiosError<{ message: string }>) => {
      setEmailError("Email not found");
    },
  });

  useEffect(() => {
    if (debouncedEmail.includes(".com")) {
      emailMutate({ email: debouncedEmail });
    }
  }, [debouncedEmail]);

  // Transfer mutation
  const { mutate: transferMutate, isPending } = useMutation({
    mutationFn: async (data: {
      wallet: string;
      email: string;
      amount: number;
    }) => {
      const response = await axiosInstance.post<any>("/transfer", data);
      return response.data;
    },
    onSuccess: (data: any) => {
      if (data.data.status) {
        showSuccessAlert(data.data.message);
      } else {
        showErrorAlert(data.data.message);
      }
    },
    onError: (err: AxiosError<{ message: string }>) => {
      showErrorAlert(err.message || "Something went wrong");
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTransfer = () => {
    transferMutate({
      wallet: formData.walletType,
      email: formData.receiverEmail,
      amount: Number(formData.amount),
    });
  };

  const amount = Number(formData.amount) || 0;
  const total = amount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <main className="p-4 lg:p-6 space-y-6">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                      <Send className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-white">Send Money</CardTitle>
                      <CardDescription className="text-gray-400">
                        Transfer funds to another user instantly
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Wallet Selection */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="wallet"
                      className="text-white flex items-center"
                    >
                      <Wallet className="w-4 h-4 mr-2" />
                      Select Wallet
                    </Label>
                    <Select
                      value={formData.walletType}
                      onValueChange={(value) =>
                        handleInputChange("walletType", value)
                      }
                    >
                      <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white w-full">
                        <SelectValue placeholder="Choose wallet to transfer from" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 w-full">
                        <SelectItem value="deposit">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                            Deposit Wallet
                          </div>
                        </SelectItem>
                        <SelectItem value="active">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
                            Active Wallet
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Receiver Email */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-white flex items-center"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Receiver Email
                    </Label>
                    <div className="relative w-full">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter receiver's email address"
                        value={formData.receiverEmail}
                        onChange={(e) =>
                          handleInputChange("receiverEmail", e.target.value)
                        }
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                      />
                      {emailPending && (
                        <ClipLoader
                          className="absolute top-2.5 right-5"
                          color="#6769c6"
                          size={20}
                          speedMultiplier={0.6}
                        />
                      )}
                    </div>
                    {emailSuccess && (
                      <p className="text-sm text-green-500 flex items-center">
                        <IoIosCheckmark className="w-5 h-5 mr-1" />{" "}
                        {emailSuccess}
                      </p>
                    )}
                    {emailError && (
                      <p className="text-sm text-red-500 flex items-center">
                        <Info className="w-4 h-4 mr-1" /> {emailError}
                      </p>
                    )}
                  </div>

                  {/* Transfer Amount */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="amount"
                      className="text-white flex items-center"
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      Transfer Amount
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount to transfer"
                      value={formData.amount}
                      onChange={(e) =>
                        handleInputChange("amount", e.target.value)
                      }
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500"
                      min={minTransferAmount}
                      step="0.01"
                    />
                    <p className="text-sm text-gray-400 flex items-center">
                      <Info className="w-4 h-4 mr-1" />
                      Minimum transfer amount: ${minTransferAmount}
                    </p>
                  </div>

                  {/* Transfer Button */}
                  <Button
                    onClick={handleTransfer}
                    // disabled={emailError !== "" || amount < minTransferAmount}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isPending ? "Processing" : " Send Transfer"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Transfer Summary */}
            <div className="space-y-6">
              <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-white text-lg">
                    Transfer Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Transfer Amount:</span>
                    <span className="text-white font-medium">
                      ${amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Transfer Charge (0%):</span>
                    <span className="text-white font-medium">$0.00</span>
                  </div>
                  <div className="border-t border-gray-700 pt-2">
                    <div className="flex justify-between">
                      <span className="text-white font-medium">
                        Total Deduction:
                      </span>
                      <span className="text-white font-bold">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transfer Info */}
              <Card className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 backdrop-blur-xl border-purple-500/20">
                <CardContent className="p-4">
                  <h3 className="text-white font-medium mb-3 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    Transfer Information
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Minimum transfer: ${minTransferAmount}</li>
                    <li>• Transfer charge: 0% of amount</li>
                    <li>• Instant transfer processing</li>
                    <li>• Available 24/7</li>
                    <li>• Secure encrypted transactions</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
