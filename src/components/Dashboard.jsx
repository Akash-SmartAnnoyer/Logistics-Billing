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
      label: 'Help & Information', 
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

        return (
          <div className="dashboard-content">
            <h2 className="content-title">Settings</h2>
            <p className="content-description">Configure your system settings and preferences</p>
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

      {/* Main Content Area */}
      <div className="dashboard-main-area">
         {/* Dashboard Header */}
         <header className="dashboard-header">
           <div className="dashboard-header-content">
             <div className="dashboard-nav-wrapper">
               {showHeaderNav && (
                 <>
                   <div className="header-left">
                     <h1 className="page-title">
                       {activeSection === 'home' ? 'Dashboard' : 
                        activeSection === 'procurement' ? 'Procurement & Warehouse' :
                        activeSection === 'products' ? 'Stock Management' :
                        activeSection === 'orders' ? 'Customer Orders' :
                        activeSection === 'billing' ? 'Billing & Invoices' :
                        activeSection === 'reports' ? 'Reports & Analytics' :
                        activeSection === 'settings' ? 'Settings' : 'Dashboard'}
                     </h1>
                     <p className="page-subtitle">
                       {activeSection === 'home' ? 'Overview of your timber depot operations' :
                        activeSection === 'procurement' ? 'Manage vendor orders and warehouse inventory' :
                        activeSection === 'products' ? 'Manage product catalog and pricing' :
                        activeSection === 'orders' ? 'Track customer orders and deliveries' :
                        activeSection === 'billing' ? 'Manage invoices and payments' :
                        activeSection === 'reports' ? 'View analytics and generate reports' :
                        activeSection === 'settings' ? 'Configure application settings' : 'Timber Depot Management'}
                     </p>
                   </div>
                   
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
                 </>
               )}
             </div>

           <div className="dashboard-user">
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

      {/* Dashboard Content */}
      <main className="dashboard-main">
        {renderContent()}
      </main>
    </div>
    </div>
  );
};

export default Dashboard;