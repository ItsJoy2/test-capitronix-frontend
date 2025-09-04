"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, User, LogOut, UserCircle, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { handleLogout } from "@/lib/logout/logout";
import { useProfileStore } from "@/lib/store/useProfileStore/useProfileStore";
import { MdOutlinePassword } from "react-icons/md";

interface NavbarProps {
  onMenuClick: () => void;
  title?: string;
}

export default function Navbar({
  onMenuClick,
  title = "Dashboard",
}: NavbarProps) {
  const profile = useProfileStore((state) => state.profile);
  const [countdown, setCountdown] = useState<string>("");
  console.log(profile?.data.next_reword_time);

  useEffect(() => {
    if (!profile?.data?.next_reword_time) return;

    const targetTime = new Date(profile.data.next_reword_time).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance <= 0) {
        setCountdown("00:00:00");
        return;
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [profile?.data?.next_reword_time]);

  return (
    <header className="glass-effect border-b border-border px-4 lg:px-6 py-4 sticky top-0 z-40 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {(profile?.data.next_reword_time !== null || undefined) && (
              <Badge className="gradient-primary text-white shadow-lg">
                {countdown}
              </Badge>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-purple-500/20 transition-colors"
            >
              <Bell className="h-4 w-4" />
            </Button>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-purple-500/20 transition-colors"
                >
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-40 rounded-xl shadow-lg"
              >
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/dashboard/my-account">
                  <DropdownMenuItem className="cursor-pointer gap-2">
                    <UserCircle className="h-4 w-4" />
                    My Account
                  </DropdownMenuItem>
                </Link>
                <Link href="/dashboard/my-account/password-reset">
                  <DropdownMenuItem className="cursor-pointer gap-2">
                    <MdOutlinePassword className="h-4 w-4" />
                    Reset Password
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer gap-2 text-red-500 focus:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
