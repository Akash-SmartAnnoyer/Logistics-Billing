import React, { useState } from 'react';
import './auth/auth.css';

const Orders = () => {
  const [activeTab, setActiveTab] = useState('enquiries');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deletingOrder, setDeletingOrder] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Mock data for orders
  const enquiries = [
    {
      id: 'ENQ-001',
      customer: 'ABC Construction',
      products: ['Teak Wood Planks', 'Pine Wood Logs'],
      totalAmount: 125000,
      status: 'Pending',
      enquiryDate: '2024-01-10',
      contact: '+91 98765 43210'
    },
    {
      id: 'ENQ-002',
      customer: 'XYZ Builders',
      products: ['Oak Wood Beams'],
      totalAmount: 75000,
      status: 'Hold',
      enquiryDate: '2024-01-09',
      contact: '+91 98765 43211'
    },
    {
      id: 'ENQ-003',
      customer: 'DEF Developers',
      products: ['Cedar Wood Panels', 'Mahogany Planks'],
      totalAmount: 200000,
      status: 'Rejected',
      enquiryDate: '2024-01-08',
      contact: '+91 98765 43212'
    }
  ];

  const activeOrders = [
    {
      id: 'ORD-001',
      customer: 'GHI Contractors',
      products: ['Teak Wood Planks', 'Pine Wood Logs'],
      totalAmount: 150000,
      status: 'Assigned',
      orderDate: '2024-01-05',
      assignedTo: 'John Doe',
      expectedDelivery: '2024-01-15'
    },
    {
      id: 'ORD-002',
      customer: 'JKL Builders',
      products: ['Oak Wood Beams'],
      totalAmount: 90000,
      status: 'In Progress',
      orderDate: '2024-01-03',
      assignedTo: 'Jane Smith',
      expectedDelivery: '2024-01-12'
    }
  ];

  const completedOrders = [
    {
      id: 'ORD-003',
      customer: 'MNO Construction',
      products: ['Cedar Wood Panels'],
      totalAmount: 60000,
      status: 'Delivered',
      orderDate: '2023-12-28',
      deliveredDate: '2024-01-02',
      assignedTo: 'Mike Johnson'
    },
    {
      id: 'ORD-004',
      customer: 'PQR Developers',
      products: ['Mahogany Planks', 'Teak Wood Planks'],
      totalAmount: 180000,
      status: 'Completed',
      orderDate: '2023-12-25',
      deliveredDate: '2023-12-30',
      assignedTo: 'Sarah Wilson'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#3b82f6';
      case 'Hold': return '#f59e0b';
      case 'Rejected': return '#ef4444';
      case 'Assigned': return '#8b5cf6';
      case 'In Progress': return '#06b6d4';
      case 'Delivered': return '#10b981';
      case 'Completed': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return (
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Hold':
        return (
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Rejected':
        return (
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'Assigned':
        return (
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'In Progress':
        return (
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'Delivered':
      case 'Completed':
        return (
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleDelete = (order) => {
    setDeletingOrder(order);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletingOrder) {
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
    const currentOrders = getCurrentOrders();
    if (selectAll) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(currentOrders.map(order => order.id));
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

  const getCurrentOrders = () => {
    switch (activeTab) {
      case 'enquiries': return enquiries;
      case 'active': return activeOrders;
      case 'completed': return completedOrders;
      default: return [];
    }
  };

  const currentOrders = getCurrentOrders();

  return (
    <div className="orders-container">
      <div className="orders-actions">
        <button 
          className="add-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Order
        </button>
      </div>

      {/* Order Tabs */}
      <div className="filter-section">
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${activeTab === 'enquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('enquiries')}
          >
            Enquiries ({enquiries.length})
          </button>
          <button 
            className={`filter-tab ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Active Orders ({activeOrders.length})
          </button>
          <button 
            className={`filter-tab ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed/Delivered ({completedOrders.length})
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-table-wrapper">
        <div className="table-header">
          <div className="table-title">
            <h3>Customer Orders</h3>
            <span className="order-count">{currentOrders.length} orders</span>
          </div>
        </div>
        <div className="table-container">
          <table className="orders-table">
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
                <th className="col-customer">Customer</th>
                <th className="col-products">Products</th>
                <th className="col-amount">Total Amount</th>
                <th className="col-status">Status</th>
                <th className="col-date">Date</th>
                <th className="col-assigned">Assigned To</th>
                <th className="col-delivery">Delivery</th>
                <th className="col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order, index) => (
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
                  <td className="col-customer">
                    <div className="cell-content">
                      <span className="customer-name">{order.customer}</span>
                      {order.contact && (
                        <span className="customer-contact">{order.contact}</span>
                      )}
                    </div>
                  </td>
                  <td className="col-products">
                    <div className="cell-content">
                      <span className="products-list">{order.products.join(', ')}</span>
                    </div>
                  </td>
                  <td className="col-amount">
                    <div className="cell-content">
                      <span className="amount-value">₹{order.totalAmount.toLocaleString()}</span>
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
                  <td className="col-date">
                    <div className="cell-content">
                      <span className="order-date">{order.orderDate || order.enquiryDate}</span>
                    </div>
                  </td>
                  <td className="col-assigned">
                    <div className="cell-content">
                      <span className="assigned-to">{order.assignedTo || '-'}</span>
                    </div>
                  </td>
                  <td className="col-delivery">
                    <div className="cell-content">
                      <span className="delivery-date">
                        {order.expectedDelivery || order.deliveredDate || '-'}
                      </span>
                    </div>
                  </td>
                  <td className="col-actions">
                    <div className="cell-content">
                      <div className="action-buttons">
                        <button
                          className="action-btn view"
                          title="View Details"
                          onClick={() => handleViewDetails(order)}
                        >
                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        {order.status === 'Pending' && (
                          <button
                            className="action-btn confirm"
                            title="Confirm Order"
                          >
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        )}
                        {order.status === 'Assigned' && (
                          <button
                            className="action-btn start"
                            title="Start Work"
                          >
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </button>
                        )}
                        <button
                          className="action-btn delete"
                          title="Delete Order"
                          onClick={() => handleDelete(order)}
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

      {/* Create Order Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="procurement-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section">
                <div className="modal-icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="modal-title-content">
                  <h3>Create New Order</h3>
                  <p>Create a new customer order with products and pricing</p>
                </div>
              </div>
              <button 
                className="modal-close"
                onClick={() => setShowCreateModal(false)}
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h4>Customer Information</h4>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Customer
                      </label>
                      <div className="input-wrapper">
                        <select className="form-input">
                          <option value="">Select customer</option>
                          <option value="ABC Construction">ABC Construction</option>
                          <option value="XYZ Builders">XYZ Builders</option>
                          <option value="DEF Developers">DEF Developers</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Contact Number
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="tel" 
                          className="form-input" 
                          placeholder="Enter contact number"
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
                    <h4>Product Selection</h4>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        Product
                      </label>
                      <div className="input-wrapper">
                        <select className="form-input">
                          <option value="">Select product</option>
                          <option value="teak">Teak Wood Planks</option>
                          <option value="pine">Pine Wood Logs</option>
                          <option value="oak">Oak Wood Beams</option>
                          <option value="cedar">Cedar Wood Panels</option>
                          <option value="mahogany">Mahogany Planks</option>
                        </select>
                      </div>
                    </div>
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
                          <option value="CFT">CFT (Cubic Feet)</option>
                          <option value="SQFT">SQFT (Square Feet)</option>
                          <option value="Piece">Piece</option>
                          <option value="Bundle">Bundle</option>
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
                  <div className="form-actions">
                    <button type="button" className="btn-secondary">
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Product
                    </button>
                  </div>
                </div>

                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4>Order Summary</h4>
                  </div>
                  <div className="order-summary">
                    <div className="summary-item">
                      <span>Subtotal:</span>
                      <span>₹0.00</span>
                    </div>
                    <div className="summary-item">
                      <span>Discount:</span>
                      <span>₹0.00</span>
                    </div>
                    <div className="summary-item total">
                      <span>Total Amount:</span>
                      <span>₹0.00</span>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => setShowCreateModal(false)}
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
                    Create Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
          <div className="procurement-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section">
                <div className="modal-icon view">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="modal-title-content">
                  <h3>Order Details - {selectedOrder.id}</h3>
                  <p>View complete order information and status</p>
                </div>
              </div>
              <button 
                className="modal-close"
                onClick={() => setShowDetailModal(false)}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="order-detail-content">
                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h4>Customer Information</h4>
                  </div>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Customer Name:</span>
                      <span className="detail-value">{selectedOrder.customer}</span>
                    </div>
                    {selectedOrder.contact && (
                      <div className="detail-item">
                        <span className="detail-label">Contact:</span>
                        <span className="detail-value">{selectedOrder.contact}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h4>Order Information</h4>
                  </div>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Order ID:</span>
                      <span className="detail-value">{selectedOrder.id}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Status:</span>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(selectedOrder.status) }}
                      >
                        {getStatusIcon(selectedOrder.status)}
                        {selectedOrder.status}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Total Amount:</span>
                      <span className="detail-value">₹{selectedOrder.totalAmount.toLocaleString()}</span>
                    </div>
                    {selectedOrder.orderDate && (
                      <div className="detail-item">
                        <span className="detail-label">Order Date:</span>
                        <span className="detail-value">{selectedOrder.orderDate}</span>
                      </div>
                    )}
                    {selectedOrder.expectedDelivery && (
                      <div className="detail-item">
                        <span className="detail-label">Expected Delivery:</span>
                        <span className="detail-value">{selectedOrder.expectedDelivery}</span>
                      </div>
                    )}
                    {selectedOrder.deliveredDate && (
                      <div className="detail-item">
                        <span className="detail-label">Delivered Date:</span>
                        <span className="detail-value">{selectedOrder.deliveredDate}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h4>Products</h4>
                  </div>
                  <div className="products-list">
                    {selectedOrder.products.map((product, index) => (
                      <div key={index} className="product-item">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{product}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedOrder.assignedTo && (
                  <div className="form-section">
                    <div className="section-header">
                      <div className="section-icon">
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h4>Assignment</h4>
                  </div>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Assigned to:</span>
                      <span className="detail-value">{selectedOrder.assignedTo}</span>
                    </div>
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingOrder && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Delete Order</h3>
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
                <h4>Are you sure you want to delete this order?</h4>
                <p>This action cannot be undone. The order will be permanently removed from your system.</p>
                <div className="delete-details">
                  <div className="detail-item">
                    <span className="detail-label">Order ID:</span>
                    <span className="detail-value">{deletingOrder.id}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Customer:</span>
                    <span className="detail-value">{deletingOrder.customer}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className="detail-value">{deletingOrder.status}</span>
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

export default Orders;
