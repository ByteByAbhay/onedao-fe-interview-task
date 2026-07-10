"use client";

import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { dismissToast } from "@/store/toastSlice";
import type { ToastVariant } from "@/store/toastSlice";
import styles from "./toast.module.css";

const VARIANT_CLASS: Record<ToastVariant, string> = {
  success: styles.toastSuccess,
  info: styles.toastInfo,
  danger: styles.toastDanger,
};

export default function ToastHost() {
  const toasts = useAppSelector((state) => state.toast.toasts);
  const dispatch = useAppDispatch();

  return (
    <ToastContainer position="top-end" className="p-3" style={{ position: "fixed", zIndex: 2000 }}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          className={`${styles.toast} ${VARIANT_CLASS[toast.variant]}`}
          onClose={() => dispatch(dismissToast(toast.id))}
          delay={8000}
          autohide
        >
          <Toast.Header className={styles.toastHeader} closeButton>
            <strong className={`me-auto ${styles.toastTitle}`}>{toast.title}</strong>
          </Toast.Header>
          <Toast.Body className={styles.toastBody}>{toast.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
}
