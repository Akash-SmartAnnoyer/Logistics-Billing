import React, { useState } from 'react';
import './auth/auth.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    companyName: 'Timber Depot',
    companyAddress: '123 Timber Street, Wood City, WC 12345',
    companyPhone: '+91 98765 43210',
    companyEmail: 'info@timberdepot.com',
    currency: 'INR',
    taxRate: 18,
    invoicePrefix: 'INV',
    defaultPaymentTerms: 'Net 30',
    lowStockThreshold: 50,
    autoGenerateInvoice: true,
    emailNotifications: true,
    smsNotifications: false,
    backupFrequency: 'daily'
  });

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Placeholder for save functionality
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      // Reset to default values
      setSettings({
        companyName: 'Timber Depot',
        companyAddress: '123 Timber Street, Wood City, WC 12345',
        companyPhone: '+91 98765 43210',
        companyEmail: 'info@timberdepot.com',
        currency: 'INR',
        taxRate: 18,
        invoicePrefix: 'INV',
        defaultPaymentTerms: 'Net 30',
        lowStockThreshold: 50,
        autoGenerateInvoice: true,
        emailNotifications: true,
        smsNotifications: false,
        backupFrequency: 'daily'
      });
    }
  };

  const renderGeneralSettings = () => (
    <div className="settings-section">
      <h3>General Settings</h3>
      <div className="settings-form">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input 
              type="text" 
              className="form-input" 
              value={settings.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Currency</label>
            <select 
              className="form-input"
              value={settings.currency}
              onChange={(e) => handleInputChange('currency', e.target.value)}
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Company Address</label>
          <textarea 
            className="form-input"
            rows="3"
            value={settings.companyAddress}
            onChange={(e) => handleInputChange('companyAddress', e.target.value)}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input 
              type="tel" 
              className="form-input" 
              value={settings.companyPhone}
              onChange={(e) => handleInputChange('companyPhone', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              value={settings.companyEmail}
              onChange={(e) => handleInputChange('companyEmail', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderBusinessSettings = () => (
    <div className="settings-section">
      <h3>Business Settings</h3>
      <div className="settings-form">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Tax Rate (%)</label>
            <input 
              type="number" 
              className="form-input" 
              value={settings.taxRate}
              onChange={(e) => handleInputChange('taxRate', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Invoice Prefix</label>
            <input 
              type="text" 
              className="form-input" 
              value={settings.invoicePrefix}
              onChange={(e) => handleInputChange('invoicePrefix', e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Default Payment Terms</label>
            <select 
              className="form-input"
              value={settings.defaultPaymentTerms}
              onChange={(e) => handleInputChange('defaultPaymentTerms', e.target.value)}
            >
              <option value="Due on Receipt">Due on Receipt</option>
              <option value="Net 15">Net 15</option>
              <option value="Net 30">Net 30</option>
              <option value="Net 45">Net 45</option>
              <option value="Net 60">Net 60</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Low Stock Threshold</label>
            <input 
              type="number" 
              className="form-input" 
              value={settings.lowStockThreshold}
              onChange={(e) => handleInputChange('lowStockThreshold', e.target.value)}
            />
          </div>
        </div>
        <div className="checkbox-group">
          <label className="checkbox-container">
            <input 
              type="checkbox" 
              checked={settings.autoGenerateInvoice}
              onChange={(e) => handleInputChange('autoGenerateInvoice', e.target.checked)}
            />
            <span className="checkmark"></span>
            Auto-generate invoices for completed orders
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="settings-section">
      <h3>Notification Settings</h3>
      <div className="settings-form">
        <div className="checkbox-group">
          <label className="checkbox-container">
            <input 
              type="checkbox" 
              checked={settings.emailNotifications}
              onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
            />
            <span className="checkmark"></span>
            Email notifications
          </label>
        </div>
        <div className="checkbox-group">
          <label className="checkbox-container">
            <input 
              type="checkbox" 
              checked={settings.smsNotifications}
              onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
            />
            <span className="checkmark"></span>
            SMS notifications
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">Backup Frequency</label>
          <select 
            className="form-input"
            value={settings.backupFrequency}
            onChange={(e) => handleInputChange('backupFrequency', e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderUserSettings = () => (
    <div className="settings-section">
      <h3>User Settings</h3>
      <div className="settings-form">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input 
              type="text" 
              className="form-input" 
              defaultValue="John"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input 
              type="text" 
              className="form-input" 
              defaultValue="Doe"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input 
            type="email" 
            className="form-input" 
            defaultValue="john.doe@timberdepot.com"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Current Password</label>
          <input 
            type="password" 
            className="form-input" 
            placeholder="Enter current password"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="Enter new password"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="Confirm new password"
            />
          </div>
        </div>
        <button className="btn-primary">
          Update Profile
        </button>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="settings-section">
      <h3>System Settings</h3>
      <div className="settings-form">
        <div className="system-info">
          <div className="info-card">
            <h4>System Information</h4>
            <div className="info-item">
              <span className="info-label">Version:</span>
              <span className="info-value">v1.0.0</span>
            </div>
            <div className="info-item">
              <span className="info-label">Last Updated:</span>
              <span className="info-value">2024-01-10</span>
            </div>
            <div className="info-item">
              <span className="info-label">Database Size:</span>
              <span className="info-value">2.5 MB</span>
            </div>
          </div>
          <div className="info-card">
            <h4>Storage Usage</h4>
            <div className="storage-bar">
              <div className="storage-fill" style={{width: '35%'}}></div>
            </div>
            <p className="storage-text">35% used (2.5 MB / 7.2 MB)</p>
          </div>
        </div>
        <div className="system-actions">
          <button className="btn-secondary">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Export Data
          </button>
          <button className="btn-secondary">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Import Data
          </button>
          <button className="btn-secondary">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Clear Cache
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <div>
          <h2 className="content-title">Settings</h2>
          <p className="content-description">Configure your system settings and preferences</p>
        </div>
        <div className="settings-actions">
          <button 
            className="btn-secondary"
            onClick={handleReset}
          >
            Reset to Default
          </button>
          <button 
            className="btn-primary"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Settings Tabs */}
      <div className="settings-tabs">
        <button 
          className={`settings-tab ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          General
        </button>
        <button 
          className={`settings-tab ${activeTab === 'business' ? 'active' : ''}`}
          onClick={() => setActiveTab('business')}
        >
          Business
        </button>
        <button 
          className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
        <button 
          className={`settings-tab ${activeTab === 'user' ? 'active' : ''}`}
          onClick={() => setActiveTab('user')}
        >
          User Profile
        </button>
        <button 
          className={`settings-tab ${activeTab === 'system' ? 'active' : ''}`}
          onClick={() => setActiveTab('system')}
        >
          System
        </button>
      </div>

      {/* Settings Content */}
      <div className="settings-content">
        {activeTab === 'general' && renderGeneralSettings()}
        {activeTab === 'business' && renderBusinessSettings()}
        {activeTab === 'notifications' && renderNotificationSettings()}
        {activeTab === 'user' && renderUserSettings()}
        {activeTab === 'system' && renderSystemSettings()}
      </div>
    </div>
  );
};

export default Settings;
