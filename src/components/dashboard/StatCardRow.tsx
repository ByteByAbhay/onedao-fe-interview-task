"use client";

import { useEffect, useRef, useState } from "react";
import StatCard from "./StatCard";
import { statCards } from "@/data/dashboardData";
import styles from "./dashboard.module.css";

export default function StatCardRow() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    function updateFades() {
      if (!row) return;
      setCanScrollLeft(row.scrollLeft > 4);
      setCanScrollRight(row.scrollLeft + row.clientWidth < row.scrollWidth - 4);
    }

    updateFades();
    row.addEventListener("scroll", updateFades, { passive: true });
    window.addEventListener("resize", updateFades);
    return () => {
      row.removeEventListener("scroll", updateFades);
      window.removeEventListener("resize", updateFades);
    };
  }, []);

  const wrapperClassName = [
    styles.statCardWrapper,
    !canScrollLeft && styles.statCardWrapperNoLeftFade,
    !canScrollRight && styles.statCardWrapperNoRightFade,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClassName}>
      <div className={styles.statCardRow} ref={rowRef}>
        {statCards.map((card) => (
          <StatCard key={card.id} data={card} />
        ))}
      </div>
    </div>
  );
}
