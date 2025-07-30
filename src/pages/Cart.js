import React, { useState } from 'react';
import Header from '../components/Header';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, cartTotal, checkout, cartCount } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();


  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMode, setPaymentMode] = useState('Cash on Delivery');
  const [showDetailsForm, setShowDetailsForm] = useState(false);

  const deliveryCharge = cartTotal > 500 ? 0 : 40;
  const totalAmount = cartTotal + deliveryCharge;

  const handlePlaceOrderClick = () => {
    setShowDetailsForm(true);
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    if (!address || !phone || !paymentMode) return;
    checkout({ address, phone, paymentMode }); 
    showToast('Order placed successfully!');
    setShowDetailsForm(false);
    setTimeout(() => navigate('/orders'), 1200);
  };

  return (
    <div>
      <Header />
      <div className="container my-4">
        <div className="row">
          <div className="col-md-8">
            <div className="card p-3 mb-3 shadow-sm border-secondary bg-highliter text-light">
              <h5 className="fw-semibold">
                My Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </h5>
            </div>

            {cart.length === 0 ? (
              <div className="card p-5 text-center shadow-sm border-secondary bg-highliter text-light">
                <h5> 🛒 Your cart is empty</h5>
                <p className="text-muted">Add items to it now</p>
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => navigate('/')}
                >
                  Shop Now
                </button>
              </div>
            ) : (
              cart.map(item => <CartItem key={item.id} item={item} />)
            )}
          </div>

          {/* Price Details */}
          {cart.length > 0 && (
            <div className="col-md-4">
              <div className="card p-3 sticky-top shadow-sm border-secondary bg-highliter text-light" style={{ top: '20px' }}>
                <h5 className="mb-3">Price Details</h5>
                <hr className="bg-secondary" />
                <div className="d-flex justify-content-between mb-2">
                  <span>Price ({cartCount} items)</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery Charges</span>
                  <span>
                    {deliveryCharge === 0 ? (
                      <span className="text-success">FREE</span>
                    ) : (
                      `₹${deliveryCharge}`
                    )}
                  </span>
                </div>
                <hr className="bg-secondary" />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total Amount</strong>
                  <strong>₹{totalAmount.toFixed(2)}</strong>
                </div>
                <p className="text-success small">
                  You will save ₹{(cartTotal * 0.2).toFixed(2)} on this order
                </p>
                <button
                  className="btn btn-warning w-100 fw-bold"
                  onClick={handlePlaceOrderClick}
                >
                  PLACE ORDER
                </button>
                {/* User Details Form */}
                {showDetailsForm && (
                  <form className="mt-3" onSubmit={handleDetailsSubmit}>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Delivery Address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        className="form-control"
                        value={paymentMode}
                        onChange={e => setPaymentMode(e.target.value)}
                        required
                      >
                        <option value="">Select Payment Mode</option>
                        <option value="Cash on Delivery">Cash on Delivery</option>
                        <option value="UPI">UPI</option>
                        <option value="Credit/Debit Card">Credit/Debit Card</option>
                        <option value="Net Banking">Net Banking</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-success w-100">Confirm Order</button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;