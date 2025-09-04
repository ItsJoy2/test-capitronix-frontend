"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Cookies from "js-cookie";
import Image from "next/image";
import { Images } from "@/lib/store/image";

export default function Header() {
  const token = Cookies.get("cpnx_t");
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <Image
              className="w-[150px]"
              src={Images.logo1}
              alt="img"
              width={300}
              height={300}
            />
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-white hover:text-cyan-400 transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-white hover:text-cyan-400 transition-colors"
            >
              About
            </a>
            <a
              href="#plans"
              className="text-white hover:text-cyan-400 transition-colors"
            >
              Plan
            </a>
            <a
              href="#blog"
              className="text-white hover:text-cyan-400 transition-colors"
            >
              Blog
            </a>
          </nav>
          {token === undefined ? (
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer">
                  Login
                </Button>
              </Link>
            </div>
          ) : (
            <Link href="/dashboard">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white cursor-pointer">
                Dashboard
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
