import type { Metadata } from "next";
import ProductsShell from "@/components/products/ProductsShell";

export const metadata: Metadata = {
  title: "OneDAO | Shop",
  description: "Browse the OneDAO product catalog.",
};

export default function Home() {
  return <ProductsShell />;
}
