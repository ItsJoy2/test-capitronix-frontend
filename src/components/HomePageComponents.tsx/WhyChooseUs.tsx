"use client";

import React from "react";
import Image from "next/image";
import { Images } from "@/lib/store/image";
import { Card } from "../ui/card";

const WhyChooseUs = () => {
  const featuresLeft = [
    {
      title: "Secure Platform",
      description:
        "All investments are protected with advanced security systems, ensuring safe and reliable transactions at every step.",
      icon: Images.why1,
      bgColor: "bg-blue-500/20",
    },
    {
      title: "Trusted Expertise",
      description:
        "Our team of skilled Force traders and advanced automated strategies deliver consistent and sustainable results.",
      icon: Images.why3,
      bgColor: "bg-orange-500/20",
    },
  ];

  const featuresRight = [
    {
      title: "Daily Earnings",
      description:
        "Enjoy guaranteed daily RDI on your investment packages, making your capital work for you every day.",
      icon: Images.why2,
      bgColor: "bg-green-500/20",
    },
    {
      title: "Multiple Income",
      description:
        "From direct referrals to generation bonuses and rank rewards, you can earn in more than one way.",
      icon: Images.why4,
      bgColor: "bg-purple-500/20",
    },
  ];
  const feature_button = [
    {
      title: "Global Opportunity",
      description:
        "Capfromix is built for worldwide investors, creating a network where everyone can grow and succeed together.",
      icon: Images.why5,
      bgColor: "bg-blue-500/20",
    },
    {
      title: "24/7 Support",
      description:
        "Our dedicated support team is always available to guide and assist you whenever you need help.",
      icon: Images.why6,
      bgColor: "bg-cyan-500/20",
    },
  ];

  const CardDesign = ({ feature, index }: any) => {
    return (
      <Card key={index} className="bg-[#042752] border-0 p-3 h-full">
        <div className="flex flex-col items-start space-x-4">
          <div
            className={`w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0`}
          >
            <Image src={feature.icon} alt="img" width={300} height={300} />
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-semibold text-white ">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </div>
        </div>
      </Card>
    );
  };
  return (
    <section className="py-20 bg-[#001E42] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">Why Choose Us</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Introducing our Investment Plan, a strategic approach designed to
            help you grow your wealth. With tailored options and expert
            guidance, we ensure your investments align with your financial
            goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            {featuresLeft.map((feature, index) => (
              <CardDesign key={index} feature={feature} index={index} />
            ))}
          </div>
          <div className="flex justify-center">
            <Image
              src={Images.center}
              alt="Secure Investment"
              width={400}
              height={400}
              className="w-full max-w-sm h-auto"
            />
          </div>
          <div className="space-y-8">
            {featuresRight.map((feature, index) => (
              <CardDesign key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 items-center mt-5">
          {feature_button.map((feature, index) => (
            <CardDesign key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
