"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboardComponent/HomePageComponent/Sidebar";
import Navbar from "@/components/dashboardComponent/HomePageComponent/Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function DashboardProvider({
  children,
  title = "Dashboard",
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <div
        className="flex-1 flex flex-col w-full max-w-[1280px] mx-auto lg:ml-64 ml-0 transition-all duration-300"
      >
        {/* Navbar */}
        <Navbar onMenuClick={() => setSidebarOpen(true)} title={title} />

        {/* Children */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
