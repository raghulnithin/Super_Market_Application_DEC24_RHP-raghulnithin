import React from 'react';
import Cart from '../components/Cart';
import { createOrder } from '../api/api'; 

const CartPage = ({ cartItems, onRemoveFromCart }) => {
  const handlePlaceOrder = () => {
    cartItems.forEach(item => {
      createOrder({
        customerId: 1, 
        productId: item.id,
        quantity: 1,
        orderDate: new Date()
      });
    });
    alert('Order Placed!');
  };

  return (
    <div>
      <Cart cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={handlePlaceOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default CartPage;
