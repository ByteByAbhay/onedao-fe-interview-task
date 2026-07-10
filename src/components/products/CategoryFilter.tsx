import { categories, type Category } from "@/data/productsData";
import styles from "./products.module.css";

type CategoryFilterProps = {
  active: Category | "All";
  onChange: (category: Category | "All") => void;
};

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className={styles.filterRow} role="group" aria-label="Filter products by category">
      <button
        type="button"
        className={`${styles.filterPill} ${active === "All" ? styles.filterPillActive : ""}`}
        onClick={() => onChange("All")}
        aria-pressed={active === "All"}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`${styles.filterPill} ${active === category ? styles.filterPillActive : ""}`}
          onClick={() => onChange(category)}
          aria-pressed={active === category}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
