import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';
import { settingsService } from '../services/settingsService';
import toast from 'react-hot-toast';
import ThemeToggle from './common/ThemeToggle.jsx';
import './auth/auth.css';

const SuperAdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const [carriers, setCarriers] = useState([]);
  const [filteredCarriers, setFilteredCarriers] = useState([]);
  const [activeFilters, setActiveFilters] = useState(['all']);
  const [selectedCarrier, setSelectedCarrier] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [navigationMode, setNavigationMode] = useState(settingsService.getNavigationMode());
  const [showSidebar, setShowSidebar] = useState(settingsService.shouldShowSidebar());
  const [showHeaderNav, setShowHeaderNav] = useState(settingsService.shouldShowHeaderNav());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'superadmin') {
      navigate('/auth');
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  useEffect(() => {
    // Sync active section with current route
    const path = location.pathname;
    if (path.includes('/carriers')) {
      setActiveSection('carriers');
    } else if (path.includes('/settings')) {
      setActiveSection('settings');
    } else {
      setActiveSection('dashboard');
    }
  }, [location]);

  // Sync navigation visibility with settings
  useEffect(() => {
    const mode = settingsService.getNavigationMode();
    setNavigationMode(mode);
    setShowSidebar(settingsService.shouldShowSidebar());
    setShowHeaderNav(settingsService.shouldShowHeaderNav());
  }, [activeSection]); // Re-check when settings section is active

  // Mock carriers data
  useEffect(() => {
    const mockCarriers = [
      {
        id: 1,
        name: 'Global Logistics Corp',
        code: 'GLC-8829',
        logo: 'https://via.placeholder.com/60',
        email: 'contact@glc.com',
        phone: '+1-555-0101',
        status: 'active',
        createdAt: '2024-01-15',
        address: '123 Logistics Ave, Memphis, TN 38116',
        assignedAdmin: { name: 'Sarah Jenkins', avatar: 'https://via.placeholder.com/32' },
        terminals: { active: 14, pending: 0 },
        totalUsers: 45,
        totalInvoices: 1200,
        trend: { value: 5, type: 'increase' },
      },
      {
        id: 2,
        name: 'Swift-Link Freight',
        code: 'SLF-4410',
        logo: 'https://via.placeholder.com/60',
        email: 'info@swiftlink.com',
        phone: '+1-555-0102',
        status: 'inactive',
        createdAt: '2024-02-20',
        address: '55 Glenlake Parkway, Atlanta, GA 30328',
        assignedAdmin: { name: 'Mark Rivera', avatar: 'https://via.placeholder.com/32' },
        terminals: { active: 0, pending: 0 },
        totalUsers: 32,
        totalInvoices: 890,
        trend: { value: 2, type: 'increase' },
      },
      {
        id: 3,
        name: 'Nexus Logistics',
        code: 'NEX-1192',
        logo: 'https://via.placeholder.com/60',
        email: 'support@nexus.com',
        phone: '+1-555-0103',
        status: 'pending',
        createdAt: '2024-03-10',
        address: '1200 Harbor Blvd, Weehawken, NJ 07087',
        assignedAdmin: null,
        terminals: { active: 0, pending: 3 },
        totalUsers: 0,
        totalInvoices: 0,
        trend: { value: 1, type: 'decrease' },
      },
      {
        id: 4,
        name: 'Amazon Logistics',
        code: 'AMZ-0045',
        logo: 'https://via.placeholder.com/60',
        email: 'logistics@amazon.com',
        phone: '+1-555-0104',
        status: 'active',
        createdAt: '2024-01-05',
        address: '410 Terry Ave N, Seattle, WA 98109',
        assignedAdmin: { name: 'Emily Davis', avatar: 'https://via.placeholder.com/32' },
        terminals: { active: 28, pending: 2 },
        totalUsers: 78,
        totalInvoices: 2100,
        trend: { value: 8, type: 'increase' },
      },
      {
        id: 5,
        name: 'TNT Express',
        code: 'TNT-0056',
        logo: 'https://via.placeholder.com/60',
        email: 'contact@tnt.com',
        phone: '+1-555-0105',
        status: 'pending',
        createdAt: '2024-03-25',
        address: '1000 Corporate Blvd, Suite 200, Norcross, GA 30093',
        assignedAdmin: null,
        terminals: { active: 0, pending: 5 },
        totalUsers: 0,
        totalInvoices: 0,
        trend: { value: 2, type: 'increase' },
      },
    ];
    setCarriers(mockCarriers);
    setFilteredCarriers(mockCarriers);
  }, []);

  // Filter carriers based on active filters
  useEffect(() => {
    let filtered = [...carriers];
    
    if (activeFilters.length > 0 && !activeFilters.includes('all')) {
      filtered = filtered.filter(carrier => 
        activeFilters.includes(carrier.status)
      );
    }
    
    setFilteredCarriers(filtered);
  }, [activeFilters, carriers]);

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ), 
      path: '/super-admin/dashboard' 
    },
    { 
      id: 'carriers', 
      label: 'Carriers', 
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ), 
      path: '/super-admin/carriers' 
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ), 
      path: '/super-admin/settings' 
    }
  ];

  const bottomMenuItems = [
    { 
      id: 'help', 
      label: 'Help & Information', 
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ), 
      path: '/super-admin/help' 
    },
    { 
      id: 'logout', 
      label: 'Log out', 
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ), 
      action: 'logout' 
    }
  ];

  const handleMenuClick = (item) => {
    setActiveSection(item.id);
    navigate(item.path);
  };

  const handleBottomMenuClick = (item) => {
    if (item.action === 'logout') {
      handleLogout();
    } else {
      setActiveSection(item.id);
      navigate(item.path);
    }
  };

  const toggleSidebarPin = () => {
    if (sidebarPinned) {
      setSidebarPinned(false);
      setSidebarCollapsed(true);
    } else {
      setSidebarPinned(true);
      setSidebarCollapsed(false);
    }
  };

  const handleLogout = async () => {
    const result = await authService.logout();
    if (result.success) {
      toast.success('Logged out successfully');
      navigate('/auth');
    }
  };

  // Calculate carrier statistics
  const getCarrierStats = () => {
    const total = carriers.length;
    const active = carriers.filter(c => c.status === 'active').length;
    const pending = carriers.filter(c => c.status === 'pending').length;
    
    return {
      total,
      active,
      pending,
      totalTrend: { value: 5, type: 'increase' },
      activeTrend: { value: 2, type: 'increase' },
      pendingTrend: { value: 1, type: 'decrease' },
    };
  };

  // Handle filter tag removal
  const removeFilter = (filterToRemove) => {
    setActiveFilters(activeFilters.filter(f => f !== filterToRemove));
  };

  // Handle filter selection
  const addFilter = (status) => {
    if (!activeFilters.includes(status)) {
      setActiveFilters([...activeFilters, status]);
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  // Handle view details
  const handleViewDetails = (carrier) => {
    setSelectedCarrier(carrier);
    setDrawerOpen(true);
  };

  // Close drawer
  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedCarrier(null);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            <h2 className="content-title">Super Admin Dashboard</h2>
            <p className="content-description">Manage organizations and carriers</p>
            <div className="content-grid">
              <div className="content-card">
                <h3>Total Organizations</h3>
                <p className="content-number">0</p>
              </div>
              <div className="content-card">
                <h3>Active Carriers</h3>
                <p className="content-number">0</p>
              </div>
              <div className="content-card">
                <h3>Total Users</h3>
                <p className="content-number">0</p>
              </div>
            </div>
          </div>
        );
      case 'carriers':
        const stats = getCarrierStats();
        const selectedFilter = activeFilters.length > 0 ? activeFilters[0] : 'all';
        return (
          <div className="carriers-page">
            {/* Page Header */}
            <div className="carriers-page-header">
              <div className="carriers-page-title-section">
                <h1 className="carriers-page-title">Manage Partners</h1>
                <p className="carriers-page-subtitle">
                  Overview of all registered logistics carriers, their assigned administrative staff, and current operational health.
                </p>
              </div>
              <button className="btn-create-carrier">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create New Carrier
              </button>
            </div>

            {/* Summary Cards */}
            <div className="carriers-summary-cards">
              <div className="summary-card">
                <div className="summary-card-header">
                  <span className="summary-card-label">Total Carriers</span>
                  <span className={`summary-card-trend ${stats.totalTrend.type}`}>
                    {stats.totalTrend.type === 'increase' ? '+' : '-'}{stats.totalTrend.value}%
                  </span>
                </div>
                <div className="summary-card-value">{stats.total}</div>
              </div>
              <div className="summary-card active">
                <div className="summary-card-header">
                  <span className="summary-card-label">Active Partners</span>
                  <span className={`summary-card-trend ${stats.activeTrend.type}`}>
                    {stats.activeTrend.type === 'increase' ? '+' : '-'}{stats.activeTrend.value}%
                  </span>
                </div>
                <div className="summary-card-value">{stats.active}</div>
              </div>
              <div className="summary-card pending">
                <div className="summary-card-header">
                  <span className="summary-card-label">Pending Setup</span>
                  <span className={`summary-card-trend ${stats.pendingTrend.type}`}>
                    {stats.pendingTrend.type === 'increase' ? '+' : '-'}{stats.pendingTrend.value}%
                  </span>
                </div>
                <div className="summary-card-value">{stats.pending}</div>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="carriers-filters">
              <button 
                className={`filter-pill ${selectedFilter === 'all' ? 'active' : ''}`}
                onClick={() => {
                  setActiveFilters(['all']);
                }}
              >
                All Carriers
                {selectedFilter === 'all' && (
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
              <button 
                className={`filter-pill ${selectedFilter === 'active' ? 'active' : ''}`}
                onClick={() => {
                  setActiveFilters(['active']);
                }}
              >
                Active
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button 
                className={`filter-pill ${selectedFilter === 'region' ? 'active' : ''}`}
                onClick={() => {
                  setShowFilters(!showFilters);
                }}
              >
                Region
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeFilters.length > 0 && (
                <button className="clear-filters-link" onClick={clearAllFilters}>
                  Clear Filters
                </button>
              )}
            </div>

            {/* Carrier Partner Cards Grid */}
            <div className="partners-grid">
              {filteredCarriers.map((carrier) => (
                <div key={carrier.id} className={`partner-card ${carrier.status === 'active' ? 'highlighted' : ''}`}>
                  <div className="partner-card-icon">
                    <img src={carrier.logo} alt={carrier.name} />
                  </div>
                  <div className="partner-card-content">
                    <h3 className="partner-name">{carrier.name}</h3>
                    <div className="partner-id">ID: {carrier.code}</div>
                    <div className="partner-admin">
                      {carrier.assignedAdmin ? (
                        <>
                          <img src={carrier.assignedAdmin.avatar} alt={carrier.assignedAdmin.name} className="admin-avatar" />
                          <span>{carrier.assignedAdmin.name}</span>
                        </>
                      ) : (
                        <button className="assign-admin-btn">
                          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Assign Now
                        </button>
                      )}
                    </div>
                    <div className="partner-terminals">
                      {carrier.terminals.active > 0 ? (
                        <span className="terminals-active">{carrier.terminals.active} Active</span>
                      ) : carrier.terminals.pending > 0 ? (
                        <span className="terminals-pending">{carrier.terminals.pending} Pending</span>
                      ) : (
                        <span className="terminals-none">0 Active</span>
                      )}
                    </div>
                  </div>
                  <div className="partner-card-footer">
                    <span className={`partner-status ${carrier.status}`}>
                      • {carrier.status === 'active' ? 'ACTIVE' : carrier.status === 'pending' ? 'PENDING SETUP' : 'INACTIVE'}
                    </span>
                    <button 
                      className="partner-action-link"
                      onClick={() => carrier.status === 'pending' ? handleViewDetails(carrier) : handleViewDetails(carrier)}
                    >
                      {carrier.status === 'pending' ? 'Complete Setup →' : 'View Details →'}
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Add Carrier Partner Card */}
              <div className="partner-card add-card" onClick={() => toast.success('Add carrier functionality coming soon')}>
                <div className="add-card-icon">
                  <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="add-card-content">
                  <h3 className="add-card-title">Add Carrier Partner</h3>
                  <p className="add-card-subtitle">Configure a new logistics gateway</p>
                </div>
              </div>
            </div>

            {/* Carrier Details Drawer */}
            {drawerOpen && selectedCarrier && (
              <div className="drawer-overlay" onClick={closeDrawer}>
                <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
                  <div className="drawer-header">
                    <h2 className="drawer-title">Carrier Details</h2>
                    <button className="drawer-close-btn" onClick={closeDrawer}>
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="drawer-body">
                    <div className="drawer-section">
                      <div className="drawer-logo-section">
                        <img src={selectedCarrier.logo} alt={selectedCarrier.name} className="drawer-logo" />
                        <div>
                          <h3 className="drawer-carrier-name">{selectedCarrier.name}</h3>
                          <p className="drawer-carrier-code">Code: {selectedCarrier.code}</p>
                          <span className={`status-tag ${selectedCarrier.status}`}>
                            {selectedCarrier.status.charAt(0).toUpperCase() + selectedCarrier.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="drawer-section">
                      <h4 className="drawer-section-title">Administration</h4>
                      <div className="drawer-info-grid">
                        <div className="drawer-info-item">
                          <label>Assigned Admin</label>
                          {selectedCarrier.assignedAdmin ? (
                            <div className="drawer-admin-info">
                              <img src={selectedCarrier.assignedAdmin.avatar} alt={selectedCarrier.assignedAdmin.name} className="drawer-admin-avatar" />
                              <p>{selectedCarrier.assignedAdmin.name}</p>
                            </div>
                          ) : (
                            <button className="assign-admin-btn">
                              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              Assign Admin
                            </button>
                          )}
                        </div>
                        <div className="drawer-info-item">
                          <label>Terminals</label>
                          <div className="drawer-terminals-info">
                            <span className="terminals-active">{selectedCarrier.terminals.active} Active</span>
                            {selectedCarrier.terminals.pending > 0 && (
                              <span className="terminals-pending">{selectedCarrier.terminals.pending} Pending</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="drawer-section">
                      <h4 className="drawer-section-title">Contact Information</h4>
                      <div className="drawer-info-grid">
                        <div className="drawer-info-item">
                          <label>Email</label>
                          <p>{selectedCarrier.email}</p>
                        </div>
                        <div className="drawer-info-item">
                          <label>Phone</label>
                          <p>{selectedCarrier.phone}</p>
                        </div>
                        <div className="drawer-info-item">
                          <label>Address</label>
                          <p>{selectedCarrier.address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="drawer-section">
                      <h4 className="drawer-section-title">Statistics</h4>
                      <div className="drawer-stats-grid">
                        <div className="drawer-stat-item">
                          <label>Total Users</label>
                          <p className="drawer-stat-value">{selectedCarrier.totalUsers}</p>
                        </div>
                        <div className="drawer-stat-item">
                          <label>Total Invoices</label>
                          <p className="drawer-stat-value">{selectedCarrier.totalInvoices}</p>
                        </div>
                        <div className="drawer-stat-item">
                          <label>Created Date</label>
                          <p className="drawer-stat-value">{selectedCarrier.createdAt}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="drawer-footer">
                    <button className="btn-secondary" onClick={closeDrawer}>Close</button>
                    <button className="btn-primary">Edit Carrier</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 'settings':
        const handleNavigationModeChange = (mode) => {
          const result = settingsService.setNavigationMode(mode);
          if (result.success) {
            setNavigationMode(mode);
            setShowSidebar(settingsService.shouldShowSidebar());
            setShowHeaderNav(settingsService.shouldShowHeaderNav());
            toast.success('Navigation preference saved');
          } else {
            toast.error(result.error || 'Failed to save preference');
          }
        };

        return (
          <div className="dashboard-content">
            <h2 className="content-title">Settings</h2>
            <p className="content-description">Configure system settings and preferences</p>
            <div className="settings-container">
              <div className="settings-section">
                <h3 className="settings-section-title">Navigation Settings</h3>
                <div className="settings-item">
                  <label>Navigation Display</label>
                  <p className="settings-description">Choose how you want to navigate through the application</p>
                  <div className="navigation-options">
                    <label className="navigation-option">
                      <input
                        type="radio"
                        name="navigation-mode"
                        value={settingsService.getNavigationModes().BOTH}
                        checked={navigationMode === settingsService.getNavigationModes().BOTH}
                        onChange={(e) => handleNavigationModeChange(e.target.value)}
                      />
                      <div className="navigation-option-content">
                        <div className="navigation-option-title">Both Sidebar & Header</div>
                        <div className="navigation-option-description">Show navigation in both sidebar and header</div>
                      </div>
                    </label>
                    <label className="navigation-option">
                      <input
                        type="radio"
                        name="navigation-mode"
                        value={settingsService.getNavigationModes().SIDEBAR_ONLY}
                        checked={navigationMode === settingsService.getNavigationModes().SIDEBAR_ONLY}
                        onChange={(e) => handleNavigationModeChange(e.target.value)}
                      />
                      <div className="navigation-option-content">
                        <div className="navigation-option-title">Sidebar Only</div>
                        <div className="navigation-option-description">Show navigation only in the sidebar menu</div>
                      </div>
                    </label>
                    <label className="navigation-option">
                      <input
                        type="radio"
                        name="navigation-mode"
                        value={settingsService.getNavigationModes().HEADER_ONLY}
                        checked={navigationMode === settingsService.getNavigationModes().HEADER_ONLY}
                        onChange={(e) => handleNavigationModeChange(e.target.value)}
                      />
                      <div className="navigation-option-content">
                        <div className="navigation-option-title">Header Only</div>
                        <div className="navigation-option-description">Show navigation only in the header</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="settings-section">
                <h3 className="settings-section-title">General Settings</h3>
                <div className="settings-item">
                  <label>System Name</label>
                  <input type="text" placeholder="TMS Billing System" />
                </div>
                <div className="settings-item">
                  <label>Default Timezone</label>
                  <select>
                    <option>UTC</option>
                    <option>EST</option>
                    <option>PST</option>
                  </select>
                </div>
              </div>
              <div className="settings-section">
                <h3 className="settings-section-title">Security Settings</h3>
                <div className="settings-item">
                  <label>Session Timeout (minutes)</label>
                  <input type="number" placeholder="30" />
                </div>
                <div className="settings-item">
                  <label>Password Policy</label>
                  <select>
                    <option>Standard</option>
                    <option>Strong</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="dashboard-content">
            <h2 className="content-title">Super Admin Dashboard</h2>
            <p className="content-description">Manage organizations and carriers</p>
          </div>
        );
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className={`dashboard-container ${!showSidebar ? 'no-sidebar' : ''}`}>
      {/* Sidebar */}
      {showSidebar && (
      <aside className={`dashboard-sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${sidebarPinned ? 'pinned' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            {!sidebarCollapsed && <span className="sidebar-title">Super Admin</span>}
          </div>
          <button 
            className="sidebar-pin-btn"
            onClick={toggleSidebarPin}
            title={sidebarPinned ? 'Unpin Sidebar' : 'Pin Sidebar'}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6zM4 5h6V1H4v4zM15 3h5l-5 5V3z" />
            </svg>
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleMenuClick(item)}
              title={sidebarCollapsed ? item.label : ''}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {!sidebarCollapsed && <span className="sidebar-label">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <nav className="sidebar-bottom-nav">
            {bottomMenuItems.map((item) => (
              <button
                key={item.id}
                className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleBottomMenuClick(item)}
                title={sidebarCollapsed ? item.label : ''}
              >
                <span className="sidebar-icon">{item.icon}</span>
                {!sidebarCollapsed && <span className="sidebar-label">{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>
      </aside>
      )}

      {/* Main Content Area */}
      <div className="dashboard-main-area">
         {/* Dashboard Header */}
         <header className="dashboard-header">
           <div className="dashboard-header-content">
             <div className="dashboard-nav-wrapper">
               {showHeaderNav && (
               <nav className="dashboard-nav">
                 {menuItems.map((item) => (
                   <button
                     key={item.id}
                     className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                     onClick={() => handleMenuClick(item)}
                   >
                     <span className="nav-icon">{item.icon}</span>
                     <span className="nav-label">{item.label}</span>
                   </button>
                 ))}
               </nav>
               )}
             </div>

           <div className="dashboard-user">
            <span className="user-name">Hello, {user.firstName}</span>
            <ThemeToggle/>
            <div className="user-avatar">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <button
              onClick={() => handleMenuClick({ id: 'settings', path: '/super-admin/settings' })}
              className="settings-btn"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="dashboard-main">
        {renderContent()}
      </main>
    </div>
    </div>
  );
};

export default SuperAdminDashboard;

