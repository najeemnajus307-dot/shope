import React, { useState } from 'react';

const GLOW_MODES = {
  gold: { label: 'Amber Gold', hex: '#f59e0b', rgb: '245, 158, 11' },
  green: { label: 'Cyber Green', hex: '#10b981', rgb: '16, 185, 129' },
  blue: { label: 'Laser Blue', hex: '#3b82f6', rgb: '59, 130, 246' },
  red: { label: 'Neon Red', hex: '#ef4444', rgb: '239, 68, 68' }
};

// Advanced Specifications by Category
const CATEGORY_SPECS = {
  Wearables: [
    { label: 'Battery Life', value: 'Up to 7 Days (Active Use)' },
    { label: 'Display Panel', value: '1.43" Curved AMOLED, Always-on' },
    { label: 'Connectivity', value: 'Bluetooth 5.2 LE, NFC Supported' },
    { label: 'Weight & Casing', value: '42g, Aerospace Aluminum Alloy' },
    { label: 'Water Rating', value: '5 ATM Dust & Water Resistant' }
  ],
  Audio: [
    { label: 'Acoustic Driver', value: '40mm Custom High-Res Neodymium' },
    { label: 'Noise Cancellation', value: 'Hybrid Active ANC (45dB Reduction)' },
    { label: 'Battery Reserve', value: 'Up to 40 Hours (ANC On) / 60h Off' },
    { label: 'Connectivity', value: 'Bluetooth 5.3 Multi-Point, aptX' },
    { label: 'Frequency Range', value: '10Hz - 40,000Hz Ultra-Wideband' }
  ],
  'Home & Living': [
    { label: 'Light Output', value: '800 Lumens Peak Brightness' },
    { label: 'Power Draw', value: '9W (Equivalent to 60W Incandescent)' },
    { label: 'LED Lifespan', value: '25,000 Hours (Approx. 10 Years)' },
    { label: 'Color Temp', value: '2200K (Warm Warmth) to 6500K (Daylight)' },
    { label: 'Smart Sync', value: 'Google Home, Alexa & Wi-Fi Enabled' }
  ],
  Electronics: [
    { label: 'Input Latency', value: 'Less than 1.2ms Response Time' },
    { label: 'Switch Switches', value: 'Hot-Swappable Mechanical Tactile Gold' },
    { label: 'Power Reserve', value: 'Up to 200 Hours (LED Off) / 30h On' },
    { label: 'Keycaps Layout', value: 'Double-Shot PBT, 75% Compact Profile' },
    { label: 'Chassis Material', value: 'CNC Anodized Slate Shell' }
  ]
};

// Mock Reviews for Products
const MOCK_REVIEWS = [
  { user: 'Sidharth K.', rating: 5, comment: 'Absolutely brilliant build quality. The glow ambient is so immersive!', date: 'May 20, 2026' },
  { user: 'Amina P.', rating: 4, comment: 'Gorgeous aesthetics. Battery life matches specifications perfectly.', date: 'May 18, 2026' }
];

