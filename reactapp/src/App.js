import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import DetailsPage from './components/DetailsPage';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  // Add item to cart
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  // Remove item from cart by ID
  const handleRemoveFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
              onRemoveFromCart={handleRemoveFromCart}
            />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<CartPage cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />} />
        +
      </Routes>
    </Router>
  );
};

export default App;
