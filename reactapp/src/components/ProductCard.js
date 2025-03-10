import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div  style={{ 
      textAlign: 'center', 
      padding: '16px', 
      border: '1px solid #ccc', 
      borderRadius: '8px', 
      margin: '16px', 
      width: '200px' 
    }}>
      <img 
        src={product.image} 
        alt={product.name} 
        style={{ 
          width: '150px', 
          height: '150px', 
          objectFit: 'cover', 
          borderRadius: '8px', 
          display: 'block', 
          margin: '0 auto 16px auto' 
        }} 
      />
      <h3 style={{ margin: '8px 0' }}>{product.name}</h3>
      <p style={{ margin: '4px 0' }}>{product.description}</p>
      <p style={{ margin: '4px 0' }}>Price: ${product.price}</p>
      
      <button
  onClick={() => onAddToCart(product)}
  style={{
    marginTop: '8px',
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
    outline: 'none',
  }}
  onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
  onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
>
  Add to Cart
</button>


    </div>
  );
};

export default ProductCard;