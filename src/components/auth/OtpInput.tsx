"use client";

import { useRef, type ChangeEvent, type ClipboardEvent, type KeyboardEvent } from "react";
import Form from "react-bootstrap/Form";
import styles from "./auth.module.css";

type OtpInputProps = {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export default function OtpInput({ length = 6, value, onChange, error }: OtpInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length }, (_, index) => value[index] ?? "");

  function setDigitAt(index: number, digit: string) {
    const next = digits.slice();
    next[index] = digit;
    onChange(next.join(""));
  }

  function handleChange(index: number, event: ChangeEvent<HTMLInputElement>) {
    const numeric = event.target.value.replace(/\D/g, "");
    if (!numeric) {
      setDigitAt(index, "");
      return;
    }
    setDigitAt(index, numeric.slice(-1));
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    onChange(pasted);
    inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
  }

  return (
    <div>
      <div
        className={styles.otpRow}
        role="group"
        aria-label="One-time password"
        aria-describedby={error ? "otp-error" : undefined}
      >
        {digits.map((digit, index) => (
          <Form.Control
            key={index}
            ref={(el: HTMLInputElement | null) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={1}
            value={digit}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(index, event)}
            onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, event)}
            onPaste={handlePaste}
            className={styles.otpBox}
            aria-label={`Digit ${index + 1} of ${length}`}
            aria-invalid={Boolean(error)}
          />
        ))}
      </div>
      {error && (
        <p id="otp-error" className={styles.errorText} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
