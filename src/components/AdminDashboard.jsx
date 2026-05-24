import React, { useState } from 'react';

export default function AdminDashboard({ 
  orders, 
  products, 
  onAddProduct, 
  onDeleteProduct, 
  onUpdateOrderStatus 
}) {
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    discount: '0',
    image: ''
  });

  const [orderSearch, setOrderSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');

  // Calculate Metrics
  const totalSales = orders.reduce((acc, order) => acc + order.total, 0);
  const totalOrders = orders.length;
  const productsCount = products.length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      alert("Please fill in the product name and price.");
      return;
    }

    const priceNum = parseFloat(newProduct.price);
    const discountNum = parseInt(newProduct.discount) || 0;

    if (isNaN(priceNum) || priceNum <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    onAddProduct({
      name: newProduct.name,
      category: newProduct.category,
      price: priceNum,
      discount: discountNum,
      image: newProduct.image.trim()
    });

    // Reset Form
    setNewProduct({
      name: '',
      category: 'Electronics',
      price: '',
      discount: '0',
      image: ''
    });
  };

  // Filter Orders based on search query
  const filteredOrders = orders.filter(order => {
    const query = orderSearch.toLowerCase();
    return (
      order.id.toLowerCase().includes(query) ||
      order.customer.name.toLowerCase().includes(query) ||
      order.customer.email.toLowerCase().includes(query) ||
      order.customer.address.toLowerCase().includes(query) ||
      order.status.toLowerCase().includes(query)
    );
  });

  // Filter Catalog Products based on search query
  const filteredProducts = products.filter(product => {
    const query = productSearch.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  });

  return (
    <div className="admin-dashboard" style={{ animation: 'fadeIn 0.4s ease-out' }}>
      
      {/* Metrics Row */}
      <div className="admin-metrics-grid">
        <div className="metric-card">
          <div className="metric-label">Total Revenue</div>
          <div className="metric-value">${totalSales.toFixed(2)}</div>
          <div className="metric-sub text-success">Live Earnings</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Total Orders</div>
          <div className="metric-value">{totalOrders}</div>
          <div className="metric-sub text-amber">Customer Submissions</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Active Products</div>
          <div className="metric-value">{productsCount}</div>
          <div className="metric-sub text-muted">In Catalog</div>
        </div>
      </div>

      <div className="admin-two-column">
        {/* Left Column: Orders Tracking */}
        <div className="admin-card orders-section">
          <h3>Customer Orders ({orders.length})</h3>

          {/* Search bar for orders */}
          {orders.length > 0 && (
            <div className="search-container" style={{ marginBottom: '1.5rem', width: '100%', maxWidth: '400px' }}>
              <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search by customer, ID or status..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.25rem' }}
              />
            </div>
          )}

          {orders.length > 0 ? (
            filteredOrders.length > 0 ? (
              <div className="orders-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer Details</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="font-bold text-amber">{order.id}</td>
                        <td>
                          <div className="cust-name">{order.customer.name}</div>
                          <div className="cust-sub">{order.customer.email}</div>
                          <div className="cust-sub text-muted">{order.customer.address}</div>
                        </td>
                        <td>
                          <div className="items-list">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="item-line">
                                {item.quantity}x {item.name}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="font-bold">${order.total.toFixed(2)}</td>
                        <td>
                          <select 
                            className={`status-dropdown status-${order.status.toLowerCase()}`}
                            value={order.status}
                            onChange={(e) => onUpdateOrderStatus(order.id, e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="admin-empty" style={{ padding: '2rem 1rem' }}>
                <p>No orders match "{orderSearch}"</p>
              </div>
            )
          ) : (
            <div className="admin-empty">
              <p>No customer orders placed yet.</p>
            </div>
          )}
        </div>

        {/* Right Column: Manage Products */}
        <div className="admin-column-right">
          
          {/* Add Product Form */}
          <div className="admin-card add-product-card">
            <h3>Add New Product</h3>
            <form onSubmit={handleAddSubmit} className="admin-form">
              <div className="form-group">
                <label className="form-label">Product Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  placeholder="e.g. Vintage LED Filament Bulb"
                  className="form-input"
                  value={newProduct.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select 
                    name="category"
                    className="form-input"
                    value={newProduct.category}
                    onChange={handleInputChange}
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Audio">Audio</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Price ($) *</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    name="price"
                    required 
                    placeholder="29.99"
                    className="form-input"
                    value={newProduct.price}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

               <div className="form-group">
                <label className="form-label">Discount (%)</label>
                <input 
                  type="number" 
                  name="discount" 
                  placeholder="0"
                  className="form-input"
                  value={newProduct.discount}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Product Image</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {/* File Upload Selector */}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="form-input"
                    style={{ padding: '0.45rem', fontSize: '0.8rem', cursor: 'pointer' }}
                  />
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                    <hr style={{ flex: 1, border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)' }} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.5px' }}>OR PASTE IMAGE URL</span>
                    <hr style={{ flex: 1, border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)' }} />
                  </div>

                  {/* Text URL Option */}
                  <input 
                    type="text" 
                    name="image" 
                    placeholder="https://images.unsplash.com/photo-..."
                    className="form-input"
                    value={newProduct.image && !newProduct.image.startsWith('data:') ? newProduct.image : ''}
                    onChange={handleInputChange}
                  />
                </div>
                
                {/* Upload Preview Thumbnail */}
                {newProduct.image && (
                  <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', animation: 'fadeIn 0.3s ease-out', background: 'rgba(255,255,255,0.02)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Preview:</span>
                    <img 
                      src={newProduct.image} 
                      alt="Product preview" 
                      style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '6px', background: '#070a13', border: '1px solid var(--glass-border)' }} 
                    />
                    <button 
                      type="button" 
                      onClick={() => setNewProduct(prev => ({ ...prev, image: '' }))}
                      style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: 'var(--danger)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Clear
                    </button>
                  </div>
                )}
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem', display: 'block', textAlign: 'center' }}>
                Add to Live Catalog
              </button>
            </form>
          </div>

          {/* Catalog Management List */}
          <div className="admin-card manage-catalog-card">
            <h3>Catalog Management ({products.length})</h3>

            {/* Search bar for catalog */}
            {products.length > 0 && (
              <div className="search-container" style={{ marginBottom: '1.25rem', width: '100%' }}>
                <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search catalog products..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.25rem' }}
                />
              </div>
            )}

            {products.length > 0 ? (
              filteredProducts.length > 0 ? (
                <div className="catalog-list-wrapper">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="catalog-item-row">
                      <div className="catalog-item-meta">
                        <span className="catalog-item-name">{product.name}</span>
                        <span className="catalog-item-sub">{product.category} • ${product.price.toFixed(2)}</span>
                      </div>
                      <button 
                        className="btn-remove" 
                        onClick={() => onDeleteProduct(product.id)}
                        aria-label={`Delete ${product.name}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="admin-empty" style={{ padding: '2rem 1rem' }}>
                  <p>No products match "{productSearch}"</p>
                </div>
              )
            ) : (
              <div className="admin-empty">
                <p>No products in the catalog.</p>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
