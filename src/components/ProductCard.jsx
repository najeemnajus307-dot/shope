import React from 'react';

export default function ProductCard({ product, onAddToCart, onProductClick }) {
  const { name, price, rating, category, discount, icon: ProductIcon } = product;

  return (
    <article 
      className="product-card" 
      onClick={() => onProductClick && onProductClick(product)}
      style={{ cursor: 'pointer' }}
    >
      {/* Product Tag Badge */}
      {discount > 0 && <div className="product-card-badge">-{discount}% OFF</div>}

      {/* Wishlist Button (Aesthetics) */}
      <button 
        className="product-card-wishlist" 
        onClick={(e) => e.stopPropagation()} 
        aria-label="Add to wishlist"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Image container displaying product SVG icon or Custom Image */}
      <div className="product-image-container">
        {product.image ? (
          <img src={product.image} alt={name} className="product-image" style={{ width: '85%', height: '85%', objectFit: 'contain', borderRadius: '8px' }} />
        ) : (
          <ProductIcon />
        )}
      </div>

      {/* Meta (Category & Rating) */}
      <div className="product-meta">
        <span className="product-category-text">{category}</span>
        <span>•</span>
        <div className="product-rating">
          <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>{rating}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="product-title">{name}</h3>

      {/* Price & Action */}
      <div className="product-footer">
        <span className="product-price">${price.toFixed(2)}</span>
        <button 
          className="btn-add-cart" 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }} 
          aria-label={`Add ${name} to cart`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </article>
  );
}
