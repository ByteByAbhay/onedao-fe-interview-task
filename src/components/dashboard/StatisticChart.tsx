"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { progressChartData } from "@/data/dashboardData";
import styles from "./dashboard.module.css";

const PERIODS = ["Jul 2021", "Aug 2021", "Sep 2021"];

export default function StatisticChart() {
  const [periodIndex, setPeriodIndex] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  // ResponsiveContainer can measure a stale width on the first paint (before
  // the flex layout settles) and never re-measure until a resize event, so
  // the chart is rendered one frame after mount once real layout is in place.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className={`${styles.panel} ${styles.statisticPanel}`}>
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>Statistic</h2>
        <div className={styles.periodNav}>
          <button
            type="button"
            onClick={() => setPeriodIndex((i) => Math.max(0, i - 1))}
            disabled={periodIndex === 0}
            aria-label="Previous period"
          >
            <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
          </button>
          <span>{PERIODS[periodIndex]}</span>
          <button
            type="button"
            onClick={() => setPeriodIndex((i) => Math.min(PERIODS.length - 1, i + 1))}
            disabled={periodIndex === PERIODS.length - 1}
            aria-label="Next period"
          >
            <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={styles.chartLegendRow}>
        <h3 className={styles.chartSubtitle}>Progress score</h3>
        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <i className={styles.legendDotBlue} aria-hidden="true" /> Average grade
          </span>
          <span className={styles.legendItem}>
            <i className={styles.legendDotGreen} aria-hidden="true" /> Exams
          </span>
        </div>
      </div>

      <div className={styles.chartWrap}>
        {isMounted && (
          <ResponsiveContainer width="100%" height="100%" debounce={1}>
            <LineChart data={progressChartData} margin={{ top: 20, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#EEF0F6" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9FA2B4", fontSize: 13 }}
                padding={{ left: 16, right: 16 }}
              />
              <YAxis hide domain={[0, 5]} />
              <Tooltip
                contentStyle={{ borderRadius: 10, border: "1px solid #EEF0F6", fontSize: 13 }}
                formatter={(value) => (typeof value === "number" ? value.toFixed(1) : value)}
              />
              <Line
                type="monotone"
                dataKey="averageGrade"
                name="Average grade"
                stroke="#4C6FFF"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 5 }}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="exams"
                name="Exams"
                stroke="#34C77B"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 5 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
