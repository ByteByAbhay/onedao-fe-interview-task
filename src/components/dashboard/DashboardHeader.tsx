"use client";

import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/authSlice";
import { showToast } from "@/store/toastSlice";
import styles from "./dashboard.module.css";

type DashboardHeaderProps = {
  userName: string;
  onMenuClick: () => void;
};

export default function DashboardHeader({ userName, onMenuClick }: DashboardHeaderProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(logout());
    dispatch(
      showToast({
        title: "Logged out",
        message: "You've been signed out.",
        variant: "info",
      }),
    );
    router.push("/login");
  }

  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button
            type="button"
            className={styles.menuBtn}
            onClick={onMenuClick}
            aria-label="Toggle navigation menu"
          >
            <FontAwesomeIcon icon={faBars} aria-hidden="true" />
          </button>
          <div className={styles.headerGreeting}>
            <p className={styles.greeting}>
              Good morning, <em className={styles.greetingName}>{userName}</em>
              <span aria-hidden="true"> 👋</span>
            </p>
            <p className={styles.messageNote}>
              you have{" "}
              <a href="#" className={styles.messageLink}>
                1 new message
              </a>
            </p>
          </div>
        </div>
        <button
          type="button"
          className={styles.logoutBtn}
          aria-label="Log out"
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faRightFromBracket} aria-hidden="true" />
        </button>
      </header>
      <div className={styles.devider}></div>
    </div>
  );
}
