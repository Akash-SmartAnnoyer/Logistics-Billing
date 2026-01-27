import React, { useState } from 'react';
import './auth/auth.css';

const Procurement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [editingOrder, setEditingOrder] = useState(null);
  const [deletingOrder, setDeletingOrder] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Mock data for vendor orders
  const vendorOrders = [
    {
      id: 'PO-001',
      vendor: 'Timber Solutions Ltd',
      product: 'Teak Wood Planks',
      quantity: 100,
      unit: 'CFT',
      status: 'Ordered',
      eta: '2024-01-15',
      orderDate: '2024-01-10',
      amount: 45000
    },
    {
      id: 'PO-002',
      vendor: 'Forest Products Inc',
      product: 'Pine Wood Logs',
      quantity: 50,
      unit: 'CFT',
      status: 'Incoming',
      eta: '2024-01-12',
      orderDate: '2024-01-08',
      amount: 25000
    },
    {
      id: 'PO-003',
      vendor: 'Wood Works Co',
      product: 'Oak Wood Beams',
      quantity: 25,
      unit: 'CFT',
      status: 'Received',
      eta: '2024-01-05',
      orderDate: '2024-01-01',
      amount: 35000
    },
    {
      id: 'PO-004',
      vendor: 'Timber Depot Supply',
      product: 'Cedar Wood Panels',
      quantity: 75,
      unit: 'SQFT',
      status: 'Need to Order',
      eta: '-',
      orderDate: '-',
      amount: 0
    }
  ];

  const filteredOrders = selectedStatus === 'all' 
    ? vendorOrders 
    : vendorOrders.filter(order => order.status === selectedStatus);

  const handleEdit = (order) => {
    setEditingOrder(order);
    setShowEditModal(true);
  };

  const handleDelete = (order) => {
    setDeletingOrder(order);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletingOrder) {
      // Handle delete logic here
      console.log('Deleting order:', deletingOrder.id);
      setShowDeleteModal(false);
      setDeletingOrder(null);
    }
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
    setSelectAll(!selectAll);
  };

  const handleBulkDelete = () => {
    if (selectedOrders.length > 0) {
      console.log('Bulk deleting orders:', selectedOrders);
      setSelectedOrders([]);
      setSelectAll(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ordered': return '#3b82f6';
      case 'Incoming': return '#f59e0b';
      case 'Received': return '#10b981';
      case 'Need to Order': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Ordered':
        return (
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Incoming':
        return (
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Received':
        return (
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'Need to Order':
        return (
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="procurement-container">
      <div className="procurement-actions">
        <button 
          className="add-btn"
          onClick={() => setShowAddModal(true)}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Procurement
        </button>
      </div>

      {/* Status Filter */}
      <div className="filter-section">
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${selectedStatus === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('all')}
          >
            All Orders ({vendorOrders.length})
          </button>
          <button 
            className={`filter-tab ${selectedStatus === 'Ordered' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('Ordered')}
          >
            Ordered ({vendorOrders.filter(o => o.status === 'Ordered').length})
          </button>
          <button 
            className={`filter-tab ${selectedStatus === 'Incoming' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('Incoming')}
          >
            Incoming ({vendorOrders.filter(o => o.status === 'Incoming').length})
          </button>
          <button 
            className={`filter-tab ${selectedStatus === 'Received' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('Received')}
          >
            Received ({vendorOrders.filter(o => o.status === 'Received').length})
          </button>
          <button 
            className={`filter-tab ${selectedStatus === 'Need to Order' ? 'active' : ''}`}
            onClick={() => setSelectedStatus('Need to Order')}
          >
            Need to Order ({vendorOrders.filter(o => o.status === 'Need to Order').length})
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="procurement-table-wrapper">
        <div className="table-header">
          <div className="table-title">
            <h3>Procurement Orders</h3>
            <span className="order-count">{filteredOrders.length} orders</span>
          </div>
        </div>
        <div className="table-container">
          <table className="procurement-table">
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
                <th className="col-id">Order ID</th>
                <th className="col-vendor">Vendor</th>
                <th className="col-product">Product</th>
                <th className="col-quantity">Quantity</th>
                <th className="col-unit">Unit</th>
                <th className="col-status">Status</th>
                <th className="col-eta">ETA</th>
                <th className="col-date">Order Date</th>
                <th className="col-amount">Amount</th>
                <th className="col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr key={order.id} className={`table-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                  <td className="col-checkbox">
                    <div className="cell-content">
                      <input 
                        type="checkbox" 
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                        className="checkbox-input"
                      />
                    </div>
                  </td>
                  <td className="col-id">
                    <div className="cell-content">
                      <span className="order-id">{order.id}</span>
                    </div>
                  </td>
                  <td className="col-vendor">
                    <div className="cell-content">
                      <span className="vendor-name">{order.vendor}</span>
                    </div>
                  </td>
                  <td className="col-product">
                    <div className="cell-content">
                      <span className="product-name">{order.product}</span>
                    </div>
                  </td>
                  <td className="col-quantity">
                    <div className="cell-content">
                      <span className="quantity">{order.quantity}</span>
                    </div>
                  </td>
                  <td className="col-unit">
                    <div className="cell-content">
                      <span className="unit">{order.unit}</span>
                    </div>
                  </td>
                  <td className="col-status">
                    <div className="cell-content">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="col-eta">
                    <div className="cell-content">
                      <span className="eta">{order.eta}</span>
                    </div>
                  </td>
                  <td className="col-date">
                    <div className="cell-content">
                      <span className="order-date">{order.orderDate}</span>
                    </div>
                  </td>
                  <td className="col-amount">
                    <div className="cell-content">
                      <span className="amount">₹{order.amount.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="col-actions">
                    <div className="cell-content">
                      <div className="action-buttons">
                        <button 
                          className="action-btn edit" 
                          title="Edit Order"
                          onClick={() => handleEdit(order)}
                        >
                          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button 
                          className="action-btn delete" 
                          title="Delete Order"
                          onClick={() => handleDelete(order)}
                        >
                          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      {selectedOrders.length > 0 && (
        <div className="selection-footer">
          <div className="selection-info">
            <span className="selected-count">{selectedOrders.length} selected</span>
            <button 
              className="clear-selection-btn"
              onClick={() => {
                setSelectedOrders([]);
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
              Delete Selected ({selectedOrders.length})
            </button>
          </div>
        </div>
      )}

      {/* Add Procurement Modal */}
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
                  <h3>Add New Procurement Record</h3>
                  <p>Create a new procurement order for your timber depot</p>
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h4>Order Information</h4>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Vendor Name
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Enter vendor name"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        Product
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Enter product name"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <h4>Quantity & Units</h4>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        Quantity
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="number" 
                          className="form-input" 
                          placeholder="Enter quantity"
                        />
                      </div>
                    </div>
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
                  </div>
                </div>

                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4>Status & Timeline</h4>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Status
                      </label>
                      <div className="input-wrapper">
                        <select className="form-input">
                          <option value="">Select status</option>
                          <option value="Ordered">Ordered</option>
                          <option value="Incoming">Incoming</option>
                          <option value="Received">Received</option>
                          <option value="Need to Order">Need to Order</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Expected Delivery
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="date" 
                          className="form-input"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <h4>Financial Information</h4>
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      Amount (₹)
                    </label>
                    <div className="input-wrapper">
                      <input 
                        type="number" 
                        className="form-input" 
                        placeholder="Enter amount"
                      />
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
                    Add Procurement
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Procurement Modal */}
      {showEditModal && editingOrder && (
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
                  <h3>Edit Procurement Record</h3>
                  <p>Update the procurement order details for {editingOrder.id}</p>
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h4>Order Information</h4>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Vendor Name
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="text" 
                          className="form-input" 
                          defaultValue={editingOrder.vendor}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        Product
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="text" 
                          className="form-input" 
                          defaultValue={editingOrder.product}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <h4>Quantity & Units</h4>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        Quantity
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="number" 
                          className="form-input" 
                          defaultValue={editingOrder.quantity}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Unit
                      </label>
                      <div className="input-wrapper">
                        <select className="form-input" defaultValue={editingOrder.unit}>
                          <option value="CFT">CFT (Cubic Feet)</option>
                          <option value="SQFT">SQFT (Square Feet)</option>
                          <option value="Piece">Piece</option>
                          <option value="Bundle">Bundle</option>
                          <option value="Kg">Kg (Kilogram)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4>Status & Timeline</h4>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Status
                      </label>
                      <div className="input-wrapper">
                        <select className="form-input" defaultValue={editingOrder.status}>
                          <option value="Ordered">Ordered</option>
                          <option value="Incoming">Incoming</option>
                          <option value="Received">Received</option>
                          <option value="Need to Order">Need to Order</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Expected Delivery
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="date" 
                          className="form-input"
                          defaultValue={editingOrder.eta}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <h4>Financial Information</h4>
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      Amount (₹)
                    </label>
                    <div className="input-wrapper">
                      <input 
                        type="number" 
                        className="form-input" 
                        defaultValue={editingOrder.amount}
                      />
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
                    Update Procurement
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingOrder && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirm Delete</h3>
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
                <h4>Are you sure you want to delete this procurement order?</h4>
                <p>This action cannot be undone. The following order will be permanently deleted:</p>
                <div className="delete-details">
                  <div className="detail-item">
                    <span className="detail-label">Order ID:</span>
                    <span className="detail-value">{deletingOrder.id}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Vendor:</span>
                    <span className="detail-value">{deletingOrder.vendor}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Product:</span>
                    <span className="detail-value">{deletingOrder.product}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Amount:</span>
                    <span className="detail-value">₹{deletingOrder.amount.toLocaleString()}</span>
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
                    Delete Order
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

export default Procurement;
