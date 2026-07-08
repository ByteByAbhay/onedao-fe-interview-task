import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log In | OneDAO Admin Panel",
  description: "Log in to the OneDAO admin panel with your email id and password.",
};

export default function LoginPage() {
  return <LoginForm />;
}
