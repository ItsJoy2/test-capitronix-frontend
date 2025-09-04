import DashboardProvider from "@/components/provider/DashboardProvider";
import "./globals.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardProvider>{children}</DashboardProvider>;
}
