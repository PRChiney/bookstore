import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';

const Header = ({ minimal }) => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setNavOpen(false);
  };

  const handleNavToggle = () => setNavOpen((open) => !open);
  const handleNavLinkClick = () => setNavOpen(false);

  return (
    <header className="shadow-sm bg-dark mb-3 sticky-top" style={{ zIndex: 1030 }}>
      <nav className="container navbar navbar-expand-lg navbar-dark py-2">
        <Link to="/" className="navbar-brand fw-bold fs-4 text-light d-flex align-items-center" onClick={handleNavLinkClick}>
          <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
          BookStore
        </Link>
        {!minimal && (
          <>
            <button
              className="navbar-toggler"
              type="button"
              aria-label="Toggle navigation"
              onClick={handleNavToggle}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse${navOpen ? ' show' : ''}`}>
              <div className="navbar-nav ms-auto align-items-lg-center gap-lg-4">
                <Link to="/" className="nav-link text-light fw-medium" onClick={handleNavLinkClick}>
                  Home
                </Link>
                <Link to="/cart" className="nav-link text-light fw-medium d-flex align-items-center" onClick={handleNavLinkClick}>
                  🛒 Cart&nbsp;<span className="badge bg-warning text-dark">{cartCount}</span>
                </Link>
                <Link to="/orders" className="nav-link text-light fw-medium" onClick={handleNavLinkClick}>
                  Orders
                </Link>
                {user ? (
                  <button onClick={handleLogout} className="btn btn-outline-light btn-sm ms-lg-2 mt-2 mt-lg-0">
                    Logout
                  </button>
                ) : (
                  <>
                    <Link to="/login" className="btn btn-outline-light btn-sm ms-lg-2 mt-2 mt-lg-0" onClick={handleNavLinkClick}>
                      Sign In
                    </Link>
                    <Link to="/signup" className="btn btn-primary btn-sm ms-lg-2 mt-2 mt-lg-0" onClick={handleNavLinkClick}>
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;