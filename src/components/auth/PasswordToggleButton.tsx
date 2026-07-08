"use client";

import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styles from "./auth.module.css";

type PasswordToggleButtonProps = {
  visible: boolean;
  onToggle: () => void;
};

export default function PasswordToggleButton({ visible, onToggle }: PasswordToggleButtonProps) {
  return (
    <Button
      type="button"
      variant="link"
      className={styles.toggleBtn}
      onClick={onToggle}
      aria-label={visible ? "Hide password" : "Show password"}
      aria-pressed={visible}
    >
      <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} aria-hidden="true" />
    </Button>
  );
}
