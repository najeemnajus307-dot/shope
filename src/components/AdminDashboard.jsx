import React, { useState } from 'react';

export default function AdminDashboard({ 
  orders, 
  products, 
  onAddProduct, 
  onDeleteProduct, 
  onUpdateOrderStatus,
  onUpdateProduct
}) {
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    discount: '0',
    image: '',
    images: [] // Support multiple images
  });

  const [editingProductId, setEditingProductId] = useState(null);
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
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const loadedImages = [];
      let count = 0;
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          loadedImages.push(reader.result);
          count++;
          if (count === files.length) {
            setNewProduct(prev => {
              const updatedImages = [...prev.images, ...loadedImages];
              return { 
                ...prev, 
                images: updatedImages,
                // Automatically set the main image to the first uploaded one if none is selected
                image: prev.image || updatedImages[0]
              };
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      discount: product.discount.toString(),
      image: product.image || '',
      images: product.images || []
    });
    // Scroll smoothly to form
    const formSec = document.querySelector('.add-product-card');
    if (formSec) formSec.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setNewProduct({
      name: '',
      category: 'Electronics',
      price: '',
      discount: '0',
      image: '',
      images: []
    });
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

    let finalImages = [...newProduct.images];
    if (newProduct.image && !finalImages.includes(newProduct.image)) {
      finalImages.unshift(newProduct.image);
    }

    if (editingProductId) {
      onUpdateProduct({
        id: editingProductId,
        name: newProduct.name,
        category: newProduct.category,
        price: priceNum,
        discount: discountNum,
        image: newProduct.image.trim(),
        images: finalImages
      });
      setEditingProductId(null);
    } else {
      onAddProduct({
        name: newProduct.name,
        category: newProduct.category,
        price: priceNum,
        discount: discountNum,
        image: newProduct.image.trim(),
        images: finalImages
      });
    }

    // Reset Form
    setNewProduct({
      name: '',
      category: 'Electronics',
      price: '',
      discount: '0',
      image: '',
      images: []
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
            <h3>{editingProductId ? `Edit Product (${newProduct.name})` : 'Add New Product'}</h3>
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
                <label className="form-label">Product Image(s)</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {/* File Upload Selector supporting multiple files */}
                  <input 
                    type="file" 
                    accept="image/*"
                    multiple
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
                
                {/* Upload Previews list */}
                {newProduct.images.length > 0 && (
                  <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', animation: 'fadeIn 0.3s ease-out', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Uploaded Images ({newProduct.images.length}):</span>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {newProduct.images.map((img, idx) => (
                        <div key={idx} style={{ position: 'relative', width: '50px', height: '50px', borderRadius: '6px', overflow: 'hidden', border: newProduct.image === img ? '2px solid var(--brand-primary)' : '1px solid var(--glass-border)', cursor: 'pointer' }} onClick={() => setNewProduct(prev => ({ ...prev, image: img }))} title="Set as primary cover image">
                          <img 
                            src={img} 
                            alt={`Preview ${idx}`} 
                            style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#070a13' }} 
                          />
                          <button 
                            type="button" 
                            onClick={(e) => {
                              e.stopPropagation();
                              setNewProduct(prev => {
                                const filtered = prev.images.filter((_, i) => i !== idx);
                                return {
                                  ...prev,
                                  images: filtered,
                                  image: prev.image === img ? filtered[0] || '' : prev.image
                                };
                              });
                            }}
                            style={{ position: 'absolute', top: '2px', right: '2px', width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.9)', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', cursor: 'pointer', fontWeight: 900 }}
                            title="Remove image"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>* Click on any thumbnail above to set it as the primary cover image!</span>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem', display: 'block', textAlign: 'center' }}>
                  {editingProductId ? 'Save Product Changes' : 'Add to Live Catalog'}
                </button>
                
                {editingProductId && (
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    onClick={handleCancelEdit}
                    style={{ width: '100%', display: 'block', textAlign: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', padding: '0.75rem', borderRadius: '12px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', transition: 'var(--transition-smooth)' }}
                  >
                    Cancel Edit Mode
                  </button>
                )}
              </div>
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
                    <div key={product.id} className="catalog-item-row" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      
                      {/* Product Thumbnail Image / Fallback Icon */}
                      <div className="catalog-item-thumb" style={{ width: '44px', height: '44px', borderRadius: '8px', overflow: 'hidden', background: '#070a13', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {product.image ? (
                          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        ) : product.icon ? (
                          <div style={{ width: '28px', height: '28px' }}>
                            <product.icon />
                          </div>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>

                      <div className="catalog-item-meta" style={{ flex: 1 }}>
                        <span className="catalog-item-name">{product.name}</span>
                        <span className="catalog-item-sub">{product.category} • ${product.price.toFixed(2)}</span>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        {/* Edit Button */}
                        <button 
                          className="btn-edit" 
                          onClick={() => handleEditClick(product)}
                          style={{
                            background: 'rgba(245, 158, 11, 0.1)',
                            border: '1px solid rgba(245, 158, 11, 0.2)',
                            color: 'var(--brand-primary)',
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'var(--transition-bounce)'
                          }}
                          title="Edit Product Details"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>

                        {/* Remove Button */}
                        <button 
                          className="btn-remove" 
                          onClick={() => onDeleteProduct(product.id)}
                          style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            color: '#ef4444',
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'var(--transition-bounce)'
                          }}
                          aria-label={`Delete ${product.name}`}
                          title="Delete Product"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

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
