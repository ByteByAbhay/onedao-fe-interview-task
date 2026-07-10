"use client";

import { useMemo } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faMinus, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { products } from "@/data/productsData";
import { addToCart, decrementQuantity, removeFromCart, clearCart } from "@/store/cartSlice";
import { showToast } from "@/store/toastSlice";
import styles from "./products.module.css";

type CartModalProps = {
  show: boolean;
  onHide: () => void;
};

export default function CartModal({ show, onHide }: CartModalProps) {
  const dispatch = useAppDispatch();
  const cartQuantities = useAppSelector((state) => state.cart.quantities);

  // Match items in cart with the products list
  const cartItems = useMemo(() => {
    return Object.entries(cartQuantities)
      .map(([id, qty]) => {
        const product = products.find((p) => p.id === id);
        return {
          product,
          quantity: qty,
        };
      })
      .filter((item): item is { product: typeof products[0]; quantity: number } => !!item.product);
  }, [cartQuantities]);

  const totalAmount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartItems]);

  function handleIncrement(productId: string) {
    dispatch(addToCart({ productId }));
  }

  function handleDecrement(productId: string) {
    dispatch(decrementQuantity({ productId }));
  }

  function handleRemove(productId: string, name: string) {
    dispatch(removeFromCart({ productId }));
    dispatch(
      showToast({
        title: "Removed from cart",
        message: `${name} has been removed from your cart.`,
        variant: "info",
      }),
    );
  }

  function handleClearCart() {
    dispatch(clearCart());
    dispatch(
      showToast({
        title: "Cart cleared",
        message: "All items have been removed from your cart.",
        variant: "info",
      }),
    );
  }

  function handleCheckout() {
    dispatch(clearCart());
    dispatch(
      showToast({
        title: "Checkout successful",
        message: "Thank you for your purchase! Your order has been placed.",
        variant: "success",
      }),
    );
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title id="cart-modal-title" className={styles.modalTitle}>
          <FontAwesomeIcon icon={faCartShopping} aria-hidden="true" />
          Shopping Cart
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <FontAwesomeIcon icon={faCartShopping} className={styles.emptyCartIcon} aria-hidden="true" />
            <p className={styles.emptyCartText}>Your cart is currently empty.</p>
            <Button className={styles.continueShoppingBtn} onClick={onHide}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className={styles.cartList}>
            {cartItems.map(({ product, quantity }) => (
              <div key={product.id} className={styles.cartItem}>
                <div className={styles.cartItemImage}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="64px"
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                </div>
                <div className={styles.cartItemDetails}>
                  <h4 className={styles.cartItemName}>{product.name}</h4>
                  <div className={styles.cartItemCategory}>{product.category}</div>
                  <div className={styles.cartItemPrice}>
                    ${product.price.toFixed(2)} each
                  </div>
                </div>
                <div className={styles.cartItemControls}>
                  <button
                    type="button"
                    className={styles.qtyBtn}
                    onClick={() => handleDecrement(product.id)}
                    aria-label={`Decrease quantity of ${product.name}`}
                  >
                    <FontAwesomeIcon icon={faMinus} aria-hidden="true" />
                  </button>
                  <span className={styles.qtyValue} aria-label={`${quantity} units`}>
                    {quantity}
                  </span>
                  <button
                    type="button"
                    className={styles.qtyBtn}
                    onClick={() => handleIncrement(product.id)}
                    aria-label={`Increase quantity of ${product.name}`}
                  >
                    <FontAwesomeIcon icon={faPlus} aria-hidden="true" />
                  </button>
                </div>
                <div className="ms-3 text-end" style={{ minWidth: "80px" }}>
                  <div className="fw-bold text-dark">
                    ${(product.price * quantity).toFixed(2)}
                  </div>
                </div>
                <button
                  type="button"
                  className={`${styles.removeBtn} ms-2`}
                  onClick={() => handleRemove(product.id, product.name)}
                  aria-label={`Remove ${product.name} from cart`}
                >
                  <FontAwesomeIcon icon={faTrash} aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        )}
      </Modal.Body>

      {cartItems.length > 0 && (
        <Modal.Footer>
          <div className={styles.modalFooter}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Total Amount:</span>
              <span className={styles.summaryValue}>${totalAmount.toFixed(2)}</span>
            </div>
            <div className={styles.actionButtons}>
              <Button type="button" className={styles.clearBtn} onClick={handleClearCart}>
                Clear Cart
              </Button>
              <Button type="button" className={styles.checkoutBtn} onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </Modal.Footer>
      )}
    </Modal>
  );
}
