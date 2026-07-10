import styles from "./dashboard.module.css";
import Image from "next/image";

const PALETTE = ["#7C8CF8", "#F78CA2", "#F7B267", "#63C7A6", "#8E7CF8", "#5FB6E8"];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return `${first}${last}`.toUpperCase();
}

function getColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

type AvatarProps = {
  name: string;
  size?: number;
  src?: string;
  shape?: "circle" | "square";
  ring?: boolean;
};

export default function Avatar({ name, size = 44, src, shape = "circle", ring = false }: AvatarProps) {
  const borderRadius = shape === "circle" ? "50%" : "4px";

  if (src) {
    const photo = (
      <div
        style={{
          width: size,
          height: size,
          borderRadius,
          overflow: "hidden",
          flex: "0 0 auto",
          position: "relative",
        }}
        aria-hidden="true"
      >
        <Image src={src} alt={name} fill style={{ objectFit: "cover" }} unoptimized />
      </div>
    );

    if (ring) {
      return (
        <span
          className={styles.avatarRing}
          style={{
            width: size + 10,
            height: size + 10,
            borderRadius: shape === "circle" ? "50%" : "8px",
          }}
        >
          {photo}
        </span>
      );
    }

    return photo;
  }

  return (
    <span
      className={styles.avatar}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        backgroundColor: getColor(name),
        borderRadius,
      }}
      aria-hidden="true"
    >
      {getInitials(name)}
    </span>
  );
}
