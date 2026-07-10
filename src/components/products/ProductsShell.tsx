"use client";

import { useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "./ProductCard";
import CategoryFilter from "./CategoryFilter";
import CartModal from "./CartModal";
import { products, type Category } from "@/data/productsData";
import { useAppSelector } from "@/store/hooks";
import styles from "./products.module.css";

export default function ProductsShell() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [showCart, setShowCart] = useState(false);
  
  const cartQuantities = useAppSelector((state) => state.cart.quantities);
  const cartCount = useMemo(
    () => Object.values(cartQuantities).reduce((sum, qty) => sum + qty, 0),
    [cartQuantities],
  );

  const visibleProducts = useMemo(
    () =>
      activeCategory === "All"
        ? products
        : products.filter((product) => product.category === activeCategory),
    [activeCategory],
  );

  return (
    <div className={styles.page}>
      <Container fluid className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.pageTitle}>Our Products</h1>
            <p className={styles.pageSubtitle}>Browse our full collection, curated just for you.</p>
          </div>
          <button
            type="button"
            className={styles.cartBadgeWrap}
            onClick={() => setShowCart(true)}
            aria-label={`Open shopping cart, ${cartCount} items in cart`}
          >
            <FontAwesomeIcon icon={faCartShopping} aria-hidden="true" />
            <span className={styles.cartCount}>{cartCount}</span>
          </button>
        </header>

        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />

        <Row className={`g-4 ${styles.grid}`} xs={1} sm={2} lg={3} xl={4}>
          {visibleProducts.map((product) => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>

        {visibleProducts.length === 0 && (
          <p className={styles.emptyState}>No products found in this category.</p>
        )}
      </Container>

      <CartModal show={showCart} onHide={() => setShowCart(false)} />
    </div>
  );
}

