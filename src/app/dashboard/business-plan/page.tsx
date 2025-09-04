"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CheckCircle, Star, TrendingUp, Clock, DollarSign } from "lucide-react";
import { useGetData } from "@/lib/fetch/axiosConfig/FetchData";
import {
  TBuyPackage,
  TNode,
  TNodeResponse,
} from "@/components/types/package/packageType";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/fetch/axiosConfig/axiosConfig";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/toast/ToastSuccess";
import { AxiosError } from "axios";
import SkeletonLoading from "@/components/shared/loading/SkeltonLoading";
import Swal from "sweetalert2";

export default function BusinessPlanPage() {
  const { data: packageData, isLoading } = useGetData<TNodeResponse>(
    ["package"],
    `/package`
  );

  const { mutate, isPending } = useMutation({
    mutationFn: async (e: number) => {
      const finalData = {
        package_id: e,
      };
      const response = await axiosInstance.post<TBuyPackage>(
        `/buy-package`,
        finalData
      );
      return response.data;
    },
    onSuccess: (data: TBuyPackage) => {
      if (data.data.status === false) {
        showErrorAlert(data.data.message);
      } else {
        showSuccessAlert(data.data.message);
      }
    },
    onError: (err: AxiosError<{ message: string }>) => {
      showErrorAlert(err.response?.data.message || "Something went wrong");
    },
  });
  const [active, setActive] = useState<number>();
  const handlebuy = (e: TNode) => {
    setActive(e.id);
    Swal.fire({
      title: `Are you want to invest the <span class="text-green-500">${e.name}</span>?`,
      showDenyButton: true,
      confirmButtonText: "Confirm",
      denyButtonText: `Cancel`,
      buttonsStyling: false,
      customClass: {
        popup: "my-swal-popup",
        confirmButton:
          "bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-1 rounded-md",
        denyButton:
          "bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-1 rounded-md ml-2",
        title: "my-swal-title",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(e.id);
      }
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 p-4 lg:p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Business Plans
            </h1>
            <p className="text-slate-400">
              Choose the perfect investment plan that suits your financial goals
            </p>
          </div>

          {/* Investment Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              <>
                <SkeletonLoading count={1} height={250} />
                <SkeletonLoading count={1} height={250} />
                <SkeletonLoading count={1} height={250} />
                <SkeletonLoading count={1} height={250} />
              </>
            ) : (
              <>
                {" "}
                {packageData?.data.map((plan, index) => (
                  <Card
                    key={plan.id}
                    className={cn(
                      "border-0 shadow-xl hover:scale-[1.02] transition-all duration-300 text-white overflow-hidden relative",
                      index === 0
                        ? "bg-gradient-to-br from-[#9333EA] to-[#6D28D9]"
                        : index === 1
                        ? "bg-gradient-to-br from-[#22C55E] to-[#15803D]"
                        : index === 2
                        ? "bg-gradient-to-br from-[#EF4444] to-[#B91C1C]"
                        : index === 3
                        ? "bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8]"
                        : index === 4
                        ? "bg-gradient-to-br from-[#14B8A6] to-[#0D9488]"
                        : index === 5
                        ? "bg-gradient-to-br from-[#EC4899] to-[#BE185D]"
                        : index === 6
                        ? "bg-gradient-to-br from-[#F59E0B] to-[#D97706]"
                        : ""
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                    <CardHeader className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-xl font-bold text-white">
                          {plan.name}
                        </CardTitle>
                        <Clock className="h-5 w-5 text-white/80" />
                      </div>
                      <p className="text-white/80 text-sm">
                        Duration: {plan.duration} Days
                      </p>
                    </CardHeader>

                    <CardContent className="relative z-10 space-y-4">
                      {/* Amount Display */}
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                        <div className="text-3xl font-bold text-white mb-1">
                          ${plan.price}
                        </div>
                      </div>

                      {/* Plan Features */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-white" />
                          <div className="flex-1 flex justify-between">
                            <span className="text-white/90 text-sm">ROI</span>
                            <span className="text-white font-semibold text-sm">
                              {plan.interest_rate}%
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-white" />
                          <div className="flex-1 flex justify-between">
                            <span className="text-white/90 text-sm">
                              Earning
                            </span>
                            <span className="text-white font-semibold text-sm">
                              {plan.return_type}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-white" />
                          <div className="flex-1 flex justify-between">
                            <span className="text-white/90 text-sm">
                              Min. Withdrawal
                            </span>
                            <span className="text-white font-semibold text-sm">
                              $10
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Invest Button */}
                      <Button
                        onClick={() => handlebuy(plan)}
                        className="w-full bg-white/90 hover:bg-white text-slate-800 font-semibold py-3 shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                      >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        {isPending && active === plan.id
                          ? "Processing"
                          : "Invest Now"}
                      </Button>
                      <p className="text-xs text-white/70 text-center">
                        Activate your account to invest
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </div>

          {/* Extra Info Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-white">Daily Returns</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm">
                  Earn consistent daily returns on your investments with our
                  proven trading strategies.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-white">Premium Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm">
                  Get 24/7 premium support and dedicated account management for
                  all your investments.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-white">
                    Flexible Withdrawals
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm">
                  Withdraw your earnings anytime with low minimum withdrawal
                  limits and fast processing.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
