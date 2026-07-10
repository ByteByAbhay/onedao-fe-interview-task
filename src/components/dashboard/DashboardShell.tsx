"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import StatCardRow from "./StatCardRow";
import StatisticChart from "./StatisticChart";
import TopDrivers from "./TopDrivers";
import OrdersTable from "./OrdersTable";
import { currentUser } from "@/data/dashboardData";
import { useAppSelector } from "@/store/hooks";
import styles from "./dashboard.module.css";

export default function DashboardShell() {
  const router = useRouter();
  const hasHydrated = useAppSelector((state) => state.auth.hasHydrated);
  const session = useAppSelector((state) => state.auth.currentUser);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (hasHydrated && !session) {
      router.replace("/login");
    }
  }, [hasHydrated, session, router]);

  if (!hasHydrated || !session) {
    return null;
  }

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <Sidebar
          user={currentUser}
          activeId={activeNav}
          onSelect={setActiveNav}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className={styles.main}>
          <DashboardHeader
            userName={currentUser.name}
            onMenuClick={() => setSidebarOpen((open) => !open)}
          />

          <div className={styles.content}>
            <div className={styles.contentGrid}>
              <div className={styles.leftColumn}>
                <h2 className={styles.sectionTitle}>Knowledge base</h2>
                <StatCardRow />
                <StatisticChart />
              </div>

              <div className={styles.rightColumn}>
                <TopDrivers />
              </div>
            </div>

            <OrdersTable />
          </div>
        </div>
      </div>
    </div>
  );
}
