import React, { useState } from 'react';
import './auth/auth.css';
import CreateOrder from './CreateOrder';

const Orders = ({ createOrderView = false, setCreateOrderView }) => {
  const [activeTab, setActiveTab] = useState('estimates');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEstimateModal, setShowEstimateModal] = useState(false);
  const [showEstimateEditModal, setShowEstimateEditModal] = useState(false);
  const [showEstimatePreviewModal, setShowEstimatePreviewModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedEstimate, setSelectedEstimate] = useState(null);
  const [editingEstimate, setEditingEstimate] = useState(null);
  const [deletingOrder, setDeletingOrder] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Order creation state
  const [orderForm, setOrderForm] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    customerAddress: '',
    isExistingCustomer: false,
    products: [],
    subtotal: 0,
    discount: 0,
    discountType: 'percentage', // 'percentage' or 'fixed'
    totalAmount: 0,
    notes: '',
    expectedDelivery: '',
    selectedProduct: null,
    selectedQuantity: 0
  });

  // Estimate state
  const [estimateForm, setEstimateForm] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    customerAddress: '',
    isExistingCustomer: false,
    products: [],
    subtotal: 0,
    discount: 0,
    discountType: 'percentage',
    totalAmount: 0,
    notes: '',
    validUntil: '',
    estimateNumber: `EST-${Date.now()}`,
    selectedProduct: null,
    selectedQuantity: 0
  });

  // Available products for order creation
  const availableProducts = [
    { id: 'P-001', name: 'Teak Wood Planks', category: 'Hardwood', unit: 'CFT', price: 450, stock: 150 },
    { id: 'P-002', name: 'Pine Wood Logs', category: 'Softwood', unit: 'CFT', price: 300, stock: 200 },
    { id: 'P-003', name: 'Oak Wood Beams', category: 'Hardwood', unit: 'CFT', price: 600, stock: 25 },
    { id: 'P-004', name: 'Cedar Wood Panels', category: 'Softwood', unit: 'SQFT', price: 80, stock: 500 },
    { id: 'P-005', name: 'Mahogany Planks', category: 'Hardwood', unit: 'CFT', price: 800, stock: 10 }
  ];

  // Existing customers database
  const existingCustomers = [
    { id: 'C-001', name: 'ABC Construction', phone: '+91 98765 43210', email: 'abc@construction.com', address: '123 Construction St, Mumbai' },
    { id: 'C-002', name: 'XYZ Builders', phone: '+91 98765 43211', email: 'xyz@builders.com', address: '456 Builder Ave, Delhi' },
    { id: 'C-003', name: 'DEF Developers', phone: '+91 98765 43212', email: 'def@developers.com', address: '789 Developer Rd, Bangalore' }
  ];

  // Estimate management state
  const [estimates, setEstimates] = useState([
    {
      id: 'EST-001',
      customer: 'ABC Construction',
      phone: '+91 98765 43210',
      email: 'abc@construction.com',
      address: '123 Construction St, Mumbai',
      products: [
        { name: 'Teak Wood Planks', quantity: 50, price: 450, totalPrice: 22500 },
        { name: 'Pine Wood Logs', quantity: 30, price: 300, totalPrice: 9000 }
      ],
      subtotal: 31500,
      discount: 5,
      discountType: 'percentage',
      totalAmount: 29925,
      status: 'Pending',
      estimateDate: '2024-01-10',
      validUntil: '2024-01-25',
      notes: 'High priority order',
      isExistingCustomer: true
    },
    {
      id: 'EST-002',
      customer: 'XYZ Builders',
      phone: '+91 98765 43211',
      email: 'xyz@builders.com',
      address: '456 Builder Ave, Delhi',
      products: [
        { name: 'Oak Wood Beams', quantity: 20, price: 600, totalPrice: 12000 }
      ],
      subtotal: 12000,
      discount: 0,
      discountType: 'percentage',
      totalAmount: 12000,
      status: 'Approved',
      estimateDate: '2024-01-09',
      validUntil: '2024-01-24',
      notes: 'Ready for conversion',
      isExistingCustomer: true
    }
  ]);

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
      case 'estimates': return estimates;
      case 'active': return activeOrders;
      case 'completed': return completedOrders;
      default: return [];
    }
  };

  // Customer detection by phone number
  const detectCustomer = (phone, formType = 'order') => {
    const customer = existingCustomers.find(c => c.phone === phone);
    if (customer) {
      const updateData = {
        customerName: customer.name,
        customerPhone: customer.phone,
        customerEmail: customer.email,
        customerAddress: customer.address,
        isExistingCustomer: true
      };
      
      if (formType === 'estimate') {
        setEstimateForm(prev => ({ ...prev, ...updateData }));
      } else {
        setOrderForm(prev => ({ ...prev, ...updateData }));
      }
      return customer;
    } else {
      const resetData = {
        customerName: '',
        customerEmail: '',
        customerAddress: '',
        isExistingCustomer: false
      };
      
      if (formType === 'estimate') {
        setEstimateForm(prev => ({ ...prev, ...resetData }));
      } else {
        setOrderForm(prev => ({ ...prev, ...resetData }));
      }
      return null;
    }
  };

  // Add product to form
  const addProductToForm = (productId, quantity, formType = 'order') => {
    const product = availableProducts.find(p => p.id === productId);
    if (product && quantity > 0) {
      const currentForm = formType === 'estimate' ? estimateForm : orderForm;
      const setForm = formType === 'estimate' ? setEstimateForm : setOrderForm;
      
      const existingProductIndex = currentForm.products.findIndex(p => p.id === productId);
      if (existingProductIndex >= 0) {
        // Update existing product quantity
        const updatedProducts = [...currentForm.products];
        updatedProducts[existingProductIndex].quantity += quantity;
        updatedProducts[existingProductIndex].totalPrice = updatedProducts[existingProductIndex].quantity * updatedProducts[existingProductIndex].price;
        setForm(prev => ({ ...prev, products: updatedProducts }));
      } else {
        // Add new product
        const newProduct = {
          ...product,
          quantity: quantity,
          totalPrice: product.price * quantity
        };
        setForm(prev => ({ ...prev, products: [...prev.products, newProduct] }));
      }
      calculateTotals(formType);
    }
  };

  // Remove product from form
  const removeProductFromForm = (productId, formType = 'order') => {
    const setForm = formType === 'estimate' ? setEstimateForm : setOrderForm;
    setForm(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== productId)
    }));
    calculateTotals(formType);
  };

  // Update product quantity
  const updateProductQuantity = (productId, quantity, formType = 'order') => {
    if (quantity <= 0) {
      removeProductFromForm(productId, formType);
      return;
    }
    
    const currentForm = formType === 'estimate' ? estimateForm : orderForm;
    const setForm = formType === 'estimate' ? setEstimateForm : setOrderForm;
    
    const updatedProducts = currentForm.products.map(p => 
      p.id === productId 
        ? { ...p, quantity: quantity, totalPrice: p.price * quantity }
        : p
    );
    setForm(prev => ({ ...prev, products: updatedProducts }));
    calculateTotals(formType);
  };

  // Calculate totals
  const calculateTotals = (formType = 'order') => {
    const currentForm = formType === 'estimate' ? estimateForm : orderForm;
    const setForm = formType === 'estimate' ? setEstimateForm : setOrderForm;
    
    const subtotal = currentForm.products.reduce((sum, product) => sum + product.totalPrice, 0);
    let discountAmount = 0;
    
    if (currentForm.discount > 0) {
      if (currentForm.discountType === 'percentage') {
        discountAmount = (subtotal * currentForm.discount) / 100;
      } else {
        discountAmount = currentForm.discount;
      }
    }
    
    const totalAmount = subtotal - discountAmount;
    
    setForm(prev => ({
      ...prev,
      subtotal,
      totalAmount: Math.max(0, totalAmount)
    }));
  };

  // Handle form input changes
  const handleFormChange = (field, value, formType = 'order') => {
    const setForm = formType === 'estimate' ? setEstimateForm : setOrderForm;
    setForm(prev => ({ ...prev, [field]: value }));
    
    if (field === 'customerPhone') {
      detectCustomer(value, formType);
    }
    
    if (field === 'discount' || field === 'discountType') {
      calculateTotals(formType);
    }
  };

  // Handle estimate form changes
  const handleEstimateFormChange = (field, value) => {
    handleFormChange(field, value, 'estimate');
  };

  // Create estimate
  const createEstimate = () => {
    if (!estimateForm.customerName || !estimateForm.customerPhone || estimateForm.products.length === 0) {
      alert('Please fill in all required fields and add at least one product');
      return;
    }

    const newEstimate = {
      id: estimateForm.estimateNumber,
      customer: estimateForm.customerName,
      phone: estimateForm.customerPhone,
      email: estimateForm.customerEmail,
      address: estimateForm.customerAddress,
      products: estimateForm.products,
      subtotal: estimateForm.subtotal,
      discount: estimateForm.discount,
      discountType: estimateForm.discountType,
      totalAmount: estimateForm.totalAmount,
      status: 'Pending',
      estimateDate: new Date().toISOString().split('T')[0],
      validUntil: estimateForm.validUntil,
      notes: estimateForm.notes,
      isExistingCustomer: estimateForm.isExistingCustomer
    };

    // Add to estimates list
    setEstimates(prev => [newEstimate, ...prev]);
    
    // Reset form
    setEstimateForm({
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      customerAddress: '',
      isExistingCustomer: false,
      products: [],
      subtotal: 0,
      discount: 0,
      discountType: 'percentage',
      totalAmount: 0,
      notes: '',
      validUntil: '',
      estimateNumber: `EST-${Date.now()}`,
      selectedProduct: null,
      selectedQuantity: 0
    });
    
    setShowEstimateModal(false);
    alert('Estimate created successfully! PDF generated and estimate added to list.');
  };

  // Convert estimate to order
  const convertEstimateToOrder = () => {
    setOrderForm({
      customerName: estimateForm.customerName,
      customerPhone: estimateForm.customerPhone,
      customerEmail: estimateForm.customerEmail,
      customerAddress: estimateForm.customerAddress,
      isExistingCustomer: estimateForm.isExistingCustomer,
      products: [...estimateForm.products],
      subtotal: estimateForm.subtotal,
      discount: estimateForm.discount,
      discountType: estimateForm.discountType,
      totalAmount: estimateForm.totalAmount,
      notes: estimateForm.notes,
      expectedDelivery: '',
      selectedProduct: null,
      selectedQuantity: 0
    });
    
    setShowEstimateModal(false);
    setShowCreateModal(true);
  };

  // Convert existing estimate to order
  const convertExistingEstimateToOrder = (estimate) => {
    setOrderForm({
      customerName: estimate.customer,
      customerPhone: estimate.phone,
      customerEmail: estimate.email,
      customerAddress: estimate.address,
      isExistingCustomer: estimate.isExistingCustomer,
      products: [...estimate.products],
      subtotal: estimate.subtotal,
      discount: estimate.discount,
      discountType: estimate.discountType,
      totalAmount: estimate.totalAmount,
      notes: estimate.notes,
      expectedDelivery: '',
      selectedProduct: null,
      selectedQuantity: 0
    });
    
    setShowCreateModal(true);
  };

  // Generate PDF for estimate
  const generateEstimatePDF = (estimate) => {
    // In a real application, you would use a PDF library like jsPDF
    // For now, we'll simulate PDF generation
    console.log('Generating PDF for estimate:', estimate.id);
    alert(`PDF generated for estimate ${estimate.id}. In a real application, this would download the PDF.`);
  };

  // Preview estimate PDF
  const previewEstimatePDF = (estimate) => {
    setSelectedEstimate(estimate);
    setShowEstimatePreviewModal(true);
  };

  // Edit estimate
  const editEstimate = (estimate) => {
    setEditingEstimate(estimate);
    setEstimateForm({
      customerName: estimate.customer,
      customerPhone: estimate.phone,
      customerEmail: estimate.email,
      customerAddress: estimate.address,
      isExistingCustomer: estimate.isExistingCustomer,
      products: [...estimate.products],
      subtotal: estimate.subtotal,
      discount: estimate.discount,
      discountType: estimate.discountType,
      totalAmount: estimate.totalAmount,
      notes: estimate.notes,
      validUntil: estimate.validUntil,
      estimateNumber: estimate.id,
      selectedProduct: null,
      selectedQuantity: 0
    });
    setShowEstimateEditModal(true);
  };

  // Save edited estimate
  const saveEditedEstimate = () => {
    if (!estimateForm.customerName || !estimateForm.customerPhone || estimateForm.products.length === 0) {
      alert('Please fill in all required fields and add at least one product');
      return;
    }

    const updatedEstimate = {
      ...editingEstimate,
      customer: estimateForm.customerName,
      phone: estimateForm.customerPhone,
      email: estimateForm.customerEmail,
      address: estimateForm.customerAddress,
      products: estimateForm.products,
      subtotal: estimateForm.subtotal,
      discount: estimateForm.discount,
      discountType: estimateForm.discountType,
      totalAmount: estimateForm.totalAmount,
      notes: estimateForm.notes,
      validUntil: estimateForm.validUntil,
      isExistingCustomer: estimateForm.isExistingCustomer
    };

    setEstimates(prev => prev.map(est => est.id === editingEstimate.id ? updatedEstimate : est));
    setShowEstimateEditModal(false);
    setEditingEstimate(null);
    alert('Estimate updated successfully!');
  };

  // Email estimate
  const emailEstimate = (estimate) => {
    console.log('Emailing estimate:', estimate.id);
    alert(`Estimate ${estimate.id} sent via email. In a real application, this would send the PDF via email.`);
  };

  // Delete estimate
  const deleteEstimate = (estimate) => {
    setDeletingOrder(estimate);
    setShowDeleteModal(true);
  };

  // Create order
  const createOrder = () => {
    if (!orderForm.customerName || !orderForm.customerPhone || orderForm.products.length === 0) {
      alert('Please fill in all required fields and add at least one product');
      return;
    }

    const newOrder = {
      id: `ORD-${Date.now()}`,
      customer: orderForm.customerName,
      phone: orderForm.customerPhone,
      email: orderForm.customerEmail,
      address: orderForm.customerAddress,
      products: orderForm.products.map(p => p.name),
      totalAmount: orderForm.totalAmount,
      status: 'Pending',
      orderDate: new Date().toISOString().split('T')[0],
      notes: orderForm.notes,
      expectedDelivery: orderForm.expectedDelivery,
      isExistingCustomer: orderForm.isExistingCustomer
    };

    console.log('Creating order:', newOrder);
    
    // Reset form
    setOrderForm({
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      customerAddress: '',
      isExistingCustomer: false,
      products: [],
      subtotal: 0,
      discount: 0,
      discountType: 'percentage',
      totalAmount: 0,
      notes: '',
      expectedDelivery: '',
      selectedProduct: null,
      selectedQuantity: 0
    });
    
    setShowCreateModal(false);
    alert('Order created successfully!');
  };

  const currentOrders = getCurrentOrders();

  const handleCreateOrderSave = () => {
    setCreateOrderView?.(false);
    alert('Order created successfully!');
  };

  if (createOrderView) {
    return (
      <CreateOrder
        onCancel={() => setCreateOrderView?.(false)}
        onSave={handleCreateOrderSave}
      />
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-actions">
        <button 
          className="add-btn estimate-btn"
          onClick={() => setShowEstimateModal(true)}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Create Estimate
        </button>
        <button 
          className="add-btn"
          onClick={() => setCreateOrderView?.(true)}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Order
        </button>
      </div>

      {/* Order Tabs */}
      <div className="filter-section">
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${activeTab === 'estimates' ? 'active' : ''}`}
            onClick={() => setActiveTab('estimates')}
          >
            Estimates ({estimates.length})
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
            <h3>{activeTab === 'estimates' ? 'Customer Estimates' : 'Customer Orders'}</h3>
            <span className="order-count">{currentOrders.length} {activeTab === 'estimates' ? 'estimates' : 'orders'}</span>
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
                <th className="col-id">{activeTab === 'estimates' ? 'Estimate ID' : 'Order ID'}</th>
                <th className="col-customer">Customer</th>
                <th className="col-products">Products</th>
                <th className="col-amount">Total Amount</th>
                <th className="col-status">Status</th>
                <th className="col-date">{activeTab === 'estimates' ? 'Estimate Date' : 'Date'}</th>
                {activeTab !== 'estimates' && <th className="col-assigned">Assigned To</th>}
                {activeTab === 'estimates' && <th className="col-valid">Valid Until</th>}
                {activeTab !== 'estimates' && <th className="col-delivery">Delivery</th>}
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
                      {(order.contact || order.phone) && (
                        <span className="customer-contact">{order.contact || order.phone}</span>
                      )}
                    </div>
                  </td>
                  <td className="col-products">
                    <div className="cell-content">
                      <span className="products-list">
                        {Array.isArray(order.products) 
                          ? order.products.map(p => typeof p === 'string' ? p : p.name).join(', ')
                          : order.products.join(', ')
                        }
                      </span>
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
                      <span className="order-date">{order.orderDate || order.enquiryDate || order.estimateDate}</span>
                    </div>
                  </td>
                  {activeTab !== 'estimates' && (
                    <td className="col-assigned">
                      <div className="cell-content">
                        <span className="assigned-to">{order.assignedTo || '-'}</span>
                      </div>
                    </td>
                  )}
                  {activeTab === 'estimates' && (
                    <td className="col-valid">
                      <div className="cell-content">
                        <span className="valid-until">{order.validUntil || '-'}</span>
                      </div>
                    </td>
                  )}
                  {activeTab !== 'estimates' && (
                    <td className="col-delivery">
                      <div className="cell-content">
                        <span className="delivery-date">
                          {order.expectedDelivery || order.deliveredDate || '-'}
                        </span>
                      </div>
                    </td>
                  )}
                  <td className="col-actions">
                    <div className="cell-content">
                      <div className="action-buttons">
                        {/* <button
                          className="action-btn view"
                          title="View Details"
                          onClick={() => handleViewDetails(order)}
                        >
                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button> */}
                        {activeTab === 'estimates' && (
                          <button
                            className="action-btn preview"
                            title="Preview PDF"
                            onClick={() => previewEstimatePDF(order)}
                          >
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        )}
                        {activeTab === 'estimates' && (
                          <button
                            className="action-btn edit"
                            title="Edit Estimate"
                            onClick={() => editEstimate(order)}
                          >
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        )}
                        {activeTab === 'estimates' && (
                          <button
                            className="action-btn pdf"
                            title="Download PDF"
                            onClick={() => generateEstimatePDF(order)}
                          >
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </button>
                        )}
                        {activeTab === 'estimates' && (
                          <button
                            className="action-btn email"
                            title="Email Estimate"
                            onClick={() => emailEstimate(order)}
                          >
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </button>
                        )}
                        {activeTab === 'estimates' && (
                          <button
                            className="action-btn convert"
                            title="Convert to Order"
                            onClick={() => convertExistingEstimateToOrder(order)}
                          >
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        )}
                        {activeTab !== 'estimates' && order.status === 'Pending' && (
                          <button
                            className="action-btn confirm"
                            title="Confirm Order"
                          >
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        )}
                        {activeTab !== 'estimates' && order.status === 'Assigned' && (
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
                          title="Delete"
                          onClick={() => activeTab === 'estimates' ? deleteEstimate(order) : handleDelete(order)}
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

      {/* Simple Order Creation Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="procurement-modal order-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section">
                <div className="modal-icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="modal-title-content">
                  <h3>Create New Order</h3>
                  <p>Add customer details and select products</p>
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
                {/* Customer Information */}
                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h4>Customer Information</h4>
                    {orderForm.isExistingCustomer && (
                      <span className="existing-customer-badge">
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Existing Customer
                      </span>
                    )}
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Phone Number *
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="tel" 
                          className="form-input" 
                          placeholder="Enter phone number"
                          value={orderForm.customerPhone}
                          onChange={(e) => handleFormChange('customerPhone', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Customer Name *
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Enter customer name"
                          value={orderForm.customerName}
                          onChange={(e) => handleFormChange('customerName', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="email" 
                          className="form-input" 
                          placeholder="Enter email address"
                          value={orderForm.customerEmail}
                          onChange={(e) => handleFormChange('customerEmail', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Address
                      </label>
                      <div className="input-wrapper">
                        <textarea 
                          className="form-input" 
                          placeholder="Enter customer address"
                          rows="2"
                          value={orderForm.customerAddress}
                          onChange={(e) => handleFormChange('customerAddress', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Selection */}
                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h4>Add Products</h4>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Product</label>
                      <div className="input-wrapper">
                        <select 
                          className="form-input"
                          value={orderForm.selectedProduct ? orderForm.selectedProduct.id : ''}
                          onChange={(e) => {
                            const product = availableProducts.find(p => p.id === e.target.value);
                            if (product) {
                              setOrderForm(prev => ({ ...prev, selectedProduct: product }));
                            }
                          }}
                        >
                          <option value="">Select product</option>
                          {availableProducts.map(product => (
                            <option key={product.id} value={product.id}>
                              {product.name} - ₹{product.price}/{product.unit}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Quantity</label>
                      <div className="input-wrapper">
                        <input 
                          type="number" 
                          className="form-input" 
                          placeholder="Enter quantity"
                          min="1"
                          value={orderForm.selectedQuantity || ''}
                          onChange={(e) => {
                            setOrderForm(prev => ({ ...prev, selectedQuantity: parseInt(e.target.value) || 0 }));
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group full-width">
                      <button 
                        type="button" 
                        className="add-product-btn full-width-btn"
                        onClick={() => {
                          if (orderForm.selectedProduct && orderForm.selectedQuantity > 0) {
                            addProductToForm(orderForm.selectedProduct.id, orderForm.selectedQuantity, 'order');
                            setOrderForm(prev => ({ ...prev, selectedProduct: null, selectedQuantity: 0 }));
                          } else {
                            alert('Please select a product and enter quantity');
                          }
                        }}
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Product to Order
                      </button>
                    </div>
                  </div>
                </div>

                {/* Selected Products */}
                {orderForm.products.length > 0 && (
                  <div className="form-section">
                    <div className="section-header">
                      <div className="section-icon">
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <h4>Selected Products ({orderForm.products.length})</h4>
                    </div>
                    
                    <div className="selected-products-list">
                      {orderForm.products.map((product, index) => (
                        <div key={product.id} className="product-item">
                          <div className="product-info">
                            <h5>{product.name}</h5>
                            <p>{product.category} • ₹{product.price}/{product.unit}</p>
                          </div>
                          <div className="product-quantity">
                           <button 
                             className="qty-btn"
                             onClick={() => updateProductQuantity(product.id, product.quantity - 1, 'order')}
                           >
                             -
                           </button>
                           <span>{product.quantity}</span>
                           <button 
                             className="qty-btn"
                             onClick={() => updateProductQuantity(product.id, product.quantity + 1, 'order')}
                           >
                             +
                           </button>
                          </div>
                          <div className="product-total">
                            ₹{product.totalPrice.toLocaleString()}
                          </div>
                           <button 
                             className="remove-btn"
                             onClick={() => removeProductFromForm(product.id, 'order')}
                           >
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Order Summary */}
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
                      <span>₹{orderForm.subtotal.toLocaleString()}</span>
                    </div>
                    
                    <div className="discount-section">
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Discount</label>
                          <div className="input-wrapper">
                            <input 
                              type="number" 
                              className="form-input" 
                              placeholder="Enter discount"
                              value={orderForm.discount}
                              onChange={(e) => handleFormChange('discount', parseFloat(e.target.value) || 0)}
                            />
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Type</label>
                          <div className="input-wrapper">
                            <select 
                              className="form-input"
                              value={orderForm.discountType}
                              onChange={(e) => handleFormChange('discountType', e.target.value)}
                            >
                              <option value="percentage">Percentage (%)</option>
                              <option value="fixed">Fixed Amount (₹)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="summary-item total">
                      <span>Total Amount:</span>
                      <span>₹{orderForm.totalAmount.toLocaleString()}</span>
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
                  <button 
                    type="button" 
                    className="btn-primary"
                    onClick={createOrder}
                  >
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

      {/* Estimate Modal */}
      {showEstimateModal && (
        <div className="modal-overlay" onClick={() => setShowEstimateModal(false)}>
          <div className="procurement-modal estimate-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section">
                <div className="modal-icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="modal-title-content">
                  <h3>Create Estimate</h3>
                  <p>Generate estimate for customer discussion and pricing</p>
                </div>
              </div>
              <button 
                className="modal-close"
                onClick={() => setShowEstimateModal(false)}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <form className="procurement-form">
                {/* Customer Information */}
                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h4>Customer Information</h4>
                    {estimateForm.isExistingCustomer && (
                      <span className="existing-customer-badge">
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Existing Customer
                      </span>
                    )}
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Phone Number *
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="tel" 
                          className="form-input" 
                          placeholder="Enter phone number"
                          value={estimateForm.customerPhone}
                          onChange={(e) => handleEstimateFormChange('customerPhone', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Customer Name *
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Enter customer name"
                          value={estimateForm.customerName}
                          onChange={(e) => handleEstimateFormChange('customerName', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="email" 
                          className="form-input" 
                          placeholder="Enter email address"
                          value={estimateForm.customerEmail}
                          onChange={(e) => handleEstimateFormChange('customerEmail', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Address
                      </label>
                      <div className="input-wrapper">
                        <textarea 
                          className="form-input" 
                          placeholder="Enter customer address"
                          rows="2"
                          value={estimateForm.customerAddress}
                          onChange={(e) => handleEstimateFormChange('customerAddress', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Selection */}
                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h4>Add Products</h4>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Product</label>
                      <div className="input-wrapper">
                        <select 
                          className="form-input"
                          value={estimateForm.selectedProduct ? estimateForm.selectedProduct.id : ''}
                          onChange={(e) => {
                            const product = availableProducts.find(p => p.id === e.target.value);
                            if (product) {
                              setEstimateForm(prev => ({ ...prev, selectedProduct: product }));
                            }
                          }}
                        >
                          <option value="">Select product</option>
                          {availableProducts.map(product => (
                            <option key={product.id} value={product.id}>
                              {product.name} - ₹{product.price}/{product.unit}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Quantity</label>
                      <div className="input-wrapper">
                        <input 
                          type="number" 
                          className="form-input" 
                          placeholder="Enter quantity"
                          min="1"
                          value={estimateForm.selectedQuantity || ''}
                          onChange={(e) => {
                            setEstimateForm(prev => ({ ...prev, selectedQuantity: parseInt(e.target.value) || 0 }));
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group full-width">
                      <button 
                        type="button" 
                        className="add-product-btn full-width-btn"
                        onClick={() => {
                          if (estimateForm.selectedProduct && estimateForm.selectedQuantity > 0) {
                            addProductToForm(estimateForm.selectedProduct.id, estimateForm.selectedQuantity, 'estimate');
                            setEstimateForm(prev => ({ ...prev, selectedProduct: null, selectedQuantity: 0 }));
                          } else {
                            alert('Please select a product and enter quantity');
                          }
                        }}
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Product to Estimate
                      </button>
                    </div>
                  </div>
                </div>

                {/* Selected Products */}
                {estimateForm.products.length > 0 && (
                  <div className="form-section">
                    <div className="section-header">
                      <div className="section-icon">
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <h4>Selected Products ({estimateForm.products.length})</h4>
                    </div>
                    
                    <div className="selected-products-list">
                      {estimateForm.products.map((product, index) => (
                        <div key={product.id} className="product-item">
                          <div className="product-info">
                            <h5>{product.name}</h5>
                            <p>{product.category} • ₹{product.price}/{product.unit}</p>
                          </div>
                          <div className="product-quantity">
                            <button 
                              className="qty-btn"
                              onClick={() => updateProductQuantity(product.id, product.quantity - 1, 'estimate')}
                            >
                              -
                            </button>
                            <span>{product.quantity}</span>
                            <button 
                              className="qty-btn"
                              onClick={() => updateProductQuantity(product.id, product.quantity + 1, 'estimate')}
                            >
                              +
                            </button>
                          </div>
                          <div className="product-total">
                            ₹{product.totalPrice.toLocaleString()}
                          </div>
                          <button 
                            className="remove-btn"
                            onClick={() => removeProductFromForm(product.id, 'estimate')}
                          >
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Estimate Summary */}
                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4>Estimate Summary</h4>
                  </div>
                  
                  <div className="order-summary">
                    <div className="summary-item">
                      <span>Subtotal:</span>
                      <span>₹{estimateForm.subtotal.toLocaleString()}</span>
                    </div>
                    
                    <div className="discount-section">
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Discount</label>
                          <div className="input-wrapper">
                            <input 
                              type="number" 
                              className="form-input" 
                              placeholder="Enter discount"
                              value={estimateForm.discount}
                              onChange={(e) => handleEstimateFormChange('discount', parseFloat(e.target.value) || 0)}
                            />
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Type</label>
                          <div className="input-wrapper">
                            <select 
                              className="form-input"
                              value={estimateForm.discountType}
                              onChange={(e) => handleEstimateFormChange('discountType', e.target.value)}
                            >
                              <option value="percentage">Percentage (%)</option>
                              <option value="fixed">Fixed Amount (₹)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="summary-item total">
                      <span>Total Amount:</span>
                      <span>₹{estimateForm.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>


                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => setShowEstimateModal(false)}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn-primary convert-btn"
                    onClick={convertEstimateToOrder}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Convert to Order
                  </button>
                  <button 
                    type="button" 
                    className="btn-primary"
                    onClick={createEstimate}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Create Estimate
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Estimate Edit Modal */}
      {showEstimateEditModal && (
        <div className="modal-overlay" onClick={() => setShowEstimateEditModal(false)}>
          <div className="procurement-modal estimate-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section">
                <div className="modal-icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div className="modal-title-content">
                  <h3>Edit Estimate - {editingEstimate?.id}</h3>
                  <p>Modify estimate details and products</p>
                </div>
              </div>
              <button 
                className="modal-close"
                onClick={() => setShowEstimateEditModal(false)}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <form className="procurement-form">
                {/* Customer Information */}
                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h4>Customer Information</h4>
                    {estimateForm.isExistingCustomer && (
                      <span className="existing-customer-badge">
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Existing Customer
                      </span>
                    )}
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Phone Number *
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="tel" 
                          className="form-input" 
                          placeholder="Enter phone number"
                          value={estimateForm.customerPhone}
                          onChange={(e) => handleEstimateFormChange('customerPhone', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Customer Name *
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Enter customer name"
                          value={estimateForm.customerName}
                          onChange={(e) => handleEstimateFormChange('customerName', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email
                      </label>
                      <div className="input-wrapper">
                        <input 
                          type="email" 
                          className="form-input" 
                          placeholder="Enter email address"
                          value={estimateForm.customerEmail}
                          onChange={(e) => handleEstimateFormChange('customerEmail', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Address
                      </label>
                      <div className="input-wrapper">
                        <textarea 
                          className="form-input" 
                          placeholder="Enter customer address"
                          rows="2"
                          value={estimateForm.customerAddress}
                          onChange={(e) => handleEstimateFormChange('customerAddress', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Selection - Same as create estimate */}
                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h4>Add Products</h4>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Product</label>
                      <div className="input-wrapper">
                        <select 
                          className="form-input"
                          value={estimateForm.selectedProduct ? estimateForm.selectedProduct.id : ''}
                          onChange={(e) => {
                            const product = availableProducts.find(p => p.id === e.target.value);
                            if (product) {
                              setEstimateForm(prev => ({ ...prev, selectedProduct: product }));
                            }
                          }}
                        >
                          <option value="">Select product</option>
                          {availableProducts.map(product => (
                            <option key={product.id} value={product.id}>
                              {product.name} - ₹{product.price}/{product.unit}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Quantity</label>
                      <div className="input-wrapper">
                        <input 
                          type="number" 
                          className="form-input" 
                          placeholder="Enter quantity"
                          min="1"
                          value={estimateForm.selectedQuantity || ''}
                          onChange={(e) => {
                            setEstimateForm(prev => ({ ...prev, selectedQuantity: parseInt(e.target.value) || 0 }));
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group full-width">
                      <button 
                        type="button" 
                        className="add-product-btn full-width-btn"
                        onClick={() => {
                          if (estimateForm.selectedProduct && estimateForm.selectedQuantity > 0) {
                            addProductToForm(estimateForm.selectedProduct.id, estimateForm.selectedQuantity, 'estimate');
                            setEstimateForm(prev => ({ ...prev, selectedProduct: null, selectedQuantity: 0 }));
                          } else {
                            alert('Please select a product and enter quantity');
                          }
                        }}
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Product to Estimate
                      </button>
                    </div>
                  </div>
                </div>

                {/* Selected Products - Same as create estimate */}
                {estimateForm.products.length > 0 && (
                  <div className="form-section">
                    <div className="section-header">
                      <div className="section-icon">
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <h4>Selected Products ({estimateForm.products.length})</h4>
                    </div>
                    
                    <div className="selected-products-list">
                      {estimateForm.products.map((product, index) => (
                        <div key={product.id} className="product-item">
                          <div className="product-info">
                            <h5>{product.name}</h5>
                            <p>{product.category} • ₹{product.price}/{product.unit}</p>
                          </div>
                          <div className="product-quantity">
                            <button 
                              className="qty-btn"
                              onClick={() => updateProductQuantity(product.id, product.quantity - 1, 'estimate')}
                            >
                              -
                            </button>
                            <span>{product.quantity}</span>
                            <button 
                              className="qty-btn"
                              onClick={() => updateProductQuantity(product.id, product.quantity + 1, 'estimate')}
                            >
                              +
                            </button>
                          </div>
                          <div className="product-total">
                            ₹{product.totalPrice.toLocaleString()}
                          </div>
                          <button 
                            className="remove-btn"
                            onClick={() => removeProductFromForm(product.id, 'estimate')}
                          >
                            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Estimate Summary - Same as create estimate */}
                <div className="form-section">
                  <div className="section-header">
                    <div className="section-icon">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4>Estimate Summary</h4>
                  </div>
                  
                  <div className="order-summary">
                    <div className="summary-item">
                      <span>Subtotal:</span>
                      <span>₹{estimateForm.subtotal.toLocaleString()}</span>
                    </div>
                    
                    <div className="discount-section">
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Discount</label>
                          <div className="input-wrapper">
                            <input 
                              type="number" 
                              className="form-input" 
                              placeholder="Enter discount"
                              value={estimateForm.discount}
                              onChange={(e) => handleEstimateFormChange('discount', parseFloat(e.target.value) || 0)}
                            />
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <label className="form-label">Type</label>
                          <div className="input-wrapper">
                            <select 
                              className="form-input"
                              value={estimateForm.discountType}
                              onChange={(e) => handleEstimateFormChange('discountType', e.target.value)}
                            >
                              <option value="percentage">Percentage (%)</option>
                              <option value="fixed">Fixed Amount (₹)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="summary-item total">
                      <span>Total Amount:</span>
                      <span>₹{estimateForm.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => setShowEstimateEditModal(false)}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn-primary"
                    onClick={saveEditedEstimate}
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Estimate PDF Preview Modal */}
      {showEstimatePreviewModal && selectedEstimate && (
        <div className="modal-overlay" onClick={() => setShowEstimatePreviewModal(false)}>
          <div className="procurement-modal pdf-preview-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-section">
                <div className="modal-icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="modal-title-content">
                  <h3>Estimate PDF Preview - {selectedEstimate.id}</h3>
                  <p>Preview and manage estimate document</p>
                </div>
              </div>
              <button 
                className="modal-close"
                onClick={() => setShowEstimatePreviewModal(false)}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="pdf-preview-content">
                <div className="pdf-header">
                  <h2>ESTIMATE</h2>
                  <div className="estimate-info">
                    <p><strong>Estimate #:</strong> {selectedEstimate.id}</p>
                    <p><strong>Date:</strong> {selectedEstimate.estimateDate}</p>
                    <p><strong>Valid Until:</strong> {selectedEstimate.validUntil}</p>
                  </div>
                </div>
                
                <div className="pdf-customer">
                  <h3>Bill To:</h3>
                  <p><strong>{selectedEstimate.customer}</strong></p>
                  <p>{selectedEstimate.phone}</p>
                  <p>{selectedEstimate.email}</p>
                  <p>{selectedEstimate.address}</p>
                </div>
                
                <div className="pdf-products">
                  <h3>Products & Services:</h3>
                  <table className="pdf-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedEstimate.products.map((product, index) => (
                        <tr key={index}>
                          <td>{product.name}</td>
                          <td>{product.quantity}</td>
                          <td>₹{product.price}</td>
                          <td>₹{product.totalPrice.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="pdf-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>₹{selectedEstimate.subtotal.toLocaleString()}</span>
                  </div>
                  {selectedEstimate.discount > 0 && (
                    <div className="summary-row">
                      <span>Discount ({selectedEstimate.discountType === 'percentage' ? selectedEstimate.discount + '%' : '₹' + selectedEstimate.discount}):</span>
                      <span>-₹{selectedEstimate.discountType === 'percentage' ? ((selectedEstimate.subtotal * selectedEstimate.discount) / 100).toLocaleString() : selectedEstimate.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="summary-row total">
                    <span><strong>Total Amount:</strong></span>
                    <span><strong>₹{selectedEstimate.totalAmount.toLocaleString()}</strong></span>
                  </div>
                </div>
                
                {selectedEstimate.notes && (
                  <div className="pdf-notes">
                    <h3>Notes:</h3>
                    <p>{selectedEstimate.notes}</p>
                  </div>
                )}
              </div>
              
              <div className="pdf-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowEstimatePreviewModal(false)}
                >
                  Close
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => generateEstimatePDF(selectedEstimate)}
                >
                  Download PDF
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => emailEstimate(selectedEstimate)}
                >
                  Email Estimate
                </button>
              </div>
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
