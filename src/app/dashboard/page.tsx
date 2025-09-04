"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BsCurrencyDollar } from "react-icons/bs";

import {
  Card as CardComponent,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Wallet,
  TrendingUp,
  Users,
  DollarSign,
  CheckCircle,
  Zap,
} from "lucide-react";
import { ChartTooltip } from "@/components/ui/chart";
import { XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts";
import DashboardTransaction from "@/components/dashboardComponent/HomePageComponent/DashboardTransaction";
import UserRank from "@/components/dashboardComponent/HomePageComponent/UserRank";
import { TextField } from "@/components/form/fields/TextField";
import { GenericForm, GenericFormRef } from "@/components/form/GenericForm";
import { activationSchema } from "@/schema/dashboardSchema/dashboardSchema";
import { z } from "zod";
import { SubmitButton } from "@/components/form/fields/SubmitButton";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/fetch/axiosConfig/axiosConfig";
import { AxiosError } from "axios";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/toast/ToastSuccess";
import { useGetData } from "@/lib/fetch/axiosConfig/FetchData";
import { UserProfileResponse } from "@/components/types/profile/profile";
import LoadingContainer from "@/components/shared/loading/LoadingComponents";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
import { CopyToClipboard } from "@/lib/copyClipboard/copyClipboard";
import { useProfileStore } from "@/lib/store/useProfileStore/useProfileStore";
import ForexLiveChart from "@/components/dashboardComponent/HomePageComponent/DashboardCahrt";

type active = {
  data: {
    status: boolean;
    message: string;
  };
};

// Mock data for the dashboard
const cryptoMarketData = [
  { month: "Jan", bitcoin: 42000, ethereum: 2800, price: 44800 },
  { month: "Feb", bitcoin: 45000, ethereum: 3100, price: 48100 },
  { month: "Mar", bitcoin: 47500, ethereum: 3300, price: 50800 },
  { month: "Apr", bitcoin: 52000, ethereum: 3600, price: 55600 },
  { month: "May", bitcoin: 48000, ethereum: 3200, price: 51200 },
  { month: "Jun", bitcoin: 55000, ethereum: 3800, price: 58800 },
  { month: "Jul", bitcoin: 58000, ethereum: 4100, price: 62100 },
  { month: "Aug", bitcoin: 61000, ethereum: 4300, price: 65300 },
];

type FormType = z.infer<typeof activationSchema>;
const initialValues: FormType = {
  code: "",
};

export default function Dashboard() {
  const {
    data: profile,
    refetch,
    isLoading,
  } = useGetData<UserProfileResponse>(["profile"], `/profile`);
  const setProfile = useProfileStore((state) => state.setProfile);
  useEffect(() => {
    if (profile) {
      setProfile(profile);
    }
  }, [profile, setProfile]);

  const formRef = useRef<GenericFormRef<FormType>>(null);
  const [isActivated, setIsActivated] = useState(false);
  const [activationModalOpen, setActivationModalOpen] = useState(false);
  const router = useRouter();
  const handleActivateAccount = () => {
    setActivationModalOpen(true);
  };
  const { copy, copied } = CopyToClipboard();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormType | React.FormEvent<HTMLFormElement>) => {
      const response = await axiosInstance.post<active>(
        `/active-account`,
        data
      );
      return response.data;
    },
    onSuccess: (data: active) => {
      if (data.data.status === false) {
        showErrorAlert(data.data.message);
      } else {
        showSuccessAlert(data.data.message);
        setIsActivated(false);
        refetch();
      }
    },

    onError: (err: AxiosError<{ message: string }>) => {
      showErrorAlert(err.response?.data.message || "Something went wrong");
    },
  });
  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    mutate(data);
  };

  if (isLoading) {
    return <LoadingContainer />;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Activation Modal */}
      <Dialog open={activationModalOpen} onOpenChange={setActivationModalOpen}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-sm border border-slate-700/50 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              Activate Your Account
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="text-center">
              <p className="text-slate-300 mb-4">
                Enter your activation code to unlock all premium features and
                start trading.
              </p>

              <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg p-4 border border-purple-500/30 mb-6">
                <div className="flex items-center gap-3 justify-center mb-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-slate-300">
                    Unlimited transactions
                  </span>
                </div>
                <div className="flex items-center gap-3 justify-center mb-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-slate-300">
                    Premium support & analytics
                  </span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-slate-300">
                    Advanced trading tools
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="activation-code"
                  className="text-slate-300 font-medium"
                >
                  Activation Code
                </Label>
                <GenericForm
                  schema={activationSchema}
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  ref={formRef}
                >
                  <TextField
                    name="code"
                    type="text"
                    placeholder="Enter your activation code"
                    inputClass="bg-slate-700/50 border-slate-600/50 text-white mt-2 font-mono text-center text-lg tracking-wider"
                    labelClass=""
                  />
                  <p className="text-xs text-slate-400 mt-2 text-center">
                    Don't have a code?{" "}
                    <button
                      onClick={() => {
                        setActivationModalOpen(false);
                        router.push("/purchase-code");
                      }}
                      className="text-purple-400 hover:text-purple-300 underline"
                    >
                      Purchase activation codes here
                    </button>
                  </p>{" "}
                  <div className="flex gap-3 mt-3">
                    <Button
                      variant="outline"
                      onClick={() => setActivationModalOpen(false)}
                      className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700/50"
                    >
                      Cancel
                    </Button>
                    <SubmitButton
                      className="flex-1 custom-button"
                      width="full"
                      label="Submit"
                      isLoading={isPending}
                      loadingLabel="Processing.."
                    />
                  </div>{" "}
                </GenericForm>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Main Content */}
      <div className="w-full">
        {/* Dashboard Content */}
        <main className="flex-1 p-4 lg:p-6 space-y-6">
          {profile?.data.user.is_active === "0" && (
            <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1">
                    Activate Your Account
                  </h3>
                  <p className="text-xs text-slate-400">
                    Unlock all premium features and start trading
                  </p>
                </div>
                <Button
                  onClick={handleActivateAccount}
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg"
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Activate
                </Button>
              </div>
            </div>
          )}

          {/* Wallet Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: "Deposit Wallet",
                value: profile?.data.deposit_wallet,
                icon: <Wallet className="h-4 w-4 text-white" />,
                gradient: "bg-gradient-to-r from-emerald-500 to-teal-500",
                isMoney: true,
              },
              {
                title: "Active Wallet",
                value: profile?.data.active_wallet,
                icon: <TrendingUp className="h-4 w-4 text-white" />,
                gradient: "bg-gradient-to-r from-blue-500 to-purple-500",
                isMoney: true,
              },
              {
                title: "Profit Wallet",
                value: profile?.data.profit_wallet,
                icon: <DollarSign className="h-4 w-4 text-white" />,
                gradient: "bg-gradient-to-r from-yellow-500 to-orange-500",
                isMoney: true,
              },
              {
                title: "Referral Members",
                value: profile?.data.totalTeam,
                icon: <Users className="h-4 w-4 text-white" />,
                gradient: "bg-gradient-to-r from-pink-500 to-purple-500",
                footerText: "new this month",
                footerValue: 2,
              },
              {
                title: "Total Earnings",
                value: profile?.data.totalEarning,
                icon: <BsCurrencyDollar className="h-4 w-4 text-white" />,
                gradient: "bg-gradient-to-r from-green-500 to-green-900",
                footerText: "new this month",
                footerValue: 2,
                isMoney: true,
              },
            ].map((item, index) => (
              <CardComponent
                key={index}
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-[1.02] shadow-xl"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">
                    {item.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg shadow-lg ${item.gradient}`}>
                    {item.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-1">
                    {item.isMoney
                      ? `$${Number(item.value).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`
                      : item.value}
                  </div>
                </CardContent>
              </CardComponent>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Chart - Full Width */}
            <ForexLiveChart />
            {/* <CardComponent className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">
                    Crypto Market Overview
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full"></div>
                      <span className="text-sm text-slate-300">Bitcoin</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                      <span className="text-sm text-slate-300">Ethereum</span>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-purple-400 text-purple-400 bg-purple-400/10"
                    >
                      This Year
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-slate-400">
                  Cryptocurrency Market Trends and Performance
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={cryptoMarketData}>
                      <defs>
                        <linearGradient
                          id="bitcoinGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#f59e0b"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#f59e0b"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="ethereumGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8b5cf6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <ChartTooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700 rounded-lg p-3 shadow-xl">
                                <p className="text-slate-300 font-medium mb-2">
                                  {label}
                                </p>
                                {payload.map((entry, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2 text-sm"
                                  >
                                    <div
                                      className="w-3 h-3 rounded-full"
                                      style={{ backgroundColor: entry.color }}
                                    />
                                    <span className="text-slate-300">
                                      {entry.dataKey === "bitcoin"
                                        ? "Bitcoin"
                                        : "Ethereum"}
                                      :
                                    </span>
                                    <span className="text-white font-semibold">
                                      ${entry.value?.toLocaleString()}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="bitcoin"
                        stroke="#f59e0b"
                        fillOpacity={1}
                        fill="url(#bitcoinGradient)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="ethereum"
                        stroke="#8b5cf6"
                        fillOpacity={1}
                        fill="url(#ethereumGradient)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </CardComponent> */}

            {/* Transaction History - Full Width Table */}
            <DashboardTransaction />

            {/* Right Sidebar Content - Now Below */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Referral Link */}
              <CardComponent className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">
                    Your Referral Link
                  </CardTitle>
                  <p className="text-sm text-slate-400">
                    Automatically top up your account balance by sharing your
                    referral link. Earn a percentage of whatever plan your
                    referred user buys.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      value={`https://www.capitronix.com/sign-up?ref=${profile?.data.user.refer_code}`}
                      readOnly
                      className="bg-slate-700/50 border-slate-600/50 text-white"
                      disabled={!isActivated}
                    />
                    <div className="custom-button px-4 rounded flex items-center justify-center py-1">
                      {copied ? (
                        <IoCheckmarkDoneOutline className="size-6" />
                      ) : (
                        <MdContentCopy
                          className="size-6 cursor-pointer hover:text-green-600"
                          onClick={() =>
                            copy(
                              `https://www.capitronix.com/sign-up?ref=${profile?.data.user.refer_code}`
                            )
                          }
                        />
                      )}
                    </div>
                  </div>
                </CardContent>
              </CardComponent>

              {/* User Rank */}
              <UserRank profile={profile?.data.user} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
