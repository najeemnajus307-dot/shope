import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import ProductDetailModal from './components/ProductDetailModal';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

// ==========================================
// PREMIUM INLINE PRODUCT VECTOR SVG ICONS
// ==========================================

const WatchIcon = () => (
  <svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="42" fill="rgba(245, 158, 11, 0.05)" stroke="#f59e0b" strokeWidth="2.5" />
    <circle cx="60" cy="60" r="34" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
    {/* Watch Strap */}
    <rect x="48" y="2" width="24" height="16" rx="2" fill="#0f172a" stroke="#d97706" strokeWidth="2" />
    <rect x="48" y="102" width="24" height="16" rx="2" fill="#0f172a" stroke="#d97706" strokeWidth="2" />
    {/* Ticks */}
    <line x1="60" y1="23" x2="60" y2="28" stroke="#fcd34d" strokeWidth="2" />
    <line x1="60" y1="97" x2="60" y2="92" stroke="#fcd34d" strokeWidth="2" />
    <line x1="23" y1="60" x2="28" y2="60" stroke="#fcd34d" strokeWidth="2" />
    <line x1="97" y1="60" x2="92" y2="60" stroke="#fcd34d" strokeWidth="2" />
    {/* Hands */}
    <line x1="60" y1="60" x2="60" y2="40" stroke="#fcd34d" strokeWidth="3" strokeLinecap="round" />
    <line x1="60" y1="60" x2="78" y2="60" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="60" cy="60" r="4" fill="#000" stroke="#fcd34d" strokeWidth="2" />
    {/* Luxury Details */}
    <path d="M50 48L60 38L70 48" fill="none" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="2" />
  </svg>
);

const AudioIcon = () => (
  <svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    {/* Headband */}
    <path d="M25 65C25 35 40 20 60 20C80 20 95 35 95 65" fill="none" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
    <path d="M28 65C28 38 42 24 60 24C78 24 92 38 92 65" fill="none" stroke="#0f172a" strokeWidth="2" />
    {/* Earcups */}
    <rect x="16" y="55" width="16" height="30" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2.5" />
    <rect x="88" y="55" width="16" height="30" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2.5" />
    {/* Metallic accents */}
    <rect x="22" y="62" width="4" height="16" rx="1" fill="#fcd34d" />
    <rect x="94" y="62" width="4" height="16" rx="1" fill="#fcd34d" />
    {/* Decorative Waves */}
    <path d="M5 60Q10 50 12 70" fill="none" stroke="rgba(245,158,11,0.2)" strokeWidth="2" strokeLinecap="round" />
    <path d="M115 60Q110 50 108 70" fill="none" stroke="rgba(245,158,11,0.2)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const KeyboardIcon = () => (
  <svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    {/* Board Base */}
    <rect x="10" y="38" width="100" height="44" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="3" />
    {/* Keycaps */}
    <rect x="18" y="46" width="10" height="8" rx="1.5" fill="#334155" stroke="#fcd34d" strokeWidth="1" />
    <rect x="32" y="46" width="10" height="8" rx="1.5" fill="#334155" stroke="#fcd34d" strokeWidth="1" />
    <rect x="46" y="46" width="10" height="8" rx="1.5" fill="#334155" stroke="#fcd34d" strokeWidth="1" />
    <rect x="60" y="46" width="10" height="8" rx="1.5" fill="#334155" stroke="#fcd34d" strokeWidth="1" />
    <rect x="74" y="46" width="10" height="8" rx="1.5" fill="#334155" stroke="#fcd34d" strokeWidth="1" />
    <rect x="88" y="46" width="14" height="8" rx="1.5" fill="#d97706" />

    <rect x="18" y="58" width="14" height="8" rx="1.5" fill="#d97706" />
    <rect x="36" y="58" width="10" height="8" rx="1.5" fill="#334155" stroke="#fcd34d" strokeWidth="1" />
    <rect x="50" y="58" width="10" height="8" rx="1.5" fill="#334155" stroke="#fcd34d" strokeWidth="1" />
    <rect x="64" y="58" width="10" height="8" rx="1.5" fill="#334155" stroke="#fcd34d" strokeWidth="1" />
    <rect x="78" y="58" width="10" height="8" rx="1.5" fill="#334155" stroke="#fcd34d" strokeWidth="1" />
    <rect x="92" y="58" width="10" height="8" rx="1.5" fill="#334155" stroke="#fcd34d" strokeWidth="1" />

    <rect x="18" y="70" width="12" height="8" rx="1.5" fill="#334155" stroke="#fcd34d" strokeWidth="1" />
    <rect x="34" y="70" width="48" height="8" rx="2" fill="#f59e0b" />
    <rect x="86" y="70" width="8" height="8" rx="1.5" fill="#334155" stroke="#fcd34d" strokeWidth="1" />
    <rect x="96" y="70" width="6" height="8" rx="1.5" fill="#334155" stroke="#fcd34d" strokeWidth="1" />
  </svg>
);

