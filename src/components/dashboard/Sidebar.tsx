"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "./Avatar";
import { navItems, type Person } from "@/data/dashboardData";
import styles from "./dashboard.module.css";

type SidebarProps = {
  user: Person & { photo?: string };
  activeId: string;
  onSelect: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
};

type IndicatorRect = {
  top: number;
  height: number;
};

export default function Sidebar({ user, activeId, onSelect, isOpen, onClose }: SidebarProps) {
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const [indicator, setIndicator] = useState<IndicatorRect | null>(null);

  useLayoutEffect(() => {
    const activeEl = itemRefs.current[activeId];
    if (activeEl) {
      setIndicator({ top: activeEl.offsetTop, height: activeEl.offsetHeight });
    }
  }, [activeId]);

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className={styles.sidebarOverlay}
          onClick={onClose}
          aria-label="Close navigation menu"
        />
      )}
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarUserCard}>
          <Avatar name={user.name} size={48} src={user.photo} ring />
          <div>
            <p className={styles.sidebarUserName}>{user.name}</p>
            <p className={styles.sidebarUserPhone}>{user.phone}</p>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Main navigation">
          <p className={styles.navLabel}>Main Menu</p>
          <div className={styles.navListWrapper}>
            {indicator && (
              <div
                className={styles.navIndicator}
                style={{ transform: `translateY(${indicator.top}px)`, height: indicator.height }}
                aria-hidden="true"
              >
                <span className={`${styles.navCurve} ${styles.navCurveTop}`} />
                <span className={`${styles.navCurve} ${styles.navCurveBottom}`} />
              </div>
            )}
            <ul className={styles.navList}>
              {navItems.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li
                    key={item.id}
                    className={styles.navListItem}
                    ref={(el) => {
                      itemRefs.current[item.id] = el;
                    }}
                  >
                    <button
                      type="button"
                      className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                      onClick={() => {
                        onSelect(item.id);
                        onClose();
                      }}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <FontAwesomeIcon icon={item.icon} className={styles.navIcon} aria-hidden="true" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
}
