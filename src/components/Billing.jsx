import React, { useState } from 'react';
import './auth/auth.css';

const Billing = () => {
  const [activeView, setActiveView] = useState('my-bills');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data for invoices
  const myBills = [
    {
      id: 'INV-001',
      customer: 'ABC Construction',
      amount: 125000,
      cost: 100000,
      margin: 25000,
      status: 'Paid',
      invoiceDate: '2024-01-10',
      dueDate: '2024-01-25',
      paidDate: '2024-01-12'
    },
    {
      id: 'INV-002',
      customer: 'XYZ Builders',
      amount: 75000,
      cost: 60000,
      margin: 15000,
      status: 'Partial Paid',
      invoiceDate: '2024-01-08',
      dueDate: '2024-01-23',
      paidAmount: 50000,
      remainingAmount: 25000
    },
    {
      id: 'INV-003',
      customer: 'DEF Developers',
      amount: 200000,
      cost: 160000,
      margin: 40000,
      status: 'Pending',
      invoiceDate: '2024-01-05',
      dueDate: '2024-01-20',
      paidAmount: 0,
      remainingAmount: 200000
    }
  ];

  const customerBills = [
    {
      id: 'INV-001',
      customer: 'ABC Construction',
      amount: 125000,
      status: 'Paid',
      invoiceDate: '2024-01-10',
      dueDate: '2024-01-25',
      items: [
        { product: 'Teak Wood Planks', quantity: 50, unit: 'CFT', rate: 450, amount: 22500 },
        { product: 'Pine Wood Logs', quantity: 100, unit: 'CFT', rate: 300, amount: 30000 }
      ]
    },
    {
      id: 'INV-002',
      customer: 'XYZ Builders',
      amount: 75000,
      status: 'Partial Paid',
      invoiceDate: '2024-01-08',
      dueDate: '2024-01-23',
      items: [
        { product: 'Oak Wood Beams', quantity: 25, unit: 'CFT', rate: 600, amount: 15000 }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return '#10b981';
      case 'Partial Paid': return '#f59e0b';
      case 'Pending': return '#ef4444';
      case 'Overdue': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Paid':
        return (
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'Partial Paid':
        return (
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Pending':
        return (
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'Overdue':
        return (
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const filteredBills = selectedFilter === 'all' 
    ? myBills 
    : myBills.filter(bill => bill.status === selectedFilter);

  const handleViewDetails = (invoice) => {
    setSelectedInvoice(invoice);
    setShowDetailModal(true);
  };

  const handleDownloadPDF = (invoiceId) => {
    // Placeholder for PDF download
    console.log('Download PDF for invoice:', invoiceId);
    alert('PDF download functionality will be implemented here');
  };

  return (
    <div className="billing-container">
      <div className="billing-actions">
        <button 
          className="add-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Invoice
        </button>
      </div>

      {/* View Toggle */}
      <div className="filter-section">
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${activeView === 'my-bills' ? 'active' : ''}`}
            onClick={() => setActiveView('my-bills')}
          >
            My Bills (Internal) ({myBills.length})
          </button>
          <button 
            className={`filter-tab ${activeView === 'customer-bills' ? 'active' : ''}`}
            onClick={() => setActiveView('customer-bills')}
          >
            Customer Bills (External) ({customerBills.length})
          </button>
        </div>
      </div>

      {/* Status Filter */}
      <div className="filter-section">
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${selectedFilter === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('all')}
          >
            All Bills ({myBills.length})
          </button>
          <button 
            className={`filter-tab ${selectedFilter === 'Paid' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('Paid')}
          >
            Paid ({myBills.filter(b => b.status === 'Paid').length})
          </button>
          <button 
            className={`filter-tab ${selectedFilter === 'Partial Paid' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('Partial Paid')}
          >
            Partial Paid ({myBills.filter(b => b.status === 'Partial Paid').length})
          </button>
          <button 
            className={`filter-tab ${selectedFilter === 'Pending' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('Pending')}
          >
            Pending ({myBills.filter(b => b.status === 'Pending').length})
          </button>
        </div>
      </div>

      {/* Bills Table */}
      <div className="billing-table-wrapper">
        <div className="table-header">
          <div className="table-title">
            <h3>Billing & Invoices</h3>
            <span className="bill-count">{filteredBills.length} invoices</span>
          </div>
        </div>
        <div className="table-container">
          <table className="billing-table">
            <thead>
              <tr>
                <th className="col-id">Invoice ID</th>
                <th className="col-customer">Customer</th>
                <th className="col-amount">Amount</th>
                {activeView === 'my-bills' && <th className="col-cost">Cost</th>}
                {activeView === 'my-bills' && <th className="col-margin">Margin</th>}
                <th className="col-status">Status</th>
                <th className="col-date">Invoice Date</th>
                <th className="col-due">Due Date</th>
                {activeView === 'my-bills' && <th className="col-paid">Paid Amount</th>}
                <th className="col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeView === 'my-bills' ? (
                filteredBills.map((bill, index) => (
                  <tr key={bill.id} className={`table-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                    <td className="col-id">
                      <div className="cell-content">
                        <span className="invoice-id">{bill.id}</span>
                      </div>
                    </td>
                    <td className="col-customer">
                      <div className="cell-content">
                        <span className="customer-name">{bill.customer}</span>
                      </div>
                    </td>
                    <td className="col-amount">
                      <div className="cell-content">
                        <span className="amount">₹{bill.amount.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="col-cost">
                      <div className="cell-content">
                        <span className="cost">₹{bill.cost.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="col-margin">
                      <div className="cell-content">
                        <span className="margin">₹{bill.margin.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="col-status">
                      <div className="cell-content">
                        <span 
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(bill.status) }}
                        >
                          {getStatusIcon(bill.status)}
                          {bill.status}
                        </span>
                      </div>
                    </td>
                    <td className="col-date">
                      <div className="cell-content">
                        <span className="invoice-date">{bill.invoiceDate}</span>
                      </div>
                    </td>
                    <td className="col-due">
                      <div className="cell-content">
                        <span className="due-date">{bill.dueDate}</span>
                      </div>
                    </td>
                    <td className="col-paid">
                      <div className="cell-content">
                        <span className="paid-amount">
                          {bill.status === 'Paid' ? `₹${bill.amount.toLocaleString()}` : 
                           bill.status === 'Partial Paid' ? `₹${bill.paidAmount.toLocaleString()}` : 
                           '₹0'}
                        </span>
                      </div>
                    </td>
                    <td className="col-actions">
                      <div className="cell-content">
                        <div className="action-buttons">
                          <button 
                            className="action-btn view"
                            onClick={() => handleViewDetails(bill)}
                            title="View Details"
                          >
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button 
                            className="action-btn download"
                            onClick={() => handleDownloadPDF(bill.id)}
                            title="Download PDF"
                          >
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </button>
                          <button className="action-btn edit" title="Edit">
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                customerBills.map((bill, index) => (
                  <tr key={bill.id} className={`table-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                    <td className="col-id">
                      <div className="cell-content">
                        <span className="invoice-id">{bill.id}</span>
                      </div>
                    </td>
                    <td className="col-customer">
                      <div className="cell-content">
                        <span className="customer-name">{bill.customer}</span>
                      </div>
                    </td>
                    <td className="col-amount">
                      <div className="cell-content">
                        <span className="amount">₹{bill.amount.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="col-status">
                      <div className="cell-content">
                        <span 
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(bill.status) }}
                        >
                          {getStatusIcon(bill.status)}
                          {bill.status}
                        </span>
                      </div>
                    </td>
                    <td className="col-date">
                      <div className="cell-content">
                        <span className="invoice-date">{bill.invoiceDate}</span>
                      </div>
                    </td>
                    <td className="col-due">
                      <div className="cell-content">
                        <span className="due-date">{bill.dueDate}</span>
                      </div>
                    </td>
                    <td className="col-actions">
                      <div className="cell-content">
                        <div className="action-buttons">
                          <button 
                            className="action-btn view"
                            onClick={() => handleViewDetails(bill)}
                            title="View Details"
                          >
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button 
                            className="action-btn download"
                            onClick={() => handleDownloadPDF(bill.id)}
                            title="Download PDF"
                          >
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Invoice</h3>
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
              <form className="invoice-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Customer</label>
                    <select className="form-input">
                      <option value="">Select customer</option>
                      <option value="ABC Construction">ABC Construction</option>
                      <option value="XYZ Builders">XYZ Builders</option>
                      <option value="DEF Developers">DEF Developers</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Invoice Date</label>
                    <input type="date" className="form-input" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Due Date</label>
                    <input type="date" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Payment Terms</label>
                    <select className="form-input">
                      <option value="Net 15">Net 15</option>
                      <option value="Net 30">Net 30</option>
                      <option value="Net 45">Net 45</option>
                      <option value="Due on Receipt">Due on Receipt</option>
                    </select>
                  </div>
                </div>
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Create Invoice
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Detail Modal */}
      {showDetailModal && selectedInvoice && (
        <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Invoice Details - {selectedInvoice.id}</h3>
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
              <div className="invoice-detail-content">
                <div className="invoice-header">
                  <div className="invoice-info">
                    <h4>LogiNex</h4>
                    <p>123 LogiNex Way, Logistics City, LC 12345</p>
                    <p>Phone: +91 98765 43210</p>
                    <p>Email: info@loginex.com</p>
                  </div>
                  <div className="invoice-details">
                    <h4>Invoice #{selectedInvoice.id}</h4>
                    <p><strong>Date:</strong> {selectedInvoice.invoiceDate}</p>
                    <p><strong>Due Date:</strong> {selectedInvoice.dueDate}</p>
                    <p><strong>Status:</strong> {selectedInvoice.status}</p>
                  </div>
                </div>
                <div className="invoice-customer">
                  <h4>Bill To:</h4>
                  <p><strong>{selectedInvoice.customer}</strong></p>
                </div>
                <div className="invoice-items">
                  <table className="invoice-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Rate</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.items ? selectedInvoice.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.product}</td>
                          <td>{item.quantity}</td>
                          <td>{item.unit}</td>
                          <td>₹{item.rate}</td>
                          <td>₹{item.amount.toLocaleString()}</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="5">No items available</td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr className="total-row">
                        <td colSpan="4"><strong>Total Amount:</strong></td>
                        <td><strong>₹{selectedInvoice.amount.toLocaleString()}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="invoice-actions">
                  <button 
                    className="btn-primary"
                    onClick={() => handleDownloadPDF(selectedInvoice.id)}
                  >
                    Download PDF
                  </button>
                  <button className="btn-secondary">
                    Edit Invoice
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

export default Billing;
