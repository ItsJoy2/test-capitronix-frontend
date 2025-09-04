"use client";

import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { DollarSign } from "lucide-react";
import { Images } from "@/lib/store/image";
import Cookies from "js-cookie";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { cn } from "@/lib/utils";

const heroData = [
  {
    title1: "Smart Investing, ",
    title2: "Smarter Growth",
    top_title: "Start your journey toward financial freedom",
    sub_title:
      "Join Capitronix and unlock high-return Forex investment opportunities with trusted traders, automated strategies, and a transparent reward system.",
    image: Images.hero3,
  },
  {
    title1: "Intelligent Trading,",
    title2: "Maximum Returns",
    top_title: "Invest now, reap rewards later",
    sub_title:
      "Discover the power of Forex with Capitronix — trusted experts, automated strategies, and a secure, transparent investment platform.",
    image: Images.hero2,
  },
  {
    title1: "Trade Smart,",
    title2: "Earn Confidently",
    top_title: "Your Path to Financial Growth",
    sub_title:
      "Capitronix empowers you to steadily grow your wealth with top-tier traders, innovative tools, and a reliable rewards system.",
    image: Images.hero1,
  },
];

export default function Hero() {
  const token = Cookies.get("cpnx_t");
  return (
    <section className="relative bg-[#001E42] text-white">
      <div className="container mx-auto">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="lg:grid lg:grid-cols-2 gap-12 items-center"
        >
          {heroData.map((hero, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col lg:flex-row items-center justify-between pb-5">
                {/* Text Content */}
                <div className="flex-1 md:py-20 py-5 space-y-6 lg:space-y-8 px-3">
                  <Badge className="bg-purple-600 text-white border-purple-500 px-4 py-2 text-sm font-medium inline-flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <DollarSign className="h-3 w-3 text-white" />
                    </div>
                    {hero.top_title}
                  </Badge>
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                    {hero.title1} <br /> {hero.title2}
                  </h1>
                  <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
                    {hero.sub_title}
                  </p>
                  <Link href={token ? "/dashboard" : "/sign-up"}>
                    <Button
                      size="lg"
                      className="text-lg px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                    >
                      {token ? "Get Start" : "Register"}
                    </Button>
                  </Link>
                </div>

                <div className="flex-1 md:py-20 py-5 flex justify-end relative bg-[#001E42] px-3">
                  {/* Gradient circle */}
                  <div
                    className="absolute right-0 md:bottom-64 bottom-24  left-0 mx-auto size-1 rounded-full"
                    style={{
                      boxShadow: "0 0 200px 100px rgba(105, 149, 214, 1)",
                    }}
                  />

                  <div className="w-fit flex justify-center items-center z-10 ">
                    <Image
                      src={hero.image}
                      alt="img"
                      width={600}
                      height={400}
                      className={cn(
                        "md:w-[600px] w-[350px] md:h-[400px] h-[250px] rounded-xl object-center bg-no-repeat",
                        index === 2 && "w-[300px]"
                      )}
                      priority
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