const LampIcon = () => (
  <svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    {/* Glow background rays */}
    <circle cx="60" cy="50" r="30" fill="rgba(245, 158, 11, 0.12)" filter="blur(6px)" />
    <line x1="60" y1="10" x2="60" y2="5" stroke="rgba(245,158,11,0.5)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="20" y1="50" x2="10" y2="50" stroke="rgba(245,158,11,0.5)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="100" y1="50" x2="110" y2="50" stroke="rgba(245,158,11,0.5)" strokeWidth="2.5" strokeLinecap="round" />
    {/* Bulb body */}
    <path d="M42 50C42 35 48 24 60 24C72 24 78 35 78 50C78 62 70 70 68 76H52C50 70 42 62 42 50Z" fill="#1e293b" stroke="#f59e0b" strokeWidth="3" />
    {/* Bulb filaments */}
    <path d="M52 50Q60 40 60 62" fill="none" stroke="#fcd34d" strokeWidth="2" />
    <path d="M68 50Q60 40 60 62" fill="none" stroke="#fcd34d" strokeWidth="2" />
    {/* Metallic Thread base */}
    <rect x="54" y="76" width="12" height="12" rx="2" fill="#334155" stroke="#d97706" strokeWidth="2" />
    <rect x="57" y="88" width="6" height="4" fill="#fcd34d" />
  </svg>
);

const BudsIcon = () => (
  <svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    {/* Charger Case Open */}
    <rect x="28" y="44" width="64" height="52" rx="16" fill="#0f172a" stroke="#f59e0b" strokeWidth="3" />
    <path d="M28 54H92" stroke="#d97706" strokeWidth="2.5" />
    {/* Right Bud */}
    <circle cx="45" cy="34" r="10" fill="#1e293b" stroke="#fcd34d" strokeWidth="2" />
    <path d="M45 34C45 42 42 46 42 48" stroke="#fcd34d" strokeWidth="2" strokeLinecap="round" />
    {/* Left Bud */}
    <circle cx="75" cy="34" r="10" fill="#1e293b" stroke="#fcd34d" strokeWidth="2" />
    <path d="M75 34C75 42 78 46 78 48" stroke="#fcd34d" strokeWidth="2" strokeLinecap="round" />
    {/* Charge Light indicator */}
    <circle cx="60" cy="74" r="3" fill="#10b981" />
  </svg>
);

const LightsIcon = () => (
  <svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    {/* Wavy neon glow strip */}
    <path d="M20 70Q35 30 60 70T100 30" fill="none" stroke="rgba(245, 158, 11, 0.15)" strokeWidth="14" strokeLinecap="round" />
    <path d="M20 70Q35 30 60 70T100 30" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
    <path d="M20 70Q35 30 60 70T100 30" fill="none" stroke="#fcd34d" strokeWidth="1.5" strokeLinecap="round" />
    {/* Floating stars */}
    <polygon points="30,25 33,31 40,31 35,35 37,42 30,38 23,42 25,35 20,31 27,31" fill="#fcd34d" />
    <polygon points="90,75 92,79 97,79 93,82 95,87 90,84 85,87 87,82 83,79 88,79" fill="#f59e0b" />
  </svg>
);

// ==========================================
// INITIAL CATALOG DATA
// ==========================================
const INITIAL_CATALOG = [
  {
    id: 1,
    name: "Chronos watch",
    category: "Wearables",
    price: 299.99,
    rating: 4.9,
    discount: 15,
    icon: WatchIcon
  },
  {
    id: 2,
    name: "AeroBuds Pro",
    category: "Audio",
    price: 149.50,
    rating: 4.8,
    discount: 0,
    icon: BudsIcon
  },
  {
    id: 3,
    name: "Lumina Smart Lamp",
    category: "Home & Living",
    price: 79.00,
    rating: 4.7,
    discount: 0,
    icon: LampIcon
  },
  {
    id: 4,
    name: "Nova Wireless Keyboard",
    category: "Electronics",
    price: 129.99,
    rating: 4.6,
    discount: 10,
    icon: KeyboardIcon
  },
  {
    id: 5,
    name: "SoundWave Studio",
    category: "Audio",
    price: 349.00,
    rating: 4.9,
    discount: 0,
    icon: AudioIcon
  },
  {
    id: 6,
    name: "Halo Ambient Backlights",
    category: "Home & Living",
    price: 49.99,
    rating: 4.5,
    discount: 0,
    icon: LightsIcon
  }
];

const CATEGORIES = ["All", "Electronics", "Wearables", "Home & Living", "Audio"];

const INITIAL_ORDERS = [
  {
    id: 'SHP-918273',
    date: 'May 24, 2026, 09:30 AM',
    customer: {
      name: 'Zuhair Muhammed',
      email: 'zuhair@example.com',
      address: 'Bright House, Calicut, Kerala'
    },
    items: [
      { id: 3, name: 'Lumina Smart Lamp', price: 79.00, quantity: 2 }
    ],
    total: 170.64,
    status: 'Delivered'
  }
];

