import React from 'react';

export default function ProductCard({ product, onAddToCart, onProductClick }) {
  const { name, price, rating, category, discount, icon: ProductIcon } = product;

  // Calculate mathematical original price if discount exists
  const hasDiscount = discount > 0;
  const originalPrice = hasDiscount ? (price / (1 - discount / 100)) : price;

  return (
    <article 
      className="product-card" 
      onClick={() => onProductClick && onProductClick(product)}
      style={{
        cursor: 'pointer',
        background: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        height: '100%'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.1)';
        e.currentTarget.style.borderColor = '#2874f0';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = '#e0e0e0';
      }}
    >
      {/* Wishlist Button (Aesthetics) */}
      <button 
        className="product-card-wishlist" 
        onClick={(e) => e.stopPropagation()} 
        aria-label="Add to wishlist"
        style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          background: 'rgba(255,255,255,0.85)',
          border: '1px solid #e0e0e0',
          color: '#878787',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'all 0.2s ease',
          outline: 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#ef4444';
          e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)';
          e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#878787';
          e.currentTarget.style.borderColor = '#e0e0e0';
          e.currentTarget.style.background = 'rgba(255,255,255,0.85)';
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Image container displaying product SVG icon or Custom Image */}
      <div className="product-image-container" style={{
        aspectRatio: '1',
        background: '#fcfcfc',
        borderRadius: '6px',
        overflow: 'hidden',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        border: '1px solid #f5f5f5'
      }}>
        {product.image ? (
          <img src={product.image} alt={name} className="product-image" style={{ width: '85%', height: '85%', objectFit: 'contain', borderRadius: '4px', transition: 'transform 0.3s ease' }} />
        ) : (
          <div style={{ width: '70%', height: '70%', transition: 'transform 0.3s ease' }} className="fallback-svg-icon">
            <ProductIcon />
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="product-title" style={{
        fontSize: '0.92rem',
        fontWeight: 600,
        color: '#212121',
        margin: '0 0 0.5rem 0',
        lineHeight: 1.4,
        fontFamily: "'Inter', sans-serif",
        display: '-webkit-box',
        WebkitLineClamp: '2',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        height: '38px'
      }}>
        {name}
      </h3>

      {/* Meta (Rating star badge & f-Assured stamp) */}
      <div className="product-meta" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        marginBottom: '0.75rem'
      }}>
        {/* Flipkart green ratings badge */}
        <div className="product-rating" style={{
          background: '#388e3c', /* Green */
          color: '#ffffff',
          padding: '0.15rem 0.45rem',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontWeight: 700,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '2px'
        }}>
          <span>{rating}</span>
          <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{ fill: '#ffffff', width: '10px', height: '10px' }}>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>

        {/* f-Assured quality stamp badge */}
        <div className="f-assured-badge" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          background: 'none',
          padding: 0
        }} title="Flipkart Assured Quality">
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#2874f0', fontStyle: 'italic' }}>f-Assured</span>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#ffe500',
            border: '1.5px solid #2874f0'
          }} />
        </div>
      </div>

      {/* Pricing Splits and Action footer */}
      <div className="product-footer" style={{
        marginTop: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
      }}>
        {/* Flipkart style price structure */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', flexWrap: 'wrap' }}>
            <span className="product-price" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#212121' }}>
              ${price.toFixed(2)}
            </span>
            
            {hasDiscount && (
              <span style={{ fontSize: '0.78rem', color: '#878787', textDecoration: 'line-through' }}>
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {hasDiscount && (
            <span style={{ fontSize: '0.78rem', color: '#388e3c', fontWeight: 700 }}>
              {discount}% Off
            </span>
          )}
        </div>

        {/* Flipkart Orange Add-to-cart trigger icon */}
        <button 
          className="btn-add-cart" 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }} 
          aria-label={`Add ${name} to cart`}
          style={{
            background: '#ff9f00', /* Flipkart Orange */
            border: 'none',
            color: '#ffffff',
            width: '34px',
            height: '34px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(255, 159, 0, 0.25)',
            transition: 'all 0.2s ease',
            outline: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.06)';
            e.currentTarget.style.background = '#f29100';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = '#ff9f00';
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '18px', height: '18px', strokeWidth: 3 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </article>
  );
}
