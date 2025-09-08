import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';
import './auth/auth.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  const menuItems = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ), 
      path: '/dashboard' 
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
      id: 'invoices', 
      label: 'Invoices', 
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ), 
      path: '/dashboard/invoices' 
    },
    { 
      id: 'customers', 
      label: 'Customers', 
      icon: (
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ), 
      path: '/dashboard/customers' 
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
            <h2 className="content-title">Welcome to TMS Billing</h2>
            <p className="content-description">Your comprehensive billing management system</p>
            <div className="content-grid">
              <div className="content-card">
                <h3>Total Invoices</h3>
                <p className="content-number">0</p>
              </div>
              <div className="content-card">
                <h3>Paid Amount</h3>
                <p className="content-number">$0.00</p>
              </div>
              <div className="content-card">
                <h3>Pending Amount</h3>
                <p className="content-number">$0.00</p>
              </div>
            </div>
          </div>
        );
      case 'billing':
        return (
          <div className="dashboard-content">
            <h2 className="content-title">Billing Management</h2>
            <p className="content-description">Manage your billing processes and transactions</p>
          </div>
        );
      case 'invoices':
        return (
          <div className="dashboard-content">
            <h2 className="content-title">Invoice Management</h2>
            <p className="content-description">Create, view, and manage your invoices</p>
          </div>
        );
      case 'customers':
        return (
          <div className="dashboard-content">
            <h2 className="content-title">Customer Management</h2>
            <p className="content-description">Manage your customer database and relationships</p>
          </div>
        );
      case 'reports':
        return (
          <div className="dashboard-content">
            <h2 className="content-title">Reports & Analytics</h2>
            <p className="content-description">View detailed reports and analytics</p>
          </div>
        );
      case 'settings':
        return (
          <div className="dashboard-content">
            <h2 className="content-title">Settings</h2>
            <p className="content-description">Configure your system settings and preferences</p>
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
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${sidebarPinned ? 'pinned' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17a2 2 0 100 4 2 2 0 000-4zM18 17a2 2 0 100 4 2 2 0 000-4zM2 12h2l2.5-2.5L9 12h4l2-2h3l2 2v4H4v-4z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8h18l-1 4H4l-1-4z" />
            </svg>
            {!sidebarCollapsed && <span className="sidebar-title">TMS Billing</span>}
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

      {/* Main Content Area */}
      <div className="dashboard-main-area">
         {/* Dashboard Header */}
         <header className="dashboard-header">
           <div className="dashboard-header-content">
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

           <div className="dashboard-user">
            <span className="user-name">Hello, {user.firstName}</span>
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