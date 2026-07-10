import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import type { StatCardData } from "@/data/dashboardData";
import styles from "./dashboard.module.css";

type StatCardProps = {
  data: StatCardData;
};

const ACCENT_CLASS: Record<StatCardData["accent"], string> = {
  blue: styles.statCardBlue,
  red: styles.statCardRed,
  orange: styles.statCardOrange,
  green: styles.statCardGreen,
};

export default function StatCard({ data }: StatCardProps) {
  return (
    <button type="button" className={`${styles.statCard} ${ACCENT_CLASS[data.accent]}`}>
      <span className={styles.statCardIconWrap}>
        <FontAwesomeIcon icon={data.icon} aria-hidden="true" />
      </span>
      <span className={styles.statCardLabel}>{data.label}</span>
      <FontAwesomeIcon icon={faChevronRight} className={styles.statCardChevron} aria-hidden="true" />
    </button>
  );
}
