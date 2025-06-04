import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import { fetchProducts } from '../api/api'; // 🆕 Added to fetch from backend

const Home = ({ onAddToCart }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Apple',
      price: 2.5,
      description: 'Fresh',
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg',
    },
    {
      id: 2,
      name: 'Banana',
      price: 1.2,
      description: 'Fresh',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg',
    },
    {
    id: 3,
    name: 'Dragonfruit',
    price: 4.0,
    description: 'Exotic and sweet',
    image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcThjH-Xp01qrH-9SIwCr301AAa9qWTaUGP1qRyd8zd3jsFyZBpWCOGKhbzydQLsZFxTHFFGZQklFDFm7a-pLwyzwskbA15C-OwWAh0EJSPRHA'

    },
    {
      id: 4,
      name: 'Orange',
      price: 1.5,
      description: 'Fresh',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg',
    },
  ]);

  // 🆕 Fetch from backend and override hardcoded products if API responds
  useEffect(() => {
    fetchProducts()
      .then(apiProducts => {
        if (apiProducts && apiProducts.length > 0) {
          setProducts(apiProducts);
        }
      })
      .catch(err => {
        console.error("Error fetching products from backend:", err);
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to the Supermarket</h1>
      <ProductList products={products} onAddToCart={onAddToCart} />
    </div>
  );
};

export default Home;
