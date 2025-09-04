"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import Link from "next/link";
import { useGetData } from "@/lib/fetch/axiosConfig/FetchData";
import { TNode, TNodeResponse } from "../types/package/packageType";

const PlanCard = ({ plan, index }: { plan: TNode; index: number }) => {
  const token = Cookies.get("cpnx_t");
  return (
    <Card
      className={cn(
        "relative overflow-hidden text-white rounded-2xl !py-6 border-0",
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
      <CardHeader className="pb-4 p-3">
        <CardTitle className="text-xl font-semibold">{plan.name}</CardTitle>
        <p className=" text-sm">Duration: {plan.duration} Days</p>
      </CardHeader>
      <CardContent className="space-y-6 p-0">
        <div className="relative">
          <div
            className={cn(
              "bg-gray-400 rounded-r-full py-3 pl-3 w-2/3",
              index === 0
                ? "bg-[#5b0ea5]"
                : index === 1
                ? "bg-[#0f6a36]"
                : index === 2
                ? "bg-[#991b1b]"
                : index === 3
                ? "bg-[#1e40af]"
                : index === 4
                ? "bg-[#0f766e]"
                : index === 5
                ? "bg-[#9d174d]"
                : index === 6
                ? "bg-[#b45309]"
                : ""
            )}
          >
            <span className="text-2xl font-bold">${plan.price}</span>
          </div>
        </div>
        <div className="space-y-3 px-3">
          {[
            { label: "ROI", value: plan.interest_rate },
            { label: "Earning", value: plan.return_type },
            { label: "Min. Withdrawal", value: 10 },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
                <span>{item.label}</span>
              </div>
              <span className="font-semibold">
                {item.label === "Earning" || item.label === "ROI" ? "" : "$"}
                {item.value}
                {item.label === "ROI" && "%"} {item.label === "ROI" && "Daily"}
              </span>
            </div>
          ))}
        </div>
        <div className="p-3">
          <Link href={token ? "/dashboard/business-plan" : "/sign-up"}>
            <Button
              className={`w-full font-semibold rounded-full cursor-pointer bg-white text-red-600 hover:text-red-900 hover:bg-white`}
            >
              Invest Now
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Plans() {
  const { data: packageData, isLoading } = useGetData<TNodeResponse>(
    ["package"],
    `/package`
  );
  return (
    <section id="plans" className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Our Investment Plan
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Introducing our Investment Plan: a strategic approach designed to
            help you grow your wealth. With tailored options and expert
            guidance, we ensure your investments align with your financial
            goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 max-w-7xl mx-auto">
          {packageData?.data.slice(0, 4).map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {packageData?.data.slice(4).map((plan, i) => (
            <PlanCard key={plan.name} plan={plan} index={i + 4} />
          ))}
        </div>
      </div>
    </section>
  );
}
