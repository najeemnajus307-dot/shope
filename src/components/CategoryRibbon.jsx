import React from 'react';

// ==========================================
// CUSTOM FLIPKART STYLE FLAT VECTOR CATEGORY ICONS
// ==========================================

const AllIcon = () => (
  <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#2874f0" strokeWidth="2" style={{ transition: 'transform 0.3s ease' }}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const ElectronicsIcon = () => (
  <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#2874f0" strokeWidth="2" style={{ transition: 'transform 0.3s ease' }}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M7 20h10M12 16v4" strokeLinecap="round" />
  </svg>
);

const WearablesIcon = () => (
  <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#2874f0" strokeWidth="2" style={{ transition: 'transform 0.3s ease' }}>
    <circle cx="12" cy="12" r="6" />
    <path d="M12 2v4M12 18v4M9 6h6M9 18h6" strokeLinecap="round" />
  </svg>
);

const HomeLivingIcon = () => (
  <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#2874f0" strokeWidth="2" style={{ transition: 'transform 0.3s ease' }}>
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeLinejoin="round" />
    <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AudioIcon = () => (
  <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#2874f0" strokeWidth="2" style={{ transition: 'transform 0.3s ease' }}>
    <path d="M3 14c0-4.97 4.03-9 9-9s9 4.03 9 9" strokeLinecap="round" />
    <rect x="2" y="13" width="4" height="6" rx="2" />
    <rect x="18" y="13" width="4" height="6" rx="2" />
  </svg>
);

const CATEGORY_METADATA = {
  All: { label: 'All Products', icon: AllIcon, desc: 'Shop Everything' },
  Electronics: { label: 'Electronics', icon: ElectronicsIcon, desc: 'Smart Devices' },
  Wearables: { label: 'Wearables', icon: WearablesIcon, desc: 'Luxury Watches' },
  'Home & Living': { label: 'Home & Living', icon: HomeLivingIcon, desc: 'Bright Lights' },
  Audio: { label: 'Audio & Sound', icon: AudioIcon, desc: 'AeroBuds & Studio' }
};

export default function CategoryRibbon({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="flipkart-category-ribbon" style={{
      background: '#ffffff',
      borderBottom: '1px solid #e0e0e0',
      padding: '0.75rem 2rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2.5rem',
      flexWrap: 'wrap',
      zIndex: 10
    }}>
      {categories.map((cat) => {
        const meta = CATEGORY_METADATA[cat] || { label: cat, icon: AllIcon, desc: 'Explore' };
        const IconComponent = meta.icon;
        const isActive = selectedCategory === cat;

        return (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`ribbon-item ${isActive ? 'active' : ''}`}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              outline: 'none',
              padding: '0.25rem 0.75rem',
              borderRadius: '8px',
              transition: 'all 0.3s ease',
              minWidth: '95px'
            }}
          >
            {/* Visual Icon with hover scale */}
            <div className="ribbon-icon-container" style={{
              transform: isActive ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}>
              <IconComponent />
            </div>

            {/* Label */}
            <span style={{
              fontSize: '0.85rem',
              fontWeight: isActive ? 700 : 600,
              color: isActive ? '#2874f0' : '#212121',
              transition: 'color 0.3s ease'
            }}>
              {meta.label}
            </span>

            {/* Sub description */}
            <span style={{
              fontSize: '0.68rem',
              color: '#878787',
              fontWeight: 500,
              opacity: isActive ? 1 : 0.7
            }}>
              {meta.desc}
            </span>

            {/* Bottom active line indicator */}
            <div style={{
              width: isActive ? '32px' : '0px',
              height: '3px',
              backgroundColor: '#2874f0',
              borderRadius: '2px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              marginTop: '2px'
            }} />
          </button>
        );
      })}
    </div>
  );
}
