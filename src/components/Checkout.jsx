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

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const grandTotal = subtotal + tax;

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
              <div className="order-summary-box">
                <div className="order-summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="order-summary-row">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="order-summary-row total">
                  <span>Grand Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button type="submit" className="btn-place-order">
                Authorize Payment & Place Order
              </button>
            </form>
          </>
        ) : (
          <div className="success-screen">
            <div className="success-icon-container">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="success-title">Order Placed Successfully!</h2>
            <p className="success-message">Thank you for your purchase. Your premium items are being prepared.</p>

            {/* Dash border receipt */}
            <div className="receipt">
              <div className="receipt-header">
                <div className="receipt-logo" style={{ fontSize: '1.25rem', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
                  Bright<span>House</span>
                  <span style={{ fontSize: '0.6rem', letterSpacing: '1.5px', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '1px', fontWeight: 600 }}>Lights & LED</span>
                </div>
                <div className="receipt-meta">
                  <span>ID: {orderId}</span>
                  <span>{orderDate}</span>
                </div>
              </div>

              <div className="receipt-items">
                {cartItems.map(item => (
                  <div key={item.id} className="receipt-item-row">
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="receipt-totals">
                <div className="receipt-total-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="receipt-total-row">
                  <span>Sales Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="receipt-total-row grand">
                  <span>Total Paid</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="receipt-footer-text">
                --- Verified Digital Invoice ---
              </div>
            </div>

            <button className="btn-checkout" onClick={handleFinish}>
              Return to Catalog
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
