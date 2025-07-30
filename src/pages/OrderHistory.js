import React from 'react';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const OrderHistory = () => {
  const { orders, cancelOrder } = useCart();
  const { showToast } = useToast();

  const handleCancel = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      cancelOrder(orderId);
      showToast('Order cancelled!');
    }
  };

  return (
    <div>
      <Header />
      <div className="container my-4">
        <h3 className="mb-4">Your Orders</h3>

        {orders.length === 0 ? (
          <div className="card p-4 text-center shadow-sm border-0 bg-dark text-light">
            <h5>No orders yet</h5>
            <p className="text-muted">You haven’t placed any orders yet.</p>
          </div>
        ) : (
          orders.map(order => (
             <div className="card mb-4 shadow-sm border-secondary bg-dark text-light" key={order.id}>
              <div className="row g-0 flex-column flex-md-row">
                {/* Left: Order Summary */}
                <div className="col-12 col-md-8 border-end border-secondary">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0 fw-semibold">Order #{order.id}</h6>
                      <span className="text-muted small">
                        {new Date(order.date).toLocaleString()}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className={`badge ${order.status === 'Cancelled' ? 'bg-danger' : 'bg-success'}`}>
                        {order.status}
                      </span>
                    </div>
                    <hr className="bg-secondary" />
                    <div>
                      {order.items.map(item => (
                        <div
                          key={item.id}
                          className="d-flex justify-content-between align-items-center mb-2"
                        >
                          <div className="d-flex align-items-center">
                            <img
                              src={item.image}
                              alt={item.title}
                              style={{ width: 48, height: 60, objectFit: 'cover', marginRight: 12, borderRadius: 4 }}
                            />
                            <div>
                              <div className="fw-semibold">{item.title}</div>
                              <div className="text-muted small">Qty: {item.quantity}</div>
                            </div>
                          </div>
                          <span className="fw-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <hr className="bg-secondary" />
                    <div className="d-flex justify-content-between">
                      <span className="fw-bold">Order Total</span>
                      <span className="fw-bold">₹{order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                {/* Right: Delivery/User Details */}
                 <div className="col-12 col-md-4">
                  <div className="card-body">
                    <div className="mb-2">
                      <strong>User Name:</strong>
                      <div className="text-muted">{order.name}</div>
                    </div>
                    <div className="mb-2">
                      <strong>Delivery Address:</strong>
                      <div className="text-muted">{order.address}</div>
                    </div>
                    <div className="mb-2">
                      <strong>Phone:</strong>
                      <div className="text-muted">{order.phone}</div>
                    </div>

                    <div className="mb-2">
                      <strong>Payment Mode:</strong>
                      <div className="text-muted">{order.paymentMode}</div>
                    </div>
                    <div className="mb-2">
                      <strong>Order Date:</strong>
                      <div className="text-muted">{new Date(order.date).toLocaleDateString()}</div>
                    </div>
                    <div className="mb-2">
                      <strong>Status:</strong>
                      <span className={`ms-2 badge ${order.status === 'Cancelled' ? 'bg-danger' : 'bg-success'}`}>
                        {order.status}
                      </span>
                    </div>
                    <button
                      className="btn btn-outline-danger btn-sm mt-3"
                      onClick={() => handleCancel(order.id)}
                      disabled={order.status === 'Cancelled'}
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;