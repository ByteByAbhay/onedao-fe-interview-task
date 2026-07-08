import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Register | OneDAO Admin Panel",
  description: "Create an OneDAO admin panel account.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
