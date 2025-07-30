import React from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    showToast('Added to cart!');
  };

  return (
    <div className="card shadow-sm h-100" style={{ minHeight: '420px' }}>
      <img 
        src={product.image} 
        alt={product.title} 
        className="card-img-top p-3" 
        style={{ height: '200px', objectFit: 'contain' }} 
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-2 text-white">{product.title}</h5>
        <p className="card-text text-muted flex-grow-1" style={{ fontSize: '0.9rem' }}>
          {product.description.substring(0, 100)}...
        </p>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="text-success fw-bold fs-5">₹{product.price}</span>
          <button 
            onClick={handleAddToCart} 
            className="btn btn-sm btn-outline-primary"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
