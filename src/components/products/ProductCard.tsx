"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faStar as faStarSolid,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import type { Product } from "@/data/productsData";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import { showToast } from "@/store/toastSlice";
import styles from "./products.module.css";

const RATING_STARS = [0, 1, 2, 3, 4];

function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const [isWishlisted, setIsWishlisted] = useState(false);

  function handleAddToCart() {
    dispatch(addToCart({ productId: product.id }));
    dispatch(
      showToast({
        title: "Added to cart",
        message: `${product.name} has been added to your cart.`,
        variant: "success",
      }),
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1200px) 280px, (min-width: 768px) 45vw, 90vw"
          style={{ objectFit: "cover" }}
          unoptimized
        />
        <button
          type="button"
          className={styles.wishlistBtn}
          onClick={() => setIsWishlisted((current) => !current)}
          aria-pressed={isWishlisted}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FontAwesomeIcon icon={isWishlisted ? faHeartSolid : faHeartRegular} aria-hidden="true" />
        </button>
        <span className={styles.categoryBadge}>{product.category}</span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.rating} aria-label={`Rated ${product.rating} out of 5`}>
          {RATING_STARS.map((index) => (
            <FontAwesomeIcon
              key={index}
              icon={faStarSolid}
              className={index < Math.round(product.rating) ? styles.starFilled : styles.starEmpty}
              aria-hidden="true"
            />
          ))}
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          <Button type="button" className={styles.addToCartBtn} onClick={handleAddToCart}>
            <FontAwesomeIcon icon={faCartShopping} aria-hidden="true" />
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
