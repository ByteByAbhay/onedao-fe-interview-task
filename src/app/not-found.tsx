import type { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page Not Found | OneDAO Admin Panel",
  description: "The page you're looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return (
    <main
      className={`d-flex flex-column align-items-center justify-content-center text-center min-vh-100 ${styles.page}`}
    >
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.subtitle}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/login" className={`btn ${styles.homeBtn}`}>
        <FontAwesomeIcon icon={faHouse} className="me-2" aria-hidden="true" />
        Back to Login
      </Link>
    </main>
  );
}
