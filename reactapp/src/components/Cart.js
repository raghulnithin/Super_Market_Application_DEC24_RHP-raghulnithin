import React from 'react';
import styles from './Cart.module.css';

const Cart = ({ cartItems, onRemoveFromCart }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);

  return (
    <div className={styles.cart}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className={styles['cart-item']}>
              <p>{item.name} - ${item.price}</p>
              <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <p className={styles['cart-total']}>Total: ${totalPrice}</p>
          <button className={styles['checkout-button']}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
