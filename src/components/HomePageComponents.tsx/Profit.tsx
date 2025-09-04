import React from "react";
import { Card } from "../ui/card";
import { DollarSign, Smartphone, TrendingUp } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { Images } from "@/lib/store/image";

type Step = {
  number: number;
  title: string;
  description: string;
  icon: StaticImageData;
  gradientFrom: string;
  gradientTo: string;
};

const steps: Step[] = [
  {
    number: 1,
    title: "Create Account",
    description:
      "Sign up easily with a one-time activation fee and unlock access to all investment features.",
    icon: Images.profit1,
    gradientFrom: "blue-400",
    gradientTo: "blue-600",
  },
  {
    number: 2,
    title: "Choose Plan",
    description:
      "Select from flexible packages designed to match your budget and financial goals.",
    icon: Images.profit2,
    gradientFrom: "orange-400",
    gradientTo: "orange-600",
  },
  {
    number: 3,
    title: "Get Profit",
    description:
      "Start earning daily ROI along with referrals and generation bonuses to grow your wealth.",
    icon: Images.profit3,
    gradientFrom: "green-400",
    gradientTo: "green-600",
  },
];

const StepCard = ({ step }: { step: Step }) => (
  <Card className="bg-slate-800 border-slate-700 p-3 text-center gap-0 relative py-8">
    <div className="absolute w-8 h-8 -top-4 right-0 left-0 mx-auto bg-white rounded-full flex items-center justify-center text-black text-2xl mb-4">
      {step.number}
    </div>
    <div className="relative mb-6">
      <div className="w-24 h-24 mx-auto mb-4">
        <div
          className={`w-full h-full rounded-lg flex items-center justify-center`}
        >
          <Image src={step.icon} alt="img" width={300} height={300} />
        </div>
      </div>
    </div>
    <h3 className="text-xl font-semibold text-white">{step.title}</h3>
    <p className="text-gray-50">{step.description}</p>
  </Card>
);

export default function Profit() {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Easy Steps to Profit
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We make investing simple and transparent. From account activation to
            choosing your plan and earning daily profits, every step is designed
            for clarity, security, and consistent financial growth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
