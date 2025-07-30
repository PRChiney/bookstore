import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="card mb-3 shadow-sm border-secondary bg-highliter text-light">
      <div className="row g-0">
        <div className="col-md-2 d-flex align-items-center justify-content-center p-2">
          <img
            src={item.image}
            alt={item.title}
            className="img-fluid"
            style={{ maxHeight: '120px', objectFit: 'contain' }}
          />
        </div>
        <div className="col-md-6">
          <div className="card-body py-2 bg-highliter text-light">
            <h6 className="card-title fw-semibold mb-1">{item.title}</h6>
            <p className="card-text text-success small mb-1">In Stock</p>
            <p className="text-muted small">Seller: BookStore</p>
            <div className="d-flex align-items-center mt-2">
              <button
                className="btn btn-outline-light btn-sm px-2"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                −
              </button>
              <input
                type="number"
                className="form-control form-control-sm text-center mx-2 bg-highliter text-light border-secondary"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, Math.max(1, parseInt(e.target.value || 1)))}
                min="1"
                style={{ width: '60px' }}
              />
              <button
                className="btn btn-outline-light btn-sm px-2"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
        {/* Price Section */}
        <div className="col-md-4">
          <div className="card-body py-2 text-end bg-highliter text-light">
            <h6 className="mb-1 text-info">₹{item.price.toFixed(2)}</h6>
            <p className="text-muted small mb-1">
              <del>₹{(item.price * 1.2).toFixed(2)}</del> 20% off
            </p>
            <p className="fw-bold mb-2">Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
            <div>
              <button
                className="btn btn-outline-danger btn-sm p-0 me-3"
                onClick={() => removeFromCart(item.id)}
              >
                REMOVE
              </button>
              <button className="btn btn-link btn-sm text-warning text-decoration-none p-0">
                SAVE FOR LATER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;