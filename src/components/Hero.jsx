import React from 'react';

export default function Hero({ onShopNowClick }) {
  return (
    <section className="hero">
      <div className="hero-glow"></div>
      <div className="hero-content">
        <span className="hero-tag">Elevate Your Lifestyle</span>
        <h1 className="hero-title">
          Experience the Gold Standard of <span>Online Shopping</span>
        </h1>
        <p className="hero-description">
          Welcome to shope, where luxury meets utility. Discover curated collections, enjoy blazing fast performance, and check out instantly with zero friction.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={onShopNowClick}>
            Explore Catalog
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
