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

export default function ProductDetailModal({ product, onClose, onAddToCart }) {
  const { name, price, rating, category, discount, icon: ProductIcon } = product;
  const [activeGlow, setActiveGlow] = useState('gold');

  const currentGlow = GLOW_MODES[activeGlow];
  const specs = CATEGORY_SPECS[category] || CATEGORY_SPECS['Home & Living'];

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
          <div className="detail-visualizer-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
                {product.image ? (
                  <img src={product.image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '12px' }} />
                ) : (
                  <ProductIcon />
                )}
              </div>
            </div>

            {/* Glowing Color Controls */}
            <div className="glow-control-panel">
              <span className="form-label" style={{ display: 'block', marginBottom: '0.75rem', letterSpacing: '0.5px' }}>
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
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
              Discover elite lighting and design craftsmanship. Engineered using custom-grade premium materials, this high-end item is specifically built to complement modern home interiors while delivering exceptional efficiency and visual luxury.
            </p>

            {/* Pricing Section */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 600 }}>Elite Value</span>
                <span className="product-price" style={{ fontSize: '1.8rem', fontWeight: 800 }}>${price.toFixed(2)}</span>
              </div>
              <button 
                className="btn-primary" 
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                style={{
                  background: `linear-gradient(135deg, ${currentGlow.hex}, #fff)`,
                  boxShadow: `0 4px 15px rgba(${currentGlow.rgb}, 0.3)`,
                  color: '#000',
                  padding: '0.75rem 1.5rem'
                }}
              >
                Add To Cart
              </button>
            </div>

            {/* Spec Sheet Table */}
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Premium Technical Specifications</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {specs.map((spec, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <td style={{ padding: '0.6rem 0', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, width: '40%' }}>{spec.label}</td>
                      <td style={{ padding: '0.6rem 0', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Reviews Section */}
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Customer Feedback</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {MOCK_REVIEWS.map((review, index) => (
                  <div key={index} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.8rem' }}>
                      <strong style={{ color: 'var(--text-primary)' }}>{review.user}</strong>
                      <span style={{ color: 'var(--text-muted)' }}>{review.date}</span>
                    </div>
                    <div style={{ display: 'flex', color: currentGlow.hex, gap: '2px', marginBottom: '0.4rem' }}>
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <svg key={i} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'currentColor', width: '12px', height: '12px' }}>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>"{review.comment}"</p>
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
