import React, { useState } from 'react';

export default function Checkout({ isOpen, cartItems, onClose, onClearCart, onPlaceOrder }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderDate, setOrderDate] = useState('');

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
  const totalOriginalPrice = cartItems.reduce((acc, item) => {
    const orig = item.discount > 0 ? (item.price / (1 - item.discount / 100)) : item.price;
    return acc + orig * item.quantity;
  }, 0);
  
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalDiscount = totalOriginalPrice - subtotal;
  const packagingFee = totalItemsCount > 0 ? 1.99 : 0;
  const grandTotal = subtotal + packagingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      const digits = value.replace(/\D/g, '');
      const groups = digits.match(/.{1,4}/g);
      formattedValue = groups ? groups.join(' ').substring(0, 19) : '';
    } else if (name === 'expiry') {
      let clean = value.replace(/[^\d/]/g, '');
      clean = clean.replace(/\/+/g, '/');
      if (clean.length > 2 && !clean.includes('/')) {
        clean = clean.substring(0, 2) + '/' + clean.substring(2);
      }
      formattedValue = clean.substring(0, 5);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 3);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Strict Field Validations
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Full Name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = 'Email Address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      tempErrors.email = 'Please enter a valid email address';
    }

    if (!formData.address.trim()) tempErrors.address = 'Delivery Address is required';

    const cardDigits = formData.cardNumber.replace(/\s/g, '');
    if (!formData.cardNumber) {
      tempErrors.cardNumber = 'Credit Card number is required';
    } else if (cardDigits.length !== 16) {
      tempErrors.cardNumber = 'Card number must be exactly 16 digits';
    }

    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!formData.expiry) {
      tempErrors.expiry = 'Expiry Date is required';
    } else {
      const match = formData.expiry.match(expiryRegex);
      if (!match) {
        tempErrors.expiry = 'Must be MM/YY format';
      } else {
        const month = parseInt(match[1]);
        const year = parseInt('20' + match[2]);
        const now = new Date();
        const curMonth = now.getMonth() + 1;
        const curYear = now.getFullYear();
        if (year < curYear || (year === curYear && month < curMonth)) {
          tempErrors.expiry = 'Card is expired';
        }
      }
    }

    if (!formData.cvv) {
      tempErrors.cvv = 'CVV is required';
    } else if (formData.cvv.length !== 3) {
      tempErrors.cvv = 'Must be exactly 3 digits';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    // Generate random premium order details
    const generatedId = 'SHP-' + Math.floor(100000 + Math.random() * 900000);
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    setOrderId(generatedId);
    setOrderDate(formattedDate);
    
    // Place order callback
    onPlaceOrder({
      id: generatedId,
      date: formattedDate,
      customer: {
        name: formData.name,
        email: formData.email,
        address: formData.address
      },
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total: grandTotal,
      status: 'Pending'
    });

    setIsSuccess(true);
  };

  const handleFinish = () => {
    setIsSuccess(false);
    onClearCart();
    onClose();
    // Reset form
    setFormData({
      name: '',
      email: '',
      address: '',
      cardNumber: '',
      expiry: '',
      cvv: ''
    });
    setErrors({});
  };

  return (
    <div className={`checkout-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        {!isSuccess && (
          <button 
            className="btn-close" 
            onClick={onClose} 
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}
            aria-label="Close checkout modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {!isSuccess ? (
          <>
            <div className="checkout-header">
              <h2>Checkout <span>Details</span></h2>
            </div>

            <form className="checkout-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  value={formData.name}
                  onChange={handleInputChange}
                  style={errors.name ? { borderColor: 'var(--danger)' } : {}}
                />
                {errors.name && <span style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.2rem', animation: 'fadeIn 0.2s ease-out' }}>{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="johndoe@example.com"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  value={formData.email}
                  onChange={handleInputChange}
                  style={errors.email ? { borderColor: 'var(--danger)' } : {}}
                />
                {errors.email && <span style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.2rem', animation: 'fadeIn 0.2s ease-out' }}>{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Delivery Address *</label>
                <input
                  type="text"
                  name="address"
                  placeholder="123 Luxury Avenue, Golden Hills"
                  className={`form-input ${errors.address ? 'error' : ''}`}
                  value={formData.address}
                  onChange={handleInputChange}
                  style={errors.address ? { borderColor: 'var(--danger)' } : {}}
                />
                {errors.address && <span style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.2rem', animation: 'fadeIn 0.2s ease-out' }}>{errors.address}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Credit Card Number *</label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="4111 2222 3333 4444"
                  className={`form-input ${errors.cardNumber ? 'error' : ''}`}
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  style={errors.cardNumber ? { borderColor: 'var(--danger)' } : {}}
                />
                {errors.cardNumber && <span style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.2rem', animation: 'fadeIn 0.2s ease-out' }}>{errors.cardNumber}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Expiry Date *</label>
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    className={`form-input ${errors.expiry ? 'error' : ''}`}
                    value={formData.expiry}
                    onChange={handleInputChange}
                    style={errors.expiry ? { borderColor: 'var(--danger)' } : {}}
                  />
                  {errors.expiry && <span style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.2rem', animation: 'fadeIn 0.2s ease-out' }}>{errors.expiry}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">CVV *</label>
                  <input
                    type="password"
                    name="cvv"
                    maxLength="3"
                    placeholder="123"
                    className={`form-input ${errors.cvv ? 'error' : ''}`}
                    value={formData.cvv}
                    onChange={handleInputChange}
                    style={errors.cvv ? { borderColor: 'var(--danger)' } : {}}
                  />
                  {errors.cvv && <span style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.2rem', animation: 'fadeIn 0.2s ease-out' }}>{errors.cvv}</span>}
                </div>
              </div>

              {/* Summary calculation display */}
              {/* Flipkart style Price Details summary box */}
              <div className="price-details-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', border: '1px solid #e0e0e0', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', background: '#f9f9f9', marginBottom: '1.25rem' }}>
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

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1rem', fontWeight: 700, color: '#212121', borderTop: '1px dashed #e0e0e0', paddingTop: '0.65rem', marginTop: '0.25rem' }}>
                  <span>Total Amount</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>

                {totalDiscount > 0 && (
                  <span style={{ fontSize: '0.78rem', color: '#388e3c', fontWeight: 700, marginTop: '0.25rem', display: 'block' }}>
                    🎉 You will save ${totalDiscount.toFixed(2)} on this order!
                  </span>
                )}
              </div>

              <button type="submit" className="btn-place-order" style={{ background: '#fb641b', color: '#ffffff', border: 'none', width: '100%', padding: '0.9rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px', boxShadow: '0 2px 4px rgba(251,100,27,0.25)' }}>
                Authorize Payment & Place Order
              </button>
            </form>
          </>
        ) : (
          <div className="success-screen" style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <div className="success-icon-container" style={{ background: '#388e3c', color: '#fff', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" style={{ width: '28px', height: '28px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="success-title" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#212121', textAlign: 'center', margin: '0 0 0.25rem 0' }}>Order Placed Successfully!</h2>
            <p className="success-message" style={{ fontSize: '0.9rem', color: '#878787', textAlign: 'center', margin: '0 0 1.5rem 0' }}>Your premium lights are on their way. Get ready to illuminate your space!</p>

            {/* Flipkart style delivery tracking workflow */}
            <div style={{ margin: '1.5rem 0', background: '#f9f9f9', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#878787', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Delivery Progress Tracker</span>
              
              {/* Tracker workflow line */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', margin: '0.5rem 1rem' }}>
                {/* Connecting bar */}
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '4px', background: '#e0e0e0', transform: 'translateY(-50%)', zIndex: 1 }} />
                <div style={{ position: 'absolute', top: '50%', left: 0, width: '66%', height: '4px', background: '#388e3c', transform: 'translateY(-50%)', zIndex: 2 }} />
                
                {/* Step 1 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', zIndex: 5 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#388e3c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900 }}>✔</div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#388e3c' }}>Ordered</span>
                </div>
                
                {/* Step 2 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', zIndex: 5 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#388e3c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900 }}>✔</div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#388e3c' }}>Shipped</span>
                </div>

                {/* Step 3 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', zIndex: 5 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#fb641b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900, boxShadow: '0 0 10px rgba(251,100,27,0.4)' }}>•</div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fb641b' }}>In Transit</span>
                </div>

                {/* Step 4 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', zIndex: 5 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#e0e0e0', color: '#878787', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900 }}>4</div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#878787' }}>Delivered</span>
                </div>
              </div>

              <div style={{ fontSize: '0.82rem', color: '#212121', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, borderTop: '1px solid #e0e0e0', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                <span style={{ fontSize: '1.2rem' }}>🚚</span>
                <span>Your package has left our Bengaluru hub and is on its way. Delivery expected within 2 to 3 business days.</span>
              </div>
            </div>
            
            {/* Dash border receipt */}
            <div className="receipt" style={{ background: '#ffffff', border: '1px dashed #cccccc', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.5rem' }}>
              <div className="receipt-header" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #e0e0e0', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                <div className="receipt-logo" style={{ fontSize: '1.15rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1, fontFamily: "'Outfit', sans-serif", fontWeight: 800 }}>
                  <div style={{ color: '#212121' }}>Bright<span style={{ color: '#2874f0' }}>House</span></div>
                </div>
                <div className="receipt-meta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '0.75rem', color: '#878787', gap: '2px' }}>
                  <span>ID: <strong>{orderId}</strong></span>
                  <span>{orderDate}</span>
                </div>
              </div>

              <div className="receipt-items" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderBottom: '1px dashed #e0e0e0', paddingBottom: '0.75rem', marginBottom: '0.75rem', fontSize: '0.82rem' }}>
                {cartItems.map(item => (
                  <div key={item.id} className="receipt-item-row" style={{ display: 'flex', justifyContent: 'space-between', color: '#212121' }}>
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="receipt-totals" style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.82rem', borderBottom: '1px dashed #e0e0e0', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                <div className="receipt-total-row" style={{ display: 'flex', justifyContent: 'space-between', color: '#878787' }}>
                  <span>Price ({totalItemsCount} items)</span>
                  <span>${totalOriginalPrice.toFixed(2)}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="receipt-total-row" style={{ display: 'flex', justifyContent: 'space-between', color: '#388e3c' }}>
                    <span>Discount</span>
                    <span>-${totalDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="receipt-total-row" style={{ display: 'flex', justifyContent: 'space-between', color: '#878787' }}>
                  <span>Secured Packaging Fee</span>
                  <span>${packagingFee.toFixed(2)}</span>
                </div>
                <div className="receipt-total-row grand" style={{ display: 'flex', justifyContent: 'space-between', color: '#212121', fontSize: '0.95rem', fontWeight: 800 }}>
                  <span>Total Paid</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="receipt-footer-text" style={{ fontSize: '0.7rem', color: '#878787', textAlign: 'center', letterSpacing: '0.5px' }}>
                --- Verified Digital Invoice ---
              </div>
            </div>

            <button className="btn-checkout" onClick={handleFinish} style={{ background: '#2874f0', color: '#ffffff', border: 'none', width: '100%', padding: '0.85rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px', boxShadow: '0 2px 4px rgba(40,116,240,0.2)' }}>
              Return to Catalog
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
