import React from 'react';

export default function Cart({ 
  isOpen, 
  cartItems, 
  onClose, 
  onUpdateQty, 
  onRemove, 
  onCheckout 
}) {
  
  // Calculate Flipkart Totals
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const totalOriginalPrice = cartItems.reduce((acc, item) => {
    const orig = item.discount > 0 ? (item.price / (1 - item.discount / 100)) : item.price;
    return acc + orig * item.quantity;
  }, 0);
  
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalDiscount = totalOriginalPrice - subtotal;
  const packagingFee = totalItemsCount > 0 ? 1.99 : 0;
  const grandTotal = subtotal + packagingFee;

  return (
    <div className={`cart-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      {/* Sidebar - Prevent clicks on sidebar from closing it */}
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="cart-header">
          <h2>Your <span>Cart</span></h2>
          <button className="btn-close" onClick={onClose} aria-label="Close cart sidebar">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Item List */}
        <div className="cart-items-container">
          {cartItems.length > 0 ? (
            cartItems.map((item) => {
              const ProductIcon = item.icon;
              return (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    {item.image ? (
                      <img src={item.image} alt={item.name} style={{ width: '85%', height: '85%', objectFit: 'contain', borderRadius: '4px' }} />
                    ) : ProductIcon ? (
                      <ProductIcon />
                    ) : null}
                  </div>
                  <div className="cart-item-info">
                    <h4 className="cart-item-title">{item.name}</h4>
                    <span className="cart-item-price">${item.price.toFixed(2)}</span>
                    <div className="cart-item-controls">
                      {/* Quantity Controls */}
                      <button className="btn-qty" onClick={() => onUpdateQty(item.id, -1)} aria-label="Decrease quantity">-</button>
                      <span className="qty-display">{item.quantity}</span>
                      <button className="btn-qty" onClick={() => onUpdateQty(item.id, 1)} aria-label="Increase quantity">+</button>
                    </div>
                  </div>
                  
                  {/* Remove Button */}
                  <button className="btn-remove" onClick={() => onRemove(item.id)} aria-label="Remove item from cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              );
            })
          ) : (
            <div className="cart-empty-state">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h3>Your cart is empty</h3>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Add some products from the catalog to get started.</p>
            </div>
          )}
        </div>

        {/* Footer with Flipkart-style Price Details */}
        {cartItems.length > 0 && (
          <div className="cart-footer" style={{ borderTop: '1px solid #e0e0e0', padding: '1.25rem 1.5rem', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="price-details-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', borderBottom: '1px dashed #e0e0e0', paddingBottom: '0.75rem', fontSize: '0.85rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#878787', textTransform: 'uppercase', marginBottom: '0.25rem', display: 'block' }}>Price Details</span>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#212121' }}>
                <span>Price ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})</span>
                <span>${totalOriginalPrice.toFixed(2)}</span>
              </div>
              
              {totalDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#388e3c', fontWeight: 600 }}>
                  <span>Discount</span>
                  <span>-${totalDiscount.toFixed(2)}</span>
                </div>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#212121' }}>
                <span>Delivery Charges</span>
                <span>
                  <span style={{ textDecoration: 'line-through', color: '#878787', marginRight: '0.25rem' }}>$5.00</span>
                  <span style={{ color: '#388e3c', fontWeight: 700 }}>FREE</span>
                </span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#212121' }}>
                <span>Secured Packaging Fee</span>
                <span>${packagingFee.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.1rem', fontWeight: 700, color: '#212121' }}>
              <span>Total Amount</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            {totalDiscount > 0 && (
              <span style={{ fontSize: '0.82rem', color: '#388e3c', fontWeight: 700, background: '#f5f9f5', padding: '0.45rem', borderRadius: '4px', textAlign: 'center', display: 'block' }}>
                🎉 You will save ${totalDiscount.toFixed(2)} on this order!
              </span>
            )}

            <button className="btn-checkout" onClick={onCheckout} style={{
              background: '#fb641b', /* Flipkart Reddish Orange */
              color: '#ffffff',
              border: 'none',
              padding: '0.85rem',
              borderRadius: '4px',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(251,100,27,0.25)',
              width: '100%',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'background 0.2s ease',
              marginTop: '0.25rem'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#e65313'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#fb641b'}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
