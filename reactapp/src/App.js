import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleRemoveFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
        <Route
          path="/cart"
          element={
            <CartPage cartItems={cart} onRemoveFromCart={handleRemoveFromCart} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
