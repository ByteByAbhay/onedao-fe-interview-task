import type { Metadata } from "next";
import OtpForm from "@/components/auth/OtpForm";

export const metadata: Metadata = {
  title: "Verify Email | OneDAO Admin Panel",
  description: "Enter the one-time password sent to your registered email id.",
};

export default function OtpPage() {
  return <OtpForm />;
}
