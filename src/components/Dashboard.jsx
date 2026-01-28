import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { settingsService } from '../services/settingsService';
import toast from 'react-hot-toast';
import Procurement from './Procurement';
import Products from './Products';
import Orders from './Orders';
import Billing from './Billing';
import Reports from './Reports';
import Settings from './Settings';
import ThemeToggle from './common/ThemeToggle.jsx';
import './auth/auth.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const [navigationMode, setNavigationMode] = useState(settingsService.getNavigationMode());
  const [showSidebar, setShowSidebar] = useState(settingsService.shouldShowSidebar());
  const [showHeaderNav, setShowHeaderNav] = useState(settingsService.shouldShowHeaderNav());
  const [activeSettingsTab, setActiveSettingsTab] = useState('appearance');
  const [settingsFormData, setSettingsFormData] = useState({
    systemName: 'TMS Billing System',
    timezone: 'UTC',
    sessionTimeout: 30,
    passwordPolicy: 'Standard',
    emailNotifications: true,
    smsNotifications: false,
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  // Sync navigation visibility with settings
  useEffect(() => {
    const mode = settingsService.getNavigationMode();
    setNavigationMode(mode);
    setShowSidebar(settingsService.shouldShowSidebar());
    setShowHeaderNav(settingsService.shouldShowHeaderNav());
  }, [activeSection]); // Re-check when settings section is active

  const menuItems = [
    { 
      id: 'home', 
      label: 'Dashboard', 
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ), 
      path: '/dashboard' 
    },
    { 
      id: 'procurement', 
      label: 'Procurement', 
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ), 
      path: '/dashboard/procurement' 
    },
    { 
      id: 'products', 
      label: 'Stock Management', 
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ), 
      path: '/dashboard/products' 
    },
    { 
      id: 'orders', 
      label: 'Orders', 
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ), 
      path: '/dashboard/orders' 
    },
    { 
      id: 'billing', 
      label: 'Billing', 
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ), 
      path: '/dashboard/billing' 
    },
    { 
      id: 'reports', 
      label: 'Reports', 
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ), 
      path: '/dashboard/reports' 
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
      path: '/dashboard/settings' 
    }
  ];

  const bottomMenuItems = [
    { 
      id: 'help', 
      label: 'Help', 
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ), 
      path: '/dashboard/help' 
    },
    { 
      id: 'logout', 
      label: 'Log out', 
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6m6-6l-6 6 6 6" />
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
      // If currently pinned, unpin and collapse
      setSidebarPinned(false);
      setSidebarCollapsed(true);
    } else {
      // If not pinned, pin and expand
      setSidebarPinned(true);
      setSidebarCollapsed(false);
    }
  };

  const handleLogout = async () => {
    const result = await authService.logout();
    if (result.success) {
      toast.success('Logged out successfully');
      navigate('/login');
    }
  };

  // Get page title based on active section
  const getPageTitle = () => {
    const currentMenuItem = menuItems.find(item => item.id === activeSection);
    return currentMenuItem ? currentMenuItem.label : 'Dashboard';
  };

  // Handle save settings
  const handleSaveSettings = () => {
    toast.success('Settings saved successfully');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="dashboard-content">
            <h2 className="content-title">Timber Depot Dashboard</h2>
            <p className="content-description">Your comprehensive timber depot management system</p>
            
            {/* Summary Cards */}
            <div className="content-grid">
              <div className="content-card">
                <h3>Total Orders</h3>
                <p className="content-number">24</p>
                <div className="content-breakdown">
                  <span className="breakdown-item">Pending: 8</span>
                  <span className="breakdown-item">Completed: 12</span>
                  <span className="breakdown-item">Delivered: 4</span>
                </div>
              </div>
              <div className="content-card">
                <h3>Pending Bills</h3>
                <p className="content-number">₹45,600</p>
                <div className="content-breakdown">
                  <span className="breakdown-item">Overdue: ₹12,300</span>
                  <span className="breakdown-item">Due Soon: ₹33,300</span>
                </div>
              </div>
              <div className="content-card">
                <h3>Revenue Today</h3>
                <p className="content-number">₹18,500</p>
                <div className="content-breakdown">
                  <span className="breakdown-item">This Week: ₹1,25,000</span>
                  <span className="breakdown-item">This Month: ₹4,50,000</span>
                </div>
              </div>
              <div className="content-card">
                <h3>Low Stock Alerts</h3>
                <p className="content-number">7</p>
                <div className="content-breakdown">
                  <span className="breakdown-item">Critical: 3 items</span>
                  <span className="breakdown-item">Warning: 4 items</span>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="charts-section">
              <h3 className="charts-title">Sales Analytics</h3>
              <div className="charts-grid">
                <div className="chart-card">
                  <h4>Sales Trend (Last 7 Days)</h4>
                  <div className="chart-placeholder">
                    <div className="chart-bars">
                      <div className="chart-bar" style={{height: '60%'}}></div>
                      <div className="chart-bar" style={{height: '80%'}}></div>
                      <div className="chart-bar" style={{height: '45%'}}></div>
                      <div className="chart-bar" style={{height: '90%'}}></div>
                      <div className="chart-bar" style={{height: '70%'}}></div>
                      <div className="chart-bar" style={{height: '85%'}}></div>
                      <div className="chart-bar" style={{height: '95%'}}></div>
                    </div>
                    <div className="chart-labels">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>
                </div>
                <div className="chart-card">
                  <h4>Product-wise Revenue</h4>
                  <div className="chart-placeholder">
                    <div className="pie-chart">
                      <div className="pie-slice" style={{'--percentage': '40%', '--color': '#3b82f6'}}></div>
                      <div className="pie-slice" style={{'--percentage': '30%', '--color': '#10b981'}}></div>
                      <div className="pie-slice" style={{'--percentage': '20%', '--color': '#f59e0b'}}></div>
                      <div className="pie-slice" style={{'--percentage': '10%', '--color': '#ef4444'}}></div>
                    </div>
                    <div className="chart-legend">
                      <div className="legend-item">
                        <span className="legend-color" style={{backgroundColor: '#3b82f6'}}></span>
                        <span>Teak Wood (40%)</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-color" style={{backgroundColor: '#10b981'}}></span>
                        <span>Pine Wood (30%)</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-color" style={{backgroundColor: '#f59e0b'}}></span>
                        <span>Oak Wood (20%)</span>
                      </div>
                      <div className="legend-item">
                        <span className="legend-color" style={{backgroundColor: '#ef4444'}}></span>
                        <span>Others (10%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'procurement':
        return <Procurement />;
      case 'products':
        return <Products />;
      case 'orders':
        return <Orders />;
      case 'billing':
        return <Billing />;
      case 'reports':
        return <Reports />;
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

        const handleInputChange = (field, value) => {
          setSettingsFormData(prev => ({ ...prev, [field]: value }));
        };

        const settingsTabs = [
          { 
            id: 'appearance', 
            label: 'Appearance', 
            icon: (
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            )
          },
          { 
            id: 'general', 
            label: 'General', 
            icon: (
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )
          },
          { 
            id: 'security', 
            label: 'Security', 
            icon: (
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            )
          },
          { 
            id: 'notifications', 
            label: 'Notifications', 
            icon: (
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            )
          },
          { 
            id: 'preferences', 
            label: 'Preferences', 
            icon: (
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            )
          },
        ];

        return (
          <div className="settings-page">
            <div className="settings-layout">
              {/* Settings Sidebar Navigation */}
              <aside className="settings-sidebar">
                <nav className="settings-nav">
                  {settingsTabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`settings-nav-item ${activeSettingsTab === tab.id ? 'active' : ''}`}
                      onClick={() => setActiveSettingsTab(tab.id)}
                    >
                      <span className="settings-nav-icon">{tab.icon}</span>
                      <span className="settings-nav-label">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </aside>

              {/* Settings Content */}
              <div className="settings-content-area">
                {/* Appearance Tab */}
                {activeSettingsTab === 'appearance' && (
                  <div className="settings-tab-content">
                    <div className="settings-tab-header">
                      <h3 className="settings-tab-title">Appearance Settings</h3>
                      <p className="settings-tab-description">Customize the look and feel of your application</p>
                    </div>

                    <div className="settings-section-card">
                      <div className="settings-section-header">
                        <div className="settings-section-icon">
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="settings-section-name">Theme</h4>
                          <p className="settings-section-desc">Choose between light and dark theme</p>
                        </div>
                      </div>
                      <div className="settings-section-body">
                        <div className="theme-toggle-section">
                          <span className="theme-label">Current Theme</span>
                          <ThemeToggle />
                        </div>
                      </div>
                    </div>

                    <div className="settings-section-card">
                      <div className="settings-section-header">
                        <div className="settings-section-icon">
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="settings-section-name">Navigation Display</h4>
                          <p className="settings-section-desc">Choose how you want to navigate through the application</p>
                        </div>
                      </div>
                      <div className="settings-section-body">
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
                  </div>
                )}

                {/* General Tab */}
                {activeSettingsTab === 'general' && (
                  <div className="settings-tab-content">
                    <div className="settings-tab-header">
                      <h3 className="settings-tab-title">General Settings</h3>
                      <p className="settings-tab-description">Configure basic application settings</p>
                    </div>

                    <div className="settings-section-card">
                      <div className="settings-section-header">
                        <div className="settings-section-icon">
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="settings-section-name">System Information</h4>
                          <p className="settings-section-desc">Basic system configuration</p>
                        </div>
                      </div>
                      <div className="settings-section-body">
                        <div className="settings-form-grid">
                          <div className="settings-form-item">
                            <label className="settings-form-label">
                              System Name
                              <span className="settings-form-required">*</span>
                            </label>
                            <input
                              type="text"
                              className="settings-form-input"
                              value={settingsFormData.systemName}
                              onChange={(e) => handleInputChange('systemName', e.target.value)}
                              placeholder="TMS Billing System"
                            />
                            <p className="settings-form-hint">Display name for your billing system</p>
                          </div>
                          <div className="settings-form-item">
                            <label className="settings-form-label">
                              Default Timezone
                              <span className="settings-form-required">*</span>
                            </label>
                            <select
                              className="settings-form-input"
                              value={settingsFormData.timezone}
                              onChange={(e) => handleInputChange('timezone', e.target.value)}
                            >
                              <option value="UTC">UTC (Coordinated Universal Time)</option>
                              <option value="EST">EST (Eastern Standard Time)</option>
                              <option value="PST">PST (Pacific Standard Time)</option>
                              <option value="CST">CST (Central Standard Time)</option>
                              <option value="MST">MST (Mountain Standard Time)</option>
                            </select>
                            <p className="settings-form-hint">Timezone for date and time display</p>
                          </div>
                          <div className="settings-form-item">
                            <label className="settings-form-label">
                              Language
                              <span className="settings-form-required">*</span>
                            </label>
                            <select
                              className="settings-form-input"
                              value={settingsFormData.language}
                              onChange={(e) => handleInputChange('language', e.target.value)}
                            >
                              <option value="en">English</option>
                              <option value="es">Spanish</option>
                              <option value="fr">French</option>
                              <option value="de">German</option>
                            </select>
                            <p className="settings-form-hint">Interface language</p>
                          </div>
                          <div className="settings-form-item">
                            <label className="settings-form-label">
                              Date Format
                              <span className="settings-form-required">*</span>
                            </label>
                            <select
                              className="settings-form-input"
                              value={settingsFormData.dateFormat}
                              onChange={(e) => handleInputChange('dateFormat', e.target.value)}
                            >
                              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                              <option value="DD MMM YYYY">DD MMM YYYY</option>
                            </select>
                            <p className="settings-form-hint">Preferred date format</p>
                          </div>
                          <div className="settings-form-item">
                            <label className="settings-form-label">
                              Currency
                              <span className="settings-form-required">*</span>
                            </label>
                            <select
                              className="settings-form-input"
                              value={settingsFormData.currency}
                              onChange={(e) => handleInputChange('currency', e.target.value)}
                            >
                              <option value="USD">USD ($)</option>
                              <option value="EUR">EUR (€)</option>
                              <option value="GBP">GBP (£)</option>
                              <option value="INR">INR (₹)</option>
                            </select>
                            <p className="settings-form-hint">Default currency for transactions</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeSettingsTab === 'security' && (
                  <div className="settings-tab-content">
                    <div className="settings-tab-header">
                      <h3 className="settings-tab-title">Security Settings</h3>
                      <p className="settings-tab-description">Manage security and authentication preferences</p>
                    </div>

                    <div className="settings-section-card">
                      <div className="settings-section-header">
                        <div className="settings-section-icon">
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="settings-section-name">Session Management</h4>
                          <p className="settings-section-desc">Configure session timeout and security</p>
                        </div>
                      </div>
                      <div className="settings-section-body">
                        <div className="settings-form-grid">
                          <div className="settings-form-item">
                            <label className="settings-form-label">
                              Session Timeout (minutes)
                              <span className="settings-form-required">*</span>
                            </label>
                            <input
                              type="number"
                              className="settings-form-input"
                              value={settingsFormData.sessionTimeout}
                              onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
                              placeholder="30"
                              min="5"
                              max="480"
                            />
                            <p className="settings-form-hint">Automatically log out after inactivity (5-480 minutes)</p>
                          </div>
                          <div className="settings-form-item">
                            <label className="settings-form-label">
                              Password Policy
                              <span className="settings-form-required">*</span>
                            </label>
                            <select
                              className="settings-form-input"
                              value={settingsFormData.passwordPolicy}
                              onChange={(e) => handleInputChange('passwordPolicy', e.target.value)}
                            >
                              <option value="Standard">Standard (8+ characters)</option>
                              <option value="Strong">Strong (12+ characters, mixed case, numbers, symbols)</option>
                              <option value="Very Strong">Very Strong (16+ characters, complex requirements)</option>
                            </select>
                            <p className="settings-form-hint">Password complexity requirements</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="settings-section-card">
                      <div className="settings-section-header">
                        <div className="settings-section-icon">
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="settings-section-name">Two-Factor Authentication</h4>
                          <p className="settings-section-desc">Add an extra layer of security to your account</p>
                        </div>
                      </div>
                      <div className="settings-section-body">
                        <div className="settings-toggle-item">
                          <div>
                            <label className="settings-toggle-label">Enable 2FA</label>
                            <p className="settings-toggle-description">Require a verification code in addition to your password</p>
                          </div>
                          <label className="toggle-switch">
                            <input type="checkbox" />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeSettingsTab === 'notifications' && (
                  <div className="settings-tab-content">
                    <div className="settings-tab-header">
                      <h3 className="settings-tab-title">Notification Settings</h3>
                      <p className="settings-tab-description">Manage how and when you receive notifications</p>
                    </div>

                    <div className="settings-section-card">
                      <div className="settings-section-header">
                        <div className="settings-section-icon">
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="settings-section-name">Email Notifications</h4>
                          <p className="settings-section-desc">Receive notifications via email</p>
                        </div>
                      </div>
                      <div className="settings-section-body">
                        <div className="settings-toggle-item">
                          <div>
                            <label className="settings-toggle-label">Enable Email Notifications</label>
                            <p className="settings-toggle-description">Receive important updates and alerts via email</p>
                          </div>
                          <label className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={settingsFormData.emailNotifications}
                              onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>
                        {settingsFormData.emailNotifications && (
                          <div className="settings-form-grid" style={{ marginTop: '1.5rem' }}>
                            <div className="settings-form-item">
                              <label className="settings-form-label">Email Address</label>
                              <input
                                type="email"
                                className="settings-form-input"
                                placeholder="your.email@example.com"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="settings-section-card">
                      <div className="settings-section-header">
                        <div className="settings-section-icon">
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="settings-section-name">SMS Notifications</h4>
                          <p className="settings-section-desc">Receive notifications via SMS</p>
                        </div>
                      </div>
                      <div className="settings-section-body">
                        <div className="settings-toggle-item">
                          <div>
                            <label className="settings-toggle-label">Enable SMS Notifications</label>
                            <p className="settings-toggle-description">Receive critical alerts via text message</p>
                          </div>
                          <label className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={settingsFormData.smsNotifications}
                              onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>
                        {settingsFormData.smsNotifications && (
                          <div className="settings-form-grid" style={{ marginTop: '1.5rem' }}>
                            <div className="settings-form-item">
                              <label className="settings-form-label">Phone Number</label>
                              <input
                                type="tel"
                                className="settings-form-input"
                                placeholder="+1 (555) 123-4567"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Preferences Tab */}
                {activeSettingsTab === 'preferences' && (
                  <div className="settings-tab-content">
                    <div className="settings-tab-header">
                      <h3 className="settings-tab-title">User Preferences</h3>
                      <p className="settings-tab-description">Customize your personal preferences</p>
                    </div>

                    <div className="settings-section-card">
                      <div className="settings-section-header">
                        <div className="settings-section-icon">
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="settings-section-name">Profile Settings</h4>
                          <p className="settings-section-desc">Manage your profile information</p>
                        </div>
                      </div>
                      <div className="settings-section-body">
                        <div className="settings-form-grid">
                          <div className="settings-form-item">
                            <label className="settings-form-label">Display Name</label>
                            <input
                              type="text"
                              className="settings-form-input"
                              placeholder={user ? `${user.firstName} ${user.lastName}` : 'Your Name'}
                            />
                          </div>
                          <div className="settings-form-item">
                            <label className="settings-form-label">Email Address</label>
                            <input
                              type="email"
                              className="settings-form-input"
                              placeholder={user ? user.email : 'your.email@example.com'}
                              disabled
                            />
                            <p className="settings-form-hint">Email cannot be changed</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="settings-section-card">
                      <div className="settings-section-header">
                        <div className="settings-section-icon">
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="settings-section-name">Dashboard Preferences</h4>
                          <p className="settings-section-desc">Customize your dashboard view</p>
                        </div>
                      </div>
                      <div className="settings-section-body">
                        <div className="settings-toggle-item">
                          <div>
                            <label className="settings-toggle-label">Show Welcome Message</label>
                            <p className="settings-toggle-description">Display welcome message on dashboard</p>
                          </div>
                          <label className="toggle-switch">
                            <input type="checkbox" defaultChecked />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>
                        <div className="settings-toggle-item">
                          <div>
                            <label className="settings-toggle-label">Compact View</label>
                            <p className="settings-toggle-description">Use compact layout for better space utilization</p>
                          </div>
                          <label className="toggle-switch">
                            <input type="checkbox" />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="dashboard-content">
            <h2 className="content-title">Welcome to TMS Billing</h2>
            <p className="content-description">Your comprehensive billing management system</p>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            {!sidebarCollapsed && <span className="sidebar-title">Timber Depot</span>}
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

      {/* Dashboard Header - Separate Section */}
      <header className="dashboard-header-section">
        <div className="dashboard-header-content">
          <div className="dashboard-nav-wrapper">
            <div className="page-title-section">
              {menuItems.find(item => item.id === activeSection)?.icon && (
                <span className="page-title-icon">
                  {menuItems.find(item => item.id === activeSection).icon}
                </span>
              )}
              <h1 className="page-title">{getPageTitle()}</h1>
            </div>
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
            {activeSection === 'settings' && (
              <button className="btn-save-settings" onClick={handleSaveSettings}>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </button>
            )}
            <span className="user-name">Hello, {user.firstName}</span>
            <ThemeToggle />
            <div className="user-avatar">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <button
              onClick={() => handleMenuClick({ id: 'settings', path: '/dashboard/settings' })}
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

      {/* Main Content Area */}
      <div className="dashboard-main-area">
        {/* Dashboard Content */}
        <main className="dashboard-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;