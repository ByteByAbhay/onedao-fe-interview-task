import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Avatar from "./Avatar";
import { topDrivers } from "@/data/dashboardData";
import styles from "./dashboard.module.css";

export default function TopDrivers() {
  return (
    <section className={`${styles.panel} ${styles.topDriversPanel}`}>
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>Top Drivers</h2>
        <button type="button" className={styles.viewMoreBtn} aria-label="View all drivers">
          <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
        </button>
      </div>
      <ul className={styles.driverList}>
        {topDrivers.map((driver) => (
          <li key={driver.id} className={styles.driverRow}>
            <Avatar name={driver.name} size={48} src={driver.photo} shape="square" />
            <div className={styles.driverInfo}>
              <p className={styles.driverName}>{driver.name}</p>
              <p className={styles.driverPhone}>{driver.phone}</p>
            </div>
            <div className={styles.driverStats}>
              <p className={styles.driverOrders}>
                Orders: <strong>{driver.orders}</strong>
              </p>
              <p className={styles.driverIncome}>
                Income: <strong>${driver.income}</strong>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
