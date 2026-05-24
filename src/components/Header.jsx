import React from 'react';
import logo from '../assets/logo.png.jpeg';

export default function Header({ 
  cartCount, 
  onCartOpen, 
  searchQuery, 
  onSearchChange,
  isAdminView,
  onToggleAdminView
}) {
  return (
    <header className="header" style={{
      background: '#2874f0', /* Flipkart Blue */
      padding: '0.75rem 2rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="header-inner" style={{
        maxWidth: '1240px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem'
      }}>
        {/* Brand Logo & Name */}
        <a href="/" className="logo-container" onClick={(e) => e.preventDefault()} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          textDecoration: 'none'
        }}>
          <img src={logo} alt="Bright House Logo" className="logo-img" style={{
            height: '38px',
            width: 'auto',
            borderRadius: '4px'
          }} />
          <span className="logo-text" style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            lineHeight: 0.95
          }}>
            <div style={{ color: '#ffffff' }}>Bright<span style={{ color: '#ffe500' }}>House</span></div>
            <span style={{ fontSize: '0.6rem', color: 'rgba(255, 255, 255, 0.75)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700, marginTop: '2px' }}>Lights & LED</span>
          </span>
        </a>

        {/* Flipkart-Style Central Search Bar */}
        {!isAdminView ? (
          <div className="search-container" style={{
            flex: 1,
            maxWidth: '560px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <input
              type="text"
              className="search-input"
              placeholder="Search for premium lights, LEDs, bulbs and more..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 1rem 0.65rem 2.5rem',
                borderRadius: '4px',
                border: 'none',
                background: '#ffffff',
                color: '#212121',
                fontSize: '0.9rem',
                fontWeight: 500,
                outline: 'none',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }}
            />
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#878787" strokeWidth="2.5" style={{
              position: 'absolute',
              left: '0.75rem',
              width: '18px',
              height: '18px',
              pointerEvents: 'none'
            }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        ) : (
          <div style={{
            flex: 1,
            textAlign: 'center',
            color: '#ffe500',
            fontWeight: 700,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            fontSize: '0.85rem',
            background: 'rgba(255, 255, 255, 0.08)',
            padding: '0.45rem 1rem',
            borderRadius: '4px',
            border: '1px dashed rgba(255, 255, 255, 0.3)'
          }}>
            👑 Secure Brand Console Panel
          </div>
        )}

        {/* Action Buttons Nav */}
        <div className="header-actions" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          {!isAdminView && (
            <nav className="nav-links" style={{ display: 'flex', gap: '1.25rem' }}>
              <a href="#products" className="nav-link" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700 }}>Shop</a>
              <a href="#categories" className="nav-link" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700 }}>Offers</a>
            </nav>
          )}

          {/* Secure Admin Toggler Button (Flipkart styled white button) */}
          <button 
            onClick={onToggleAdminView} 
            className="category-capsule" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: '#ffffff',
              border: '1px solid #ffffff',
              color: '#2874f0',
              fontWeight: 700,
              fontSize: '0.85rem',
              padding: '0.45rem 1.2rem',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f9f9f9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
            }}
          >
            {isAdminView ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Customer Shop
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Admin Panel
              </>
            )}
          </button>

          {/* Interactive Cart Trigger Button (Flipkart White Cart link) */}
          {!isAdminView && (
            <button className="cart-trigger" onClick={onCartOpen} aria-label="Open Shopping Cart" style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              position: 'relative',
              padding: '0.25rem 0.5rem'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>Cart</span>
              {cartCount > 0 && (
                <span className="cart-badge" style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-10px',
                  background: '#ff9f00', /* Flipkart Orange */
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '0.68rem',
                  minWidth: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 3px',
                  border: '1.5px solid #2874f0'
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