export default function App() {
  // App States with Local Storage Persistence
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('bh_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map(p => {
          let iconComponent = LampIcon;
          if (p.category === 'Wearables') iconComponent = WatchIcon;
          else if (p.category === 'Audio') iconComponent = AudioIcon;
          else if (p.category === 'Electronics') iconComponent = KeyboardIcon;
          else if (p.category === 'Home & Living') iconComponent = LampIcon;
          return { ...p, icon: iconComponent };
        });
      } catch (e) {
        return INITIAL_CATALOG;
      }
    }
    return INITIAL_CATALOG;
  });

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('bh_cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map(item => {
          let iconComponent = LampIcon;
          if (item.category === 'Wearables') iconComponent = WatchIcon;
          else if (item.category === 'Audio') iconComponent = AudioIcon;
          else if (item.category === 'Electronics') iconComponent = KeyboardIcon;
          else if (item.category === 'Home & Living') iconComponent = LampIcon;
          return { ...item, icon: iconComponent };
        });
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('bh_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_ORDERS;
      }
    }
    return INITIAL_ORDERS;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAdminView, setIsAdminView] = useState(false);

  // Sorting & Filter states
  const [sortBy, setSortBy] = useState('recommended');
  const [priceRange, setPriceRange] = useState([0, 500]);

  // Product Details Modal state
  const [detailProduct, setDetailProduct] = useState(null);

  // Synchronize products to Local Storage
  useEffect(() => {
    const serialized = products.map(({ icon, ...rest }) => rest);
    localStorage.setItem('bh_products', JSON.stringify(serialized));
  }, [products]);

  // Synchronize cartItems to Local Storage
  useEffect(() => {
    const serialized = cartItems.map(({ icon, ...rest }) => rest);
    localStorage.setItem('bh_cart', JSON.stringify(serialized));
  }, [cartItems]);

  // Synchronize orders to Local Storage
  useEffect(() => {
    localStorage.setItem('bh_orders', JSON.stringify(orders));
  }, [orders]);

  // Add Item to Cart
  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const exists = prevItems.find(item => item.id === product.id);
      if (exists) {
        return prevItems.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    // Open the cart automatically so user gets instant visual confirmation!
    setIsCartOpen(true);
  };

  // Update Item Quantity in Cart
  const handleUpdateQty = (itemId, delta) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === itemId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  // Remove Item from Cart
  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Clear Cart after successful checkout completion
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Place Order (Triggered by customer checkout)
  const handlePlaceOrder = (newOrder) => {
    setOrders(prevOrders => [newOrder, ...prevOrders]);
  };

  // Admin Add Product to Catalog
  const handleAddProduct = (newProd) => {
    // Helper to assign icons based on category
    let assignedIcon = LampIcon; // Default
    if (newProd.category === 'Wearables') assignedIcon = WatchIcon;
    else if (newProd.category === 'Audio') assignedIcon = AudioIcon;
    else if (newProd.category === 'Electronics') assignedIcon = KeyboardIcon;
    else if (newProd.category === 'Home & Living') assignedIcon = LampIcon;

    const addedItem = {
      id: Date.now(),
      name: newProd.name,
      category: newProd.category,
      price: newProd.price,
      discount: newProd.discount,
      rating: 5.0, // Brand new items start with top rating!
      icon: assignedIcon,
      image: newProd.image
    };

    setProducts(prevProducts => [...prevProducts, addedItem]);
  };

  // Admin Delete Product
  const handleDeleteProduct = (productId) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  };

  // Admin Update Order Status
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // Click scroll down handler
  const handleExploreCatalog = () => {
    const section = document.getElementById('products');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter and Sort Catalog dynamically
  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // recommended / default
    });

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="app-container">
      {/* Premium Header Nav Bar */}
      <Header
        cartCount={cartTotalCount}
        onCartOpen={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isAdminView={isAdminView}
        onToggleAdminView={() => setIsAdminView(!isAdminView)}
      />

      {/* Conditionally Render Shop or Admin Dashboard */}
      {!isAdminView ? (
        <>
          {/* Sleek Hero landing */}
          <Hero onShopNowClick={handleExploreCatalog} />

          {/* Catalog lists and filters */}
          <ProductList
            products={filteredProducts}
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onAddToCart={handleAddToCart}
            sortBy={sortBy}
            onSortChange={setSortBy}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            onProductClick={setDetailProduct}
          />
        </>
      ) : (
        <AdminDashboard
          orders={orders}
          products={products}
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
          onUpdateOrderStatus={handleUpdateOrderStatus}
        />
      )}

      {/* Slide-out Sidebar Shopping Cart */}
      <Cart
        isOpen={isCartOpen}
        cartItems={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Elegant checkout & Invoice screen overlay */}
      <Checkout
        isOpen={isCheckoutOpen}
        cartItems={cartItems}
        onClose={() => setIsCheckoutOpen(false)}
        onClearCart={handleClearCart}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* Premium Product Detail Modal Overlay */}
      {detailProduct && (
        <ProductDetailModal
          product={detailProduct}
          onClose={() => setDetailProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Gorgeous brand info footer */}
      <Footer />
    </div>
  );
}
