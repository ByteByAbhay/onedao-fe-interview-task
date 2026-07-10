import type { Metadata } from "next";
import DashboardShell from "@/components/dashboard/DashboardShell";

export const metadata: Metadata = {
  title: "Dashboard | OneDAO Admin Panel",
  description: "Overview of orders, earnings, driver performance, and recent rides.",
};

export default function DashboardPage() {
  return <DashboardShell />;
}
