import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">✨</span>
          <span className="brand-text">Dreamy AI Resume Builder</span>
        </Link>

        {/* Navigation Links */}
        <div className="navbar-links">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/templates" 
            className={`nav-link ${isActive('/templates') ? 'active' : ''}`}
          >
            Templates
          </Link>
          
          {/* Conditional rendering based on auth status */}
          {isAuthenticated ? (
            <>
              <Link 
                to="/builder" 
                className={`nav-link ${isActive('/builder') ? 'active' : ''}`}
              >
                Resume Builder
              </Link>
              <button 
                onClick={onLogout}
                className="nav-link logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`nav-link ${isActive('/login') ? 'active' : ''}`}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className={`nav-link ${isActive('/signup') ? 'active' : ''}`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn">
          <span className="menu-icon">☰</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 