import React from 'react';

export default function Cart({ 
  isOpen, 
  cartItems, 
  onClose, 
  onUpdateQty, 
  onRemove, 
  onCheckout 
}) {
  
  // Calculate Totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% Tax
  const grandTotal = subtotal + tax;

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
                    {ProductIcon && <ProductIcon />}
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

        {/* Footer with checkout summary */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-totals">
              <div className="cart-total-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-total-row">
                <span>Est. Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="cart-total-row grand-total">
                <span>Grand Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            <button className="btn-checkout" onClick={onCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
