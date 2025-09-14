import React, { useState } from 'react';
import './auth/auth.css';

const Products = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Mock data for products
  const products = [
    {
      id: 'P-001',
      name: 'Teak Wood Planks',
      category: 'Hardwood',
      unit: 'CFT',
      pricePerUnit: 450,
      stock: 150,
      minStock: 50,
      status: 'In Stock'
    },
    {
      id: 'P-002',
      name: 'Pine Wood Logs',
      category: 'Softwood',
      unit: 'CFT',
      pricePerUnit: 300,
      stock: 200,
      minStock: 75,
      status: 'In Stock'
    },
    {
      id: 'P-003',
      name: 'Oak Wood Beams',
      category: 'Hardwood',
      unit: 'CFT',
      pricePerUnit: 600,
      stock: 25,
      minStock: 30,
      status: 'Low Stock'
    },
    {
      id: 'P-004',
      name: 'Cedar Wood Panels',
      category: 'Softwood',
      unit: 'SQFT',
      pricePerUnit: 80,
      stock: 500,
      minStock: 100,
      status: 'In Stock'
    },
    {
      id: 'P-005',
      name: 'Mahogany Planks',
      category: 'Hardwood',
      unit: 'CFT',
      pricePerUnit: 800,
      stock: 10,
      minStock: 20,
      status: 'Critical Stock'
    }
  ];

  const categories = ['all', 'Hardwood', 'Softwood', 'Engineered Wood', 'Plywood'];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return '#10b981';
      case 'Low Stock': return '#f59e0b';
      case 'Critical Stock': return '#ef4444';
      case 'Out of Stock': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'In Stock':
        return (
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'Low Stock':
        return (
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'Critical Stock':
        return (
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Out of Stock':
        return (
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = (product) => {
    setDeletingProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletingProduct) {
      console.log('Deleting product:', deletingProduct.id);
      setShowDeleteModal(false);
      setDeletingProduct(null);
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map(product => product.id));
    }
    setSelectAll(!selectAll);
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length > 0) {
      console.log('Bulk deleting products:', selectedProducts);
      setSelectedProducts([]);
      setSelectAll(false);
    }
  };

  return (
    <div className="products-container">
      <div className="products-actions">
        <button 
          className="add-btn"
          onClick={() => setShowAddModal(true)}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Product
        </button>
      </div>

      {/* Category Filter */}
      <div className="filter-section">
        <div className="filter-tabs">
          {categories.map((category) => (
            <button 
              key={category}
              className={`filter-tab ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All Products' : category} 
              ({category === 'all' ? products.length : products.filter(p => p.category === category).length})
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="products-table-wrapper">
        <div className="table-header">
          <div className="table-title">
            <h3>Stock Management</h3>
            <span className="product-count">{filteredProducts.length} products</span>
          </div>
        </div>
        <div className="table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th className="col-checkbox">
                  <input 
                    type="checkbox" 
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="checkbox-input"
                  />
                </th>
                <th className="col-id">Product ID</th>
                <th className="col-name">Product Name</th>
                <th className="col-category">Category</th>
                <th className="col-unit">Unit</th>
                <th className="col-price">Price/Unit</th>
                <th className="col-stock">Current Stock</th>
                <th className="col-min-stock">Min Stock</th>
                <th className="col-status">Status</th>
                <th className="col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product.id} className={`table-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                  <td className="col-checkbox">
                    <div className="cell-content">
                      <input 
                        type="checkbox" 
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="checkbox-input"
                      />
                    </div>
                  </td>
                  <td className="col-id">
                    <div className="cell-content">
                      <span className="product-id">{product.id}</span>
                    </div>
                  </td>
                  <td className="col-name">
                    <div className="cell-content">
                      <span className="product-name">{product.name}</span>
                    </div>
                  </td>
                  <td className="col-category">
                    <div className="cell-content">
                      <span className="category">{product.category}</span>
                    </div>
                  </td>
                  <td className="col-unit">
                    <div className="cell-content">
                      <span className="unit">{product.unit}</span>
                    </div>
                  </td>
                  <td className="col-price">
                    <div className="cell-content">
                      <span className="price">₹{product.pricePerUnit.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="col-stock">
                    <div className="cell-content">
                      <span className="stock">{product.stock} {product.unit}</span>
                    </div>
                  </td>
                  <td className="col-min-stock">
                    <div className="cell-content">
                      <span className="min-stock">{product.minStock} {product.unit}</span>
                    </div>
                  </td>
                  <td className="col-status">
                    <div className="cell-content">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(product.status) }}
                      >
                        {getStatusIcon(product.status)}
                        {product.status}
                      </span>
                    </div>
                  </td>
                  <td className="col-actions">
                    <div className="cell-content">
                      <div className="action-buttons">
                        <button
                          className="action-btn edit"
                          title="Edit Product"
                          onClick={() => handleEdit(product)}
                        >
                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          className="action-btn delete"
                          title="Delete Product"
                          onClick={() => handleDelete(product)}
                        >
                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selection Footer */}
      {selectedProducts.length > 0 && (
        <div className="selection-footer">
          <div className="selection-info">
            <span className="selected-count">{selectedProducts.length} selected</span>
            <button 
              className="clear-selection-btn"
              onClick={() => {
                setSelectedProducts([]);
                setSelectAll(false);
              }}
            >
              Clear Selection
            </button>
          </div>
          <div className="selection-actions">
            <button 
              className="bulk-delete-btn"
              onClick={handleBulkDelete}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Selected ({selectedProducts.length})
            </button>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="procurement-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section">
                <div className="modal-icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="modal-title-content">
                  <h3>Add New Product</h3>
                  <p>Create a new product entry for your timber catalog</p>
                </div>
              </div>
              <button 
                className="modal-close"
                onClick={() => setShowAddModal(false)}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <form className="procurement-form">
                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h4>Product Information</h4>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        Product Name
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Enter product name"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        Category
                      </label>
                      <div className="input-wrapper">
                        <select className="form-input">
                          <option value="">Select category</option>
                          <option value="Hardwood">Hardwood</option>
                          <option value="Softwood">Softwood</option>
                          <option value="Engineered Wood">Engineered Wood</option>
                          <option value="Plywood">Plywood</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4>Units & Pricing</h4>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Unit
                      </label>
                      <div className="input-wrapper">
                        <select className="form-input">
                          <option value="">Select unit</option>
                          <option value="CFT">CFT (Cubic Feet)</option>
                          <option value="SQFT">SQFT (Square Feet)</option>
                          <option value="Piece">Piece</option>
                          <option value="Bundle">Bundle</option>
                          <option value="Kg">Kg (Kilogram)</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        Price per Unit (₹)
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="number" 
                          className="form-input" 
                          placeholder="Enter price per unit"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h4>Stock Management</h4>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        Current Stock
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="number" 
                          className="form-input" 
                          placeholder="Enter current stock"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        Minimum Stock
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="number" 
                          className="form-input" 
                          placeholder="Enter minimum stock"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => setShowAddModal(false)}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && editingProduct && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="procurement-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section">
                <div className="modal-icon edit">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div className="modal-title-content">
                  <h3>Edit Product</h3>
                  <p>Update the product details for {editingProduct.id}</p>
                </div>
              </div>
              <button 
                className="modal-close"
                onClick={() => setShowEditModal(false)}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <form className="procurement-form">
                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h4>Product Information</h4>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        Product Name
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="text" 
                          className="form-input" 
                          defaultValue={editingProduct.name}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        Category
                      </label>
                      <div className="input-wrapper">
                        <select className="form-input" defaultValue={editingProduct.category}>
                          <option value="Hardwood">Hardwood</option>
                          <option value="Softwood">Softwood</option>
                          <option value="Engineered Wood">Engineered Wood</option>
                          <option value="Plywood">Plywood</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4>Units & Pricing</h4>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Unit
                      </label>
                      <div className="input-wrapper">
                        <select className="form-input" defaultValue={editingProduct.unit}>
                          <option value="CFT">CFT (Cubic Feet)</option>
                          <option value="SQFT">SQFT (Square Feet)</option>
                          <option value="Piece">Piece</option>
                          <option value="Bundle">Bundle</option>
                          <option value="Kg">Kg (Kilogram)</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        Price per Unit (₹)
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="number" 
                          className="form-input" 
                          defaultValue={editingProduct.pricePerUnit}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h4>Stock Management</h4>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        Current Stock
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="number" 
                          className="form-input" 
                          defaultValue={editingProduct.stock}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        Minimum Stock
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="number" 
                          className="form-input" 
                          defaultValue={editingProduct.minStock}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingProduct && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Delete Product</h3>
              <button 
                className="modal-close"
                onClick={() => setShowDeleteModal(false)}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="delete-confirmation">
                <div className="delete-icon">
                  <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h4>Are you sure you want to delete this product?</h4>
                <p>This action cannot be undone. The product will be permanently removed from your catalog.</p>
                <div className="delete-details">
                  <div className="detail-item">
                    <span className="detail-label">Product ID:</span>
                    <span className="detail-value">{deletingProduct.id}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Product Name:</span>
                    <span className="detail-value">{deletingProduct.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Category:</span>
                    <span className="detail-value">{deletingProduct.category}</span>
                  </div>
                </div>
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn-danger"
                    onClick={confirmDelete}
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
