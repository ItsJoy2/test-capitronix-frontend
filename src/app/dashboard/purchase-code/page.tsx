"use client";

import { formatDate } from "@/components/shared/DateFormate/DateFormate";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/toast/ToastSuccess";
import { CodesResponse } from "@/components/types/purchaseCode/pruchaseCode ";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/lib/fetch/axiosConfig/axiosConfig";
import { useGetData } from "@/lib/fetch/axiosConfig/FetchData";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Calendar, CheckCircle, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";

type purchase = {
  data: {
    status?: boolean;
    message?: string;
    codes?: string[];
  };
};

export default function PurchaseCode() {
  const [codeQuantity, setCodeQuantity] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const codePrice = 25;
  const totalCost = codeQuantity * codePrice;

  const { data: codeHistory, refetch } = useGetData<CodesResponse>(
    ["codeHistory"],
    `/codeHistory`
  );

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post<purchase>(`/buy-code`, {
        quantity: codeQuantity,
      });
      return response.data;
    },
    onSuccess: (data: purchase) => {
      if (data.data.status === false) {
        showErrorAlert(data.data.message);
      } else {
        showSuccessAlert(data.data.message);
        refetch();
      }
    },
    onError: (err: AxiosError<{ message: string }>) => {
      showErrorAlert(err.response?.data.message || "Something went wrong");
    },
  });

  const handlePurchase = () => {
    mutate();
  };

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      showSuccessAlert("Code copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000); // 2s por abar reset
    } catch {
      showErrorAlert("Failed to copy code!");
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          {/* ---- Purchase Card ---- */}
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
                Purchase Activation Codes
              </CardTitle>
              <p className="text-slate-400">
                Purchase activation codes to unlock premium features. Each code
                costs ${codePrice} and is valid for 6 months.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="quantity"
                      className="text-slate-300 font-medium"
                    >
                      Number of Codes
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      max="10"
                      defaultValue={codeQuantity}
                      onChange={(e) =>
                        setCodeQuantity(
                          Math.max(1, Number.parseInt(e.target.value) || 1)
                        )
                      }
                      className="bg-slate-700/50 border-slate-600/50 text-white mt-2"
                    />
                    <p className="text-xs text-slate-400 mt-1">
                      Minimum: 1 code, Maximum: 10 codes per purchase
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg p-4 border border-purple-500/30">
                    <h3 className="text-white font-semibold mb-3">
                      Purchase Summary
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">Quantity:</span>
                        <span className="text-white font-medium">
                          {codeQuantity} code(s)
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">Price per code:</span>
                        <span className="text-white font-medium">
                          ${codePrice}
                        </span>
                      </div>
                      <div className="border-t border-purple-500/30 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="text-white font-semibold">
                            Total Amount:
                          </span>
                          <span className="text-2xl font-bold text-purple-400">
                            ${totalCost}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handlePurchase}
                    className="custom-button w-full"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {!isPending
                      ? `Purchase ${codeQuantity} Code${
                          codeQuantity > 1 ? "s" : ""
                        } - ${totalCost}`
                      : "Processing"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ---- Purchased Codes Table ---- */}
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  Your Purchased Codes
                </CardTitle>
                <Badge
                  variant="outline"
                  className="border-purple-400 text-purple-400 bg-purple-400/10"
                >
                  {codeHistory?.codes.length} Total Codes
                </Badge>
              </div>
              <p className="text-slate-400">
                Manage and view all your purchased activation codes
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">
                        SL
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">
                        Random Code
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">
                        Purchase Date
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">
                        Validity
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-300">
                        Status
                      </th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-slate-300">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {codeHistory?.codes.map((code, index) => (
                      <tr
                        key={code.id}
                        className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <span className="text-sm text-slate-400 font-mono">
                            {index + 1}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <code className="bg-slate-700/50 px-2 py-1 rounded text-sm text-purple-400 font-mono">
                              {code.code}
                            </code>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <span className="text-sm text-slate-300">
                              {formatDate(code.created_at)}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-slate-300">
                            {code.user_name === null
                              ? "Unused"
                              : code.user_name}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <Badge
                            variant={
                              code.status === "active" ? "default" : "secondary"
                            }
                            className={
                              code.status === "active"
                                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0"
                                : "bg-red-500/20 text-red-400 border-red-500/30"
                            }
                          >
                            {code.status === "active" ? "Active" : "Expired"}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div
                            className="hover:bg-purple-500/20 cursor-pointer text-purple-400 w-fit mx-auto"
                            onClick={() =>
                              handleCopy(code.code, String(code.id))
                            }
                          >
                            {copiedId === String(code.id) ? (
                              <IoCheckmarkDoneOutline className="size-6" />
                            ) : (
                              <MdContentCopy className="size-6" />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
