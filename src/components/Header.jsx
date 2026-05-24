import React from 'react';
import logo from '../assets/logo.png';

export default function Header({ 
  cartCount, 
  onCartOpen, 
  searchQuery, 
  onSearchChange,
  isAdminView,
  onToggleAdminView
}) {
  return (
    <header className="header">
      <div className="header-inner">
        {/* Brand Logo & Name */}
        <a href="/" className="logo-container" onClick={(e) => e.preventDefault()}>
          <img src={logo} alt="Bright House Logo" className="logo-img" />
          <span className="logo-text" style={{ flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
            Bright<span>House</span>
            <span style={{ fontSize: '0.65rem', letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '2px', fontWeight: 600 }}>Lights & LED</span>
          </span>
        </a>

        {/* Search Bar - Hidden in Admin View */}
        {!isAdminView ? (
          <div className="search-container">
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search lights..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        ) : (
          <div style={{ flex: 1, textAlign: 'center', color: 'var(--brand-primary)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>
            👑 Secure Management Console
          </div>
        )}

        {/* Action Elements */}
        <div className="header-actions">
          {!isAdminView && (
            <nav className="nav-links">
              <a href="#products" className="nav-link">Shop</a>
              <a href="#categories" className="nav-link">Categories</a>
            </nav>
          )}

          {/* Secure Admin Toggler Button */}
          <button 
            onClick={onToggleAdminView} 
            className="category-capsule active" 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--brand-primary)', cursor: 'pointer' }}
          >
            {isAdminView ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Customer Shop
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Admin Panel
              </>
            )}
          </button>

          {/* Interactive Cart Trigger Button (Hidden in Admin View) */}
          {!isAdminView && (
            <button className="cart-trigger" onClick={onCartOpen} aria-label="Open Shopping Cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
