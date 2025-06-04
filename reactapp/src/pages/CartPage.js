import React from 'react';
import Cart from '../components/Cart';
import { createOrder } from '../api/api'; // 🆕 Added API call for order creation

const CartPage = ({ cartItems, onRemoveFromCart }) => {
  // 🆕 Function to place orders for each item
  const handlePlaceOrder = () => {
    cartItems.forEach(item => {
      createOrder({
        customerId: 1, // Hardcoded for now, replace with actual customer ID if login is integrated
        productId: item.id,
        quantity: 1,
        orderDate: new Date()
      });
    });
    alert('Order Placed!');
  };

  return (
    <div>
      {/* 👇 Keeps your original cart component */}
      <Cart cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} />

      {/* 🆕 Extra button below the cart */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={handlePlaceOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default CartPage;
