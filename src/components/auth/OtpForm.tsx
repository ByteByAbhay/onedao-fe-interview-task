"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";
import AuthShell from "./AuthShell";
import OtpInput from "./OtpInput";
import styles from "./auth.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { verifyOtp } from "@/store/authSlice";
import { showToast } from "@/store/toastSlice";

const OTP_LENGTH = 6;

export default function OtpForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pendingOtp = useAppSelector((state) => state.auth.pendingOtp);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (code.length < OTP_LENGTH) {
      setError(`Enter all ${OTP_LENGTH} digits.`);
      return;
    }

    setError(undefined);
    setIsSubmitting(true);
    try {
      // TODO: replace with a real OTP verification call once the API is available.
      await new Promise((resolve) => setTimeout(resolve, 600));
      if (!pendingOtp || code !== pendingOtp) {
        setError("Incorrect OTP. Please try again.");
        return;
      }
      dispatch(verifyOtp());
      dispatch(
        showToast({
          title: "Email verified",
          message: "Your account is verified. Please log in to continue.",
          variant: "success",
        }),
      );
      router.push("/login");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell title="Verify your email" subtitle="Enter the OTP from your register email id">
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-2">
          <OtpInput value={code} onChange={setCode} error={error} />
        </div>

        <Button type="submit" className={`w-100 ${styles.submitBtn}`} disabled={isSubmitting}>
          {isSubmitting ? "Verifying…" : "Proceed"}
        </Button>
      </form>
    </AuthShell>
  );
}
