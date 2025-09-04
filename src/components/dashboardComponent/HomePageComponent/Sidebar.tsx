"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Home,
  Wallet,
  FileText,
  ShoppingCart,
  History,
  Users,
  Ticket,
  ArrowLeftRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Images } from "@/lib/store/image";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { handleLogout } from "@/lib/logout/logout";

export const sidebarItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Wallet, label: "Add Fund", href: "/dashboard/add-fund" },
  { icon: FileText, label: "Payment Log", href: "/dashboard/payment-log" },
  {
    icon: ShoppingCart,
    label: "Purchase Code",
    href: "/dashboard/purchase-code",
  },
  {
    icon: ArrowLeftRight,
    label: "P2P Transfer",
    href: "/dashboard/p2p-transfer",
  },
  { icon: FileText, label: "Business Plan", href: "/dashboard/business-plan" },
  { icon: History, label: "Invest History", href: "/dashboard/invest-history" },
  { icon: FileText, label: "Transaction", href: "/dashboard/transaction" },
  { icon: BiMoneyWithdraw, label: "Withdraw", href: "/dashboard/withdraw" },
  {
    icon: BiMoneyWithdraw,
    label: "Withdraw History",
    href: "/dashboard/withdraw-history",
  },
  { icon: Users, label: "My Referral", href: "/dashboard/my-referral" },
  { icon: Ticket, label: "My Network", href: "/dashboard/my-network" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden flex"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`!fixed inset-y-0 left-0 z-50 w-64 glass-effect transform !bg-gray-950 h-screen 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-200 ease-in-out 
          lg:translate-x-0 lg:static lg:inset-0 flex flex-col`}
      >
        {/* Header (sticky) */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-sidebar-border bg-gray-950">
          <Link href="/dashboard">
            <Image
              className="w-[150px]"
              src={Images.logo1}
              alt="img"
              width={300}
              height={300}
            />
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onClose}
          >
            ×
          </Button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Navigation */}
          <div className="p-4 space-y-2">
            {sidebarItems.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className={`w-full justify-start gap-3 transition-all duration-200 flex items-center p-3 rounded-lg ${
                  pathname === item.href
                    ? "gradient-primary text-white shadow-lg glow-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/20 hover:text-white"
                }`}
                onClick={onClose}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            <div
              className={`w-full cursor-pointer justify-start gap-3 transition-all duration-200 flex items-center p-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/20 hover:text-white`}
              onClick={handleLogout}
            >
              <FiLogOut className="h-4 w-4" />
              Logout
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