export default function ProductDetailModal({ product, onClose, onAddToCart, onBuyNow, onAddReview }) {
  const { name, price, rating, category, discount, icon: ProductIcon } = product;
  const [activeGlow, setActiveGlow] = useState('gold');
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Flipkart Functional States
  const [pincode, setPincode] = useState('');
  const [deliveryMsg, setDeliveryMsg] = useState('');
  const [isPincodeChecked, setIsPincodeChecked] = useState(false);

  // Review & Rating States
  const [newRating, setNewRating] = useState(5);
  const [newUser, setNewUser] = useState('');
  const [newComment, setNewComment] = useState('');

  const currentGlow = GLOW_MODES[activeGlow];
  const specs = CATEGORY_SPECS[category] || CATEGORY_SPECS['Home & Living'];

  const imagesList = product.images && product.images.length > 0 
    ? product.images 
    : (product.image ? [product.image] : []);

  // Pincode handler
  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      alert("Please enter a valid 6-digit numeric Pincode.");
      return;
    }
    
    // Calculate delivery date in 2 to 4 days based on pincode digit
    const daysToAdd = (parseInt(pincode[0]) % 3) + 2; 
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);
    const dateOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    const dateStr = deliveryDate.toLocaleDateString('en-US', dateOptions);

    setDeliveryMsg(`Delivery by ${dateStr} | FREE Delivery`);
    setIsPincodeChecked(true);
  };

  // Review submit handler
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newUser.trim() || !newComment.trim()) {
      alert("Please fill in your name and review text.");
      return;
    }
    
    const reviewObj = {
      user: newUser.trim(),
      rating: newRating,
      comment: newComment.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    if (onAddReview) {
      onAddReview(product.id, reviewObj);
    }
    
    // Reset Form
    setNewUser('');
    setNewComment('');
    setNewRating(5);
  };

  return (
    <div className="checkout-overlay active" onClick={onClose} style={{ zIndex: 150 }}>
      <div 
        className="checkout-modal product-detail-modal" 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '850px',
          padding: '2.5rem',
          border: `1px solid rgba(${currentGlow.rgb}, 0.25)`,
          boxShadow: `0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(${currentGlow.rgb}, 0.2)`
        }}
      >
        {/* Close Button */}
        <button 
          className="btn-close" 
          onClick={onClose} 
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', border: `1px solid rgba(${currentGlow.rgb}, 0.3)`, color: currentGlow.hex }}
          aria-label="Close details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="product-detail-columns" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.2fr', gap: '2.5rem', marginTop: '0.5rem' }}>
          
          {/* Left Column: Visualizer Box */}
          <div className="detail-visualizer-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div 
              className="product-image-container visualizer-box" 
              style={{ 
                aspectRatio: '1',
                borderRadius: '20px', 
                background: `radial-gradient(circle, rgba(${currentGlow.rgb}, 0.08) 0%, rgba(255, 255, 255, 0.01) 80%)`,
                border: `1px solid rgba(${currentGlow.rgb}, 0.15)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                transition: 'all 0.5s ease',
                overflow: 'hidden'
              }}
            >
              {discount > 0 && <div className="product-card-badge" style={{ position: 'absolute', top: '1rem', left: '1rem', background: currentGlow.hex, color: '#000' }}>-{discount}% OFF</div>}
              
              {/* Pulsing Visual Glow Filter */}
              <div 
                style={{ 
                  width: '75%', 
                  height: '75%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  filter: `drop-shadow(0 0 20px rgba(${currentGlow.rgb}, 0.75))`,
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: 'scale(1.05)'
                }}
              >
                {imagesList.length > 0 ? (
                  <img src={imagesList[activeImgIndex]} alt={name} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '12px' }} />
                ) : (
                  <ProductIcon />
                )}
              </div>
            </div>

            {/* Image Carousel Selectors */}
            {imagesList.length > 1 && (
              <div className="carousel-thumbnails" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', margin: '0.25rem 0' }}>
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: activeImgIndex === idx ? `2px solid ${currentGlow.hex}` : '1px solid var(--glass-border)',
                      padding: 0,
                      background: '#070a13',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: activeImgIndex === idx ? `0 0 8px rgba(${currentGlow.rgb}, 0.4)` : 'none'
                    }}
                  >
                    <img src={img} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </button>
                ))}
              </div>
            )}

            {/* Glowing Color Controls */}
            <div className="glow-control-panel">
              <span className="form-label" style={{ display: 'block', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>
                LIVE PREVIEW: <strong style={{ color: currentGlow.hex }}>{currentGlow.label}</strong>
              </span>
              <div className="glow-selectors" style={{ display: 'flex', gap: '0.75rem' }}>
                {Object.entries(GLOW_MODES).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => setActiveGlow(key)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: item.hex,
                      border: activeGlow === key ? '3px solid #fff' : '2px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: activeGlow === key ? `0 0 15px ${item.hex}` : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                    aria-label={`Switch preview color to ${item.label}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Descriptions & Specification tables */}
          <div className="detail-meta-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '520px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            <div>
              <span className="product-category-text" style={{ textTransform: 'uppercase', fontSize: '0.75rem', color: currentGlow.hex, fontWeight: 700, letterSpacing: '1.5px' }}>{category}</span>
              <h2 className="product-title" style={{ fontSize: '2rem', margin: '0.25rem 0 0.5rem 0', fontWeight: 800, fontFamily: 'var(--font-display)' }}>{name}</h2>
              
              <div className="product-meta" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="product-rating" style={{ color: currentGlow.hex }}>
                  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'currentColor', width: '16px', height: '16px' }}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', marginLeft: '4px' }}>{rating}</span>
                </div>
                <span style={{ opacity: 0.3 }}>|</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Verified Customer Reviews</span>
              </div>
            </div>

             {/* Description */}
            <p style={{ color: '#212121', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
              Discover elite lighting and design craftsmanship. Engineered using custom-grade premium materials, this high-end item is specifically built to complement modern home interiors while delivering exceptional efficiency and visual luxury.
            </p>

            {/* Flipkart style Bank Offers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', background: '#fff', border: '1px solid #e0e0e0', padding: '1rem', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#212121', display: 'block', marginBottom: '0.25rem' }}>Available Bank Offers</span>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.8rem', color: '#212121' }}>
                <span style={{ color: '#388e3c', fontWeight: 900 }}>🏷️</span>
                <span><strong>Bank Offer:</strong> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card. <a href="#" onClick={e=>e.preventDefault()} style={{ color: '#2874f0', textDecoration: 'none', fontWeight: 700 }}>T&C</a></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.8rem', color: '#212121' }}>
                <span style={{ color: '#388e3c', fontWeight: 900 }}>🏷️</span>
                <span><strong>Bank Offer:</strong> 10% Instant Discount on HDFC Bank Credit Cards on transactions of $100+. <a href="#" onClick={e=>e.preventDefault()} style={{ color: '#2874f0', textDecoration: 'none', fontWeight: 700 }}>T&C</a></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.8rem', color: '#212121' }}>
                <span style={{ color: '#388e3c', fontWeight: 900 }}>🏷️</span>
                <span><strong>Special Price:</strong> Get extra $10 off (price inclusive of cashback discounts). <a href="#" onClick={e=>e.preventDefault()} style={{ color: '#2874f0', textDecoration: 'none', fontWeight: 700 }}>T&C</a></span>
              </div>
            </div>

            {/* Pricing Section - Flipkart Double Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: '#f9f9f9', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e0e0e0', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#878787', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Special Price Value</span>
                  <span className="product-price" style={{ fontSize: '2rem', fontWeight: 800, color: '#212121' }}>${price.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.85rem', color: '#878787', textDecoration: 'line-through', marginRight: '0.5rem' }}>
                      ${(price / (1 - discount/100)).toFixed(2)}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#388e3c', fontWeight: 700 }}>
                      {discount}% Off
                    </span>
                  </div>
                )}
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
                {/* ADD TO CART - Orange */}
                <button 
                  className="btn-primary" 
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  style={{
                    background: '#ff9f00', /* Flipkart Orange */
                    boxShadow: '0 2px 4px rgba(255,159,0,0.2)',
                    color: '#ffffff',
                    padding: '0.85rem 1rem',
                    borderRadius: '4px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f29100'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#ff9f00'}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add To Cart
                </button>

                {/* BUY NOW - Reddish Orange */}
                <button 
                  className="btn-primary" 
                  onClick={() => {
                    if (onBuyNow) onBuyNow(product);
                  }}
                  style={{
                    background: '#fb641b', /* Flipkart Reddish-Orange */
                    boxShadow: '0 2px 4px rgba(251,100,27,0.2)',
                    color: '#ffffff',
                    padding: '0.85rem 1rem',
                    borderRadius: '4px',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#e65313'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#fb641b'}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Buy Now
                </button>
              </div>
            </div>

            {/* Pincode Estimator */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: '#ffffff', border: '1px solid #e0e0e0', padding: '1rem', borderRadius: '8px', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#212121' }}>Delivery & Shipping Pincode</span>
              <form onSubmit={handlePincodeCheck} style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  placeholder="Enter Delivery Pincode (e.g. 673001)" 
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  style={{
                    flex: 1,
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #cccccc',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    outline: 'none',
                    color: '#212121',
                    background: '#ffffff'
                  }}
                />
                <button 
                  type="submit" 
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#2874f0',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  Check
                </button>
              </form>
              {isPincodeChecked && (
                <div style={{ fontSize: '0.82rem', color: '#212121', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, animation: 'fadeIn 0.2s ease-out' }}>
                  <span style={{ color: '#388e3c' }}>✔</span>
                  <span>{deliveryMsg}</span>
                </div>
              )}
            </div>

            {/* Spec Sheet Table */}
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#212121', marginBottom: '0.75rem', borderBottom: '1px solid #e0e0e0', paddingBottom: '0.5rem' }}>Premium Technical Specifications</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {specs.map((spec, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                      <td style={{ padding: '0.6rem 0', fontSize: '0.85rem', color: '#878787', fontWeight: 600, width: '40%' }}>{spec.label}</td>
                      <td style={{ padding: '0.6rem 0', fontSize: '0.85rem', color: '#212121', fontWeight: 500 }}>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Reviews Section */}
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#212121', marginBottom: '0.75rem', borderBottom: '1px solid #e0e0e0', paddingBottom: '0.5rem' }}>Customer Feedback</h4>
              
              {/* Add Review Form */}
              <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', background: '#f9f9f9', padding: '1rem', borderRadius: '8px', border: '1px solid #e0e0e0', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#212121' }}>Write a Customer Review</span>
                
                {/* Clickable Star Rating selection */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#878787', fontWeight: 600 }}>Select Rating:</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', outline: 'none', color: star <= newRating ? '#ffe500' : '#e0e0e0' }}
                        title={`${star} Star`}
                      >
                        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'currentColor', width: '18px', height: '18px' }}>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
                  <input 
                    type="text" 
                    placeholder="Your Name (e.g. Zuhair M.)"
                    value={newUser}
                    onChange={(e) => setNewUser(e.target.value)}
                    style={{ padding: '0.45rem 0.75rem', border: '1px solid #cccccc', borderRadius: '4px', fontSize: '0.82rem', outline: 'none', background: '#ffffff', color: '#212121' }}
                    required
                  />
                  <textarea 
                    placeholder="Share your experience review..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={2}
                    style={{ padding: '0.45rem 0.75rem', border: '1px solid #cccccc', borderRadius: '4px', fontSize: '0.82rem', outline: 'none', resize: 'none', fontFamily: 'inherit', background: '#ffffff', color: '#212121' }}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  style={{
                    alignSelf: 'flex-start',
                    background: '#2874f0',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.45rem 1.25rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(40,116,240,0.2)',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#1254c4'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#2874f0'}
                >
                  Submit Review
                </button>
              </form>

              {/* Reviews List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {(product.reviews && product.reviews.length > 0 ? product.reviews : MOCK_REVIEWS).map((review, index) => (
                  <div key={index} style={{ background: 'rgba(0,0,0,0.01)', border: '1px solid #e0e0e0', padding: '0.75rem', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.8rem' }}>
                      <strong style={{ color: '#212121' }}>{review.user}</strong>
                      <span style={{ color: '#878787' }}>{review.date}</span>
                    </div>
                    <div style={{ display: 'flex', color: '#ffe500', gap: '2px', marginBottom: '0.4rem' }}>
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <svg key={i} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'currentColor', width: '12px', height: '12px' }}>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#212121', lineHeight: 1.4 }}>"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
