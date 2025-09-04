"use client";

import { formatDate } from "@/components/shared/DateFormate/DateFormate";
import SkeletonLoading from "@/components/shared/loading/SkeltonLoading";
import { UserResponse } from "@/components/types/my-referral/myReferralType";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetData } from "@/lib/fetch/axiosConfig/FetchData";
import React from "react";

export default async function MyReferralPage() {
  const { data: directRefer, isLoading } = useGetData<UserResponse>(
    ["directRefer"],
    `/direct-refer`
  );
  return (
    <>
      <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-3">
              Direct Refer
            </CardTitle>
            <Badge
              variant="outline"
              className="border-purple-400 text-purple-400 bg-purple-400/10"
            >
              {directRefer?.total} Total member
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <SkeletonLoading count={8} height={40} />
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="w-1/12 text-left py-3 px-4 text-sm font-medium text-slate-300 whitespace-nowrap">
                      SL
                    </th>
                    <th className="w-2/12 text-left py-3 px-4 text-sm font-medium text-slate-300 whitespace-nowrap">
                      Name
                    </th>
                    <th className="w-3/12 text-left py-3 px-4 text-sm font-medium text-slate-300 whitespace-nowrap">
                      Email
                    </th>
                    <th className="w-2/12 text-left py-3 px-4 text-sm font-medium text-slate-300 whitespace-nowrap">
                      Join-Date
                    </th>
                    <th className="w-2/12 text-left py-3 px-4 text-sm font-medium text-slate-300 whitespace-nowrap">
                      Status
                    </th>
                    <th className="w-2/12 text-left py-3 px-4 text-sm font-medium text-slate-300 whitespace-nowrap">
                      Investment
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {directRefer?.data.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors"
                    >
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="text-sm text-slate-400 font-mono">
                          {index + 1}
                        </span>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <code className="bg-slate-700/50 px-2 py-1 rounded text-sm text-purple-400 font-mono">
                            {item.name}
                          </code>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="text-sm text-slate-300">
                          {item.email}
                        </span>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="text-sm text-slate-300">
                          {formatDate(item.created_at)}
                        </span>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <Badge
                          variant={
                            item.is_active === "0" ? "default" : "secondary"
                          }
                          className={
                            item.is_active !== "0"
                              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0"
                              : "bg-red-500/20 text-yellow-400 border-red-500/30"
                          }
                        >
                          {item.is_active !== "0" ? "Active" : "InActive"}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="text-sm text-slate-300">
                          {item.investment}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>{" "}
    </>
  );
}
