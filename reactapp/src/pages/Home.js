import React, {useState} from 'react';
import ProductList from '../components/ProductList';

const Home = () => {
  const [cart, setCart] = useState([]);
   
  const products = [
    { 
      id: 1, 
      name: 'Apple', 
      price: 2.5, 
      description: 'Fresh', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg' 
    },
    { 
      id: 2, 
      name: 'Banana', 
      price: 1.2, 
      description: 'Fresh', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg' 
    },
    { 
      id: 3, 
      name: 'Orange', 
      price: 1.5, 
      description: 'Fresh', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg' 
    }
  ];

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  return (    
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to the Supermarket</h1>
      <ProductList products={products} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default Home;
