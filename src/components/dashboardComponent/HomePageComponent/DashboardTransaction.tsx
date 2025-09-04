"use client";

import { formatDate } from "@/components/shared/DateFormate/DateFormate";
import Status from "@/components/shared/Status/Status";
import UseTable, { TData } from "@/components/shared/table/UseTable";
import { TransactionnHistory } from "@/components/types/transactionsHistory/transactionHistory";
import { Button } from "@/components/ui/button";
import {
  Card as CardComponent,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetData } from "@/lib/fetch/axiosConfig/FetchData";
import { cn } from "@/lib/utils";
import { History } from "lucide-react";
import Link from "next/link";

export default function DashboardTransaction() {
  const { data: transaction, isLoading } = useGetData<TransactionnHistory>(
    ["transaction"],
    `/transactions`
  );

  const headers = ["Date", "Remark", "Amount", "Status", "Details"];

  return (
    <CardComponent className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Transaction History</CardTitle>
          <Link href="/dashboard/transaction">
            <Button
              variant="outline"
              size="sm"
              className="border-purple-400 text-purple-400 hover:bg-purple-400/20 bg-transparent"
            >
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {(transaction?.total ?? 0) > 0 ? (
            <UseTable headers={headers} className="rounded-md">
              {transaction?.data.slice(0, 10).map((item) => (
                <tr key={item.id}>
                  <TData>{formatDate(item.created_at)}</TData>
                  <TData>
                    {item.remark === "interest"
                      ? "interest"
                      : item.remark === "referral_commission"
                      ? "Referral Commission"
                      : item.remark}
                  </TData>
                  <TData
                    className={cn(
                      "font-medium",
                      item.type === "+" ? "text-green-500" : "text-red-500"
                    )}
                  >
                    {`(${item.type})`} {item.amount} USDT
                  </TData>
                  <TData>
                    {item.status === "Completed" ? (
                      <Status title="Completed" />
                    ) : item.status === "Pending" ? (
                      <Status title="Pending" />
                    ) : item.status === "Paid" ? (
                      <Status title="Paid" />
                    ) : (
                      <Status title="Rejected" />
                    )}
                  </TData>
                  <TData>{item.details}</TData>
                </tr>
              ))}
            </UseTable>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2 text-slate-300">
                No transactions yet
              </p>
              <p>
                Activate your account to get started with trading and
                investments.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </CardComponent>
  );
}
