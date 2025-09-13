import React from 'react';
import './Header.css';

const Header = ({ theme, onThemeToggle }) => {
  return (
    <header className="header dreamy-fade-in">
      <div className="header-content">
        <h1 className="header-title">
          <span className="title-icon">✨</span>
          Dreamy AI resumes Builder
          <span className="title-icon">✨</span>
        </h1>
        <p className="header-subtitle">
          Create beautiful, professional resumes with AI assistance
        </p>
      </div>
      <button 
        className="theme-toggle glow"
        onClick={onThemeToggle}
        aria-label="Toggle theme"
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </header>
  );
};

export default Header; 