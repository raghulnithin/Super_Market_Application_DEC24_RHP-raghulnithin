import React, { useState } from 'react';
import Cart from '../components/Cart';

const CartPage = (/*{cartItems, onRemoveFromCart}*/) => {
   const [cartItems, setCartItems] = useState([
     { id: 1, name: 'Apple1', price: 2.5 },
     { id: 2, name: 'Banana', price: 1.2 },
   ]);

  const onRemoveFromCart = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems); 
  };

  return <Cart cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} />;
};

export default CartPage;