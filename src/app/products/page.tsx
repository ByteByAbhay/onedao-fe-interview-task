import type { Metadata } from "next";
import ProductsShell from "@/components/products/ProductsShell";

export const metadata: Metadata = {
  title: "Products | OneDAO",
  description: "Browse the OneDAO product catalog.",
};

export default function ProductsPage() {
  return <ProductsShell />;
}
