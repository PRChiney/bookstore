import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';

const Header = ({ minimal }) => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="shadow-sm bg-dark mb-3 sticky-top" style={{ zIndex: 1030 }}>
      <nav className="container d-flex justify-content-between align-items-center py-3">
        <Link to="/" className="navbar-brand fw-bold fs-4 text-light text-decoration-none d-flex align-items-center">
          <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
          BookStore
        </Link>

        {/* Right Side Navigation */}
        {!minimal && (
          <div className="d-flex align-items-center gap-4">
            <Link to="/" className="text-light text-decoration-none fw-medium">
              Home
            </Link>

            <Link to="/cart" className="text-light text-decoration-none fw-medium d-flex align-items-center">
              🛒 Cart&nbsp;<span className="badge bg-warning text-dark">{cartCount}</span>
            </Link>

            <Link to="/orders" className="text-light text-decoration-none fw-medium">
              Orders
            </Link>

            {user && (
              <button onClick={handleLogout} className="btn btn-outline-light btn-sm ms-2">
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
