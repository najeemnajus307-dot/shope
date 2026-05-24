import React from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ 
  products, 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  onAddToCart,
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  onProductClick
}) {
  return (
    <section className="products-section" id="products">
      {/* Category Results Meta Bar */}
      <div className="store-controls" id="categories" style={{ marginBottom: '1rem', justifyContent: 'flex-start', borderBottom: '1px solid #e0e0e0', paddingBottom: '0.75rem', marginTop: '1rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#212121', fontFamily: "'Outfit', sans-serif" }}>
          Deals on {selectedCategory === 'All' ? 'All Lights & LED Products' : selectedCategory}
        </h2>
        <span style={{ fontSize: '0.85rem', color: '#878787', marginLeft: '0.75rem', fontWeight: 500 }}>
          ({products.length} items found)
        </span>
      </div>

      {/* Premium Glassmorphic Sorting & Price Range Filter Row */}
      <div className="store-filters-bar" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
        maxWidth: '1400px',
        margin: '0 auto 2.5rem auto',
        padding: '0.85rem 2rem',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--glass-border)',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)',
        animation: 'fadeIn 0.4s ease-out'
      }}>
        {/* Price Slider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span className="form-label" style={{ minWidth: '150px', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>
            MAX PRICE: <strong style={{ color: 'var(--brand-primary)', fontSize: '0.95rem' }}>${priceRange[1]}</strong>
          </span>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={priceRange[1]}
            onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
            style={{
              cursor: 'pointer',
              accentColor: 'var(--brand-primary)',
              width: '180px',
              height: '4px',
              borderRadius: '2px'
            }}
          />
        </div>

        {/* Sort Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="form-label" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>SORT BY:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="status-dropdown"
            style={{
              padding: '0.45rem 1.25rem',
              borderRadius: '9999px',
              background: 'rgba(15, 23, 42, 0.8)',
              color: 'var(--text-primary)',
              border: '1px solid var(--glass-border)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
              outline: 'none',
              transition: 'var(--transition-smooth)'
            }}
          >
            <option value="recommended">⭐ Recommended</option>
            <option value="price-low">💵 Price: Low to High</option>
            <option value="price-high">📈 Price: High to Low</option>
            <option value="rating">🏆 Customer Rating</option>
          </select>
        </div>
      </div>

      {/* Products Grid display */}
      {products.length > 0 ? (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      ) : (
        <div className="empty-results" style={{ animation: 'fadeIn 0.3s ease-out' }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3>No products match your filters</h3>
          <p style={{ marginTop: '0.5rem', opacity: 0.7 }}>Try adjusting the price range, changing category or search terms.</p>
        </div>
      )}
    </section>
  );
}
