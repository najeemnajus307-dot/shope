import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        
        {/* Brand Information */}
        <div className="footer-brand">
          <div className="logo-text" style={{ fontSize: '2rem', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
            Bright<span>House</span>
            <span style={{ fontSize: '0.75rem', letterSpacing: '2px', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '2px', fontWeight: 600 }}>Lights & LED</span>
          </div>
          <p className="footer-description">
            The premium lighting shopping experience curated with elegant aesthetics and engineered for modern homes.
          </p>
        </div>

        {/* Column 1 - Explore */}
        <div className="footer-col">
          <h3>Explore</h3>
          <ul className="footer-links">
            <li className="footer-link"><a href="#products">New Arrivals</a></li>
            <li className="footer-link"><a href="#products">Featured Collections</a></li>
            <li className="footer-link"><a href="#categories">Categories</a></li>
            <li className="footer-link"><a href="#products">Trending Items</a></li>
          </ul>
        </div>

        {/* Column 2 - Support */}
        <div className="footer-col">
          <h3>Support</h3>
          <ul className="footer-links">
            <li className="footer-link"><a href="/" onClick={e => e.preventDefault()}>Track Order</a></li>
            <li className="footer-link"><a href="/" onClick={e => e.preventDefault()}>Delivery & Returns</a></li>
            <li className="footer-link"><a href="/" onClick={e => e.preventDefault()}>FAQ & Help</a></li>
            <li className="footer-link"><a href="/" onClick={e => e.preventDefault()}>Contact Us</a></li>
          </ul>
        </div>

        {/* Column 3 - Corporate */}
        <div className="footer-col">
          <h3>Corporate</h3>
          <ul className="footer-links">
            <li className="footer-link"><a href="/" onClick={e => e.preventDefault()}>Our Story</a></li>
            <li className="footer-link"><a href="/" onClick={e => e.preventDefault()}>Sustainability</a></li>
            <li className="footer-link"><a href="/" onClick={e => e.preventDefault()}>Careers</a></li>
            <li className="footer-link"><a href="/" onClick={e => e.preventDefault()}>Press & News</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Footer Section */}
      <div className="footer-bottom">
        <div className="footer-copyright">
          &copy; {currentYear} Bright House Lights & LED. All rights reserved. Made with love for premium lighting.
        </div>

        {/* Social Network Links */}
        <div className="footer-socials">
          <a className="social-icon" aria-label="Facebook" href="/" onClick={e => e.preventDefault()}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          <a className="social-icon" aria-label="Twitter" href="/" onClick={e => e.preventDefault()}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>
          <a className="social-icon" aria-label="Instagram" href="/" onClick={e => e.preventDefault()}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
