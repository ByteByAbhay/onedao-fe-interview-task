"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import AuthShell from "./AuthShell";
import FormField from "./FormField";
import PasswordToggleButton from "./PasswordToggleButton";
import styles from "./auth.module.css";

type FieldErrors = {
  email?: string;
  password?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!email.trim()) {
      next.email = "Email id is required.";
    } else if (!EMAIL_PATTERN.test(email)) {
      next.email = "Enter a valid email address.";
    }
    if (!password) {
      next.password = "Password is required.";
    }
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      // TODO: replace with real authentication call once the API is available.
      await new Promise((resolve) => setTimeout(resolve, 600));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Log In to Admin Panel"
      subtitle="Enter your email id and password below"
      footer={
        <p className={styles.footerText}>
          Don&apos;t have an account?
          <Link href="/register" className={styles.footerLink}>
            Register
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <FormField
          id="email"
          label="Email Id"
          type="email"
          icon={faEnvelope}
          placeholder="Enter your email id"
          value={email}
          onChange={setEmail}
          error={errors.email}
          autoComplete="email"
        />

        <FormField
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          icon={faLock}
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
          error={errors.password}
          autoComplete="current-password"
          endAdornment={
            <PasswordToggleButton
              visible={showPassword}
              onToggle={() => setShowPassword((current) => !current)}
            />
          }
        />

        <Button type="submit" className={`w-100 ${styles.submitBtn}`} disabled={isSubmitting}>
          {isSubmitting ? "Logging in…" : "Log In"}
        </Button>
      </form>
    </AuthShell>
  );
}
