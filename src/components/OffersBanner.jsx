import React, { useState, useEffect } from 'react';

const SLIDES = [
  {
    id: 1,
    tagline: 'BIG BILLION LIGHTING DAYS',
    title: 'Up To 70% Off on Smart Lamps',
    description: 'Transform your home with Lumina Smart Lamps & Halo Ambient Backlights. Sale is Live!',
    badge: 'Limited Offer',
    gradient: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', // Premium Flipkart Deep Blue
    buttonText: 'Shop Deals Now'
  },
  {
    id: 2,
    tagline: 'LUXURY AUDIO EXTRAVAGANZA',
    title: 'Flat 15% Instant Discount',
    description: 'Immerse in pure acoustics with AeroBuds Pro & SoundWave Studio. High-fidelity audio guaranteed.',
    badge: 'Super Value',
    gradient: 'linear-gradient(135deg, #fb641b 0%, #ff8c00 100%)', // Premium Flipkart Orange
    buttonText: 'Explore Sound'
  },
  {
    id: 3,
    tagline: 'SMART LIFESTYLE UPGRADE',
    title: 'Save Big on Chronos Wearables',
    description: 'Premium Always-on AMOLED display watches & Nova compact slate mechanical keyboards.',
    badge: 'Top Picks',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', // Sleek Green
    buttonText: 'Buy Smart Tech'
  }
];

export default function OffersBanner({ onExploreClick }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % SLIDES.length);
  };

  return (
    <div className="offers-banner-slider" style={{
      maxWidth: '1400px',
      margin: '2rem auto 0 auto',
      padding: '0 2rem',
      position: 'relative',
      animation: 'fadeIn 0.5s ease-out'
    }}>
      <div className="slider-wrapper" style={{
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        position: 'relative',
        height: '240px',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.5s ease'
      }}>
        {/* Left Arrow Navigation */}
        <button
          onClick={handlePrev}
          style={{
            position: 'absolute',
            left: '1.25rem',
            zIndex: 15,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            color: '#212121',
            transition: 'all 0.2s ease',
            outline: 'none'
          }}
          title="Previous Offer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow Navigation */}
        <button
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: '1.25rem',
            zIndex: 15,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            color: '#212121',
            transition: 'all 0.2s ease',
            outline: 'none'
          }}
          title="Next Offer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slides rendering */}
        {SLIDES.map((slide, index) => {
          const isCurrent = activeIndex === index;
          return (
            <div
              key={slide.id}
              style={{
                position: 'absolute',
                inset: 0,
                background: slide.gradient,
                display: 'flex',
                alignItems: 'center',
                padding: '2rem 5rem',
                opacity: isCurrent ? 1 : 0,
                visibility: isCurrent ? 'visible' : 'hidden',
                transition: 'opacity 0.6s ease-in-out, visibility 0.6s ease-in-out',
                zIndex: isCurrent ? 10 : 1,
                color: '#ffffff'
              }}
            >
              {/* Slide Content */}
              <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '0.6rem', zIndex: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{
                    background: '#ffe500',
                    color: '#000000',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {slide.badge}
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: '1.5px' }}>
                    {slide.tagline}
                  </span>
                </div>
                
                <h2 style={{
                  fontSize: '2.1rem',
                  fontWeight: 800,
                  margin: 0,
                  lineHeight: 1.2,
                  fontFamily: "'Outfit', sans-serif"
                }}>
                  {slide.title}
                </h2>
                
                <p style={{
                  fontSize: '0.95rem',
                  opacity: 0.9,
                  lineHeight: 1.5,
                  margin: 0,
                  fontWeight: 500
                }}>
                  {slide.description}
                </p>

                <button
                  onClick={onExploreClick}
                  style={{
                    alignSelf: 'flex-start',
                    marginTop: '0.5rem',
                    background: '#ffe500', // Flipkart Yellow
                    color: '#212121',
                    border: 'none',
                    padding: '0.65rem 1.75rem',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {slide.buttonText}
                </button>
              </div>

              {/* Decorative Geometric Overlay for Premium Aesthetic */}
              <div style={{
                position: 'absolute',
                right: '5%',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '2px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'rotate(15deg)',
                pointerEvents: 'none'
              }}>
                <div style={{
                  width: '130px',
                  height: '130px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px dashed rgba(255,255,255,0.15)'
                }} />
              </div>
            </div>
          );
        })}

        {/* Carousel indicators dots */}
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '0.5rem',
          zIndex: 20
        }}>
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: activeIndex === index ? '#ffe500' : 'rgba(255, 255, 255, 0.4)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
