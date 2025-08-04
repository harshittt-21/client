import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          🛍️ ShopNetic
        </Link>
        
        <div className="nav-links">
          {isAuthenticated ? (
            <>
              <span className="nav-welcome">
                Welcome, {user.username}!
              </span>
              
              {isAdmin ? (
                <Link to="/admin" className="nav-link">
                  Admin Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/products" className="nav-link">
                    Products
                  </Link>
                  <Link to="/cart" className="nav-link">
                    Cart
                  </Link>
                </>
              )}
              
              <button onClick={handleLogout} className="nav-button logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-button">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
