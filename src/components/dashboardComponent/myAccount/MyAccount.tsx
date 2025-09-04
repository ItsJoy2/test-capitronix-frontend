"use client";

import { useGetData } from "@/lib/fetch/axiosConfig/FetchData";
import { UserProfileResponse } from "@/components/types/profile/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Users, Coins } from "lucide-react";
import { cn } from "@/lib/utils";
import { MdContentCopy } from "react-icons/md";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { CopyToClipboard } from "@/lib/copyClipboard/copyClipboard";
import Link from "next/link";

export default function MyAccount() {
  const { copy, copied } = CopyToClipboard();

  const { data: profile } = useGetData<UserProfileResponse>(
    ["profile"],
    `/profile`
  );
  const p = profile?.data;

  if (!p) {
    return <p className="text-center text-muted-foreground">Loading...</p>;
  }

  const user = p.user;

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Profile Card */}
      <Card className="border border-slate-800 shadow-lg bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.image ?? ""} alt={user.name} />
            <AvatarFallback className="bg-gradient-to-tr from-indigo-500 to-purple-500 text-white">
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl font-bold">{user.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  "size-3 rounded-full",
                  user.is_active !== "1" ? " bg-yellow-500" : "bg-green-500"
                )}
              />
              <Badge
                variant={user.is_active === "1" ? "default" : "secondary"}
                className="mt-1"
              >
                {user.is_active === "1" ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
          <Link href="/dashboard/my-account/edit">
            {" "}
            <button className="bg-blue-500 text-white font-semibold px-8 py-2 rounded-md cursor-pointer">
              Edit
            </button>
          </Link>{" "}
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="p-3 rounded-lg bg-slate-900/50 text-center">
            <p className="text-xs text-muted-foreground">Deposit Wallet</p>
            <p className="font-bold">
              $
              {Number(p.deposit_wallet).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/50 text-center">
            <p className="text-xs text-muted-foreground">Profit Wallet</p>
            <p className="font-bold">
              $
              {Number(p.profit_wallet).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/50 text-center">
            <p className="text-xs text-muted-foreground">Active Wallet</p>
            <p className="font-bold">
              $
              {Number(p.active_wallet).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/50 text-center">
            <p className="text-xs text-muted-foreground">Reward</p>
            <p className="font-bold">{p.reward}</p>
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-slate-900 border border-slate-800 rounded-2xl shadow-md text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Team Invest</CardTitle>
            <Users className="h-4 w-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${p.teamInvest}</p>
            <p className="text-xs text-muted-foreground">
              Total team investment
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border border-slate-800 rounded-2xl shadow-md text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Direct Refer</CardTitle>
            <Users className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{p.directRefer}</p>
            <p className="text-xs text-muted-foreground">
              Directly referred users
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border border-slate-800 rounded-2xl shadow-md text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Total Earnings</CardTitle>
            <Coins className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${p.totalEarning}</p>
            <p className="text-xs text-muted-foreground">From all sources</p>
          </CardContent>
        </Card>
      </div>

      <Separator className="bg-slate-800" />

      {/* More Details */}
      <Card className="bg-slate-900 border border-slate-800 rounded-2xl shadow-md text-white">
        <CardHeader>
          <CardTitle className="text-lg">Account Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Mobile</p>
            <p className="font-medium">{user.mobile}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Referral Code</p>
            <p className="font-medium flex items-center gap-3">
              https://www.capitronix.com/sign-up?ref={user.refer_code}{" "}
              {copied ? (
                <IoCheckmarkDoneOutline className="size-6" />
              ) : (
                <MdContentCopy
                  className="size-6 cursor-pointer"
                  onClick={() =>
                    copy(
                      `https://www.capitronix.com/sign-up?ref=${user.refer_code}`
                    )
                  }
                />
              )}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Created At</p>
            <p className="font-medium">
              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">KYC Status</p>
            <Badge variant="outline" className="px-0">
              {user.kyc_status === "1" ? "Verified" : "Not Verified"}
            </Badge>
          </div>
          <div>
            <p className="text-muted-foreground">Address</p>
            <Badge variant="outline" className="px-0">
              {user.address}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
