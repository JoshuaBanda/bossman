'use client';
import React, { useEffect, useRef } from 'react';
import styles from './styles/cart.module.css';
import CartIcon from '../svgs/CartIcon';
import gsap from 'gsap';

const Cart = ({ totalQuantity = 0 }) => {
  const quantityRef = useRef();

  useEffect(() => {
    if (!quantityRef.current) return;

    // Animate number change
    gsap.fromTo(
      quantityRef.current,
      { scale: 1, opacity: 0 },
      {
        scale: 1.3,
        opacity: 1,
        duration: 0.3,
        onComplete: () => {
          gsap.to(quantityRef.current, { scale: 1, duration: 0.2 });
        },
        textContent: totalQuantity,
        snap: { textContent: 1 }, // ensures integers
      }
    );
  }, [totalQuantity]);

  return (
    <div className={styles.container} id="primaryBackgroundColor">
      <div className={styles.iconContainer}>
        <CartIcon />
      </div>
      <div
        className={styles.numberOfItemsInCart}
        id="primaryColorTwo"
        ref={quantityRef}
      >
        {totalQuantity}
      </div>
    </div>
  );
};

export default Cart;
