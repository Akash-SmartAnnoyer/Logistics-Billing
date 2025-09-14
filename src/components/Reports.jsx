import React, { useState } from 'react';
import './auth/auth.css';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [selectedReport, setSelectedReport] = useState('sales');

  // Mock data for reports
  const salesData = {
    daily: [
      { day: 'Mon', sales: 15000 },
      { day: 'Tue', sales: 22000 },
      { day: 'Wed', sales: 18000 },
      { day: 'Thu', sales: 25000 },
      { day: 'Fri', sales: 30000 },
      { day: 'Sat', sales: 12000 },
      { day: 'Sun', sales: 8000 }
    ],
    weekly: [
      { week: 'Week 1', sales: 120000 },
      { week: 'Week 2', sales: 150000 },
      { week: 'Week 3', sales: 180000 },
      { week: 'Week 4', sales: 200000 }
    ],
    monthly: [
      { month: 'Jan', sales: 450000 },
      { month: 'Feb', sales: 520000 },
      { month: 'Mar', sales: 480000 },
      { month: 'Apr', sales: 600000 }
    ]
  };

  const topProducts = [
    { name: 'Teak Wood Planks', revenue: 450000, percentage: 35 },
    { name: 'Pine Wood Logs', revenue: 320000, percentage: 25 },
    { name: 'Oak Wood Beams', revenue: 250000, percentage: 20 },
    { name: 'Cedar Wood Panels', revenue: 180000, percentage: 15 },
    { name: 'Mahogany Planks', revenue: 80000, percentage: 5 }
  ];

  const customerContribution = [
    { name: 'ABC Construction', orders: 15, revenue: 450000, percentage: 30 },
    { name: 'XYZ Builders', orders: 12, revenue: 320000, percentage: 22 },
    { name: 'DEF Developers', orders: 8, revenue: 250000, percentage: 17 },
    { name: 'GHI Contractors', orders: 6, revenue: 180000, percentage: 12 },
    { name: 'Others', orders: 20, revenue: 300000, percentage: 19 }
  ];

  const getCurrentData = () => {
    switch (selectedPeriod) {
      case '7days': return salesData.daily;
      case '4weeks': return salesData.weekly;
      case '6months': return salesData.monthly;
      default: return salesData.daily;
    }
  };

  const getMaxValue = (data) => {
    return Math.max(...data.map(item => item.sales));
  };

  const handleExport = (format) => {
    // Placeholder for export functionality
    console.log(`Exporting ${selectedReport} report as ${format}`);
    alert(`${format.toUpperCase()} export functionality will be implemented here`);
  };

  const renderSalesChart = () => {
    const data = getCurrentData();
    const maxValue = getMaxValue(data);
    
    return (
      <div className="chart-container">
        <div className="chart-bars">
          {data.map((item, index) => (
            <div key={index} className="chart-bar-container">
              <div 
                className="chart-bar"
                style={{ 
                  height: `${(item.sales / maxValue) * 100}%`,
                  backgroundColor: `hsl(${200 + (index * 30)}, 70%, 50%)`
                }}
              ></div>
              <div className="chart-value">₹{(item.sales / 1000).toFixed(0)}k</div>
            </div>
          ))}
        </div>
        <div className="chart-labels">
          {data.map((item, index) => (
            <span key={index} className="chart-label">
              {item.day || item.week || item.month}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderTopProductsChart = () => {
    return (
      <div className="top-products-chart">
        {topProducts.map((product, index) => (
          <div key={index} className="product-bar">
            <div className="product-info">
              <span className="product-name">{product.name}</span>
              <span className="product-revenue">₹{product.revenue.toLocaleString()}</span>
            </div>
            <div className="product-bar-container">
              <div 
                className="product-bar-fill"
                style={{ 
                  width: `${product.percentage}%`,
                  backgroundColor: `hsl(${120 + (index * 40)}, 70%, 50%)`
                }}
              ></div>
            </div>
            <span className="product-percentage">{product.percentage}%</span>
          </div>
        ))}
      </div>
    );
  };

  const renderCustomerContributionChart = () => {
    return (
      <div className="customer-contribution-chart">
        <div className="pie-chart-container">
          <div className="pie-chart">
            {customerContribution.map((customer, index) => {
              const startAngle = customerContribution.slice(0, index).reduce((acc, curr) => acc + curr.percentage, 0) * 3.6;
              const endAngle = startAngle + customer.percentage * 3.6;
              return (
                <div
                  key={index}
                  className="pie-slice"
                  style={{
                    '--start-angle': `${startAngle}deg`,
                    '--end-angle': `${endAngle}deg`,
                    '--color': `hsl(${200 + (index * 60)}, 70%, 50%)`
                  }}
                ></div>
              );
            })}
          </div>
        </div>
        <div className="pie-legend">
          {customerContribution.map((customer, index) => (
            <div key={index} className="legend-item">
              <div 
                className="legend-color"
                style={{ backgroundColor: `hsl(${200 + (index * 60)}, 70%, 50%)` }}
              ></div>
              <div className="legend-info">
                <span className="legend-name">{customer.name}</span>
                <span className="legend-details">
                  {customer.orders} orders • ₹{customer.revenue.toLocaleString()} ({customer.percentage}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-content">
      <div className="content-header">
        <div>
          <h2 className="content-title">Reports & Analytics</h2>
          <p className="content-description">View detailed reports and analytics</p>
        </div>
        <div className="report-actions">
          <button 
            className="btn-secondary"
            onClick={() => handleExport('excel')}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Excel
          </button>
          <button 
            className="btn-secondary"
            onClick={() => handleExport('pdf')}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export PDF
          </button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="report-tabs">
        <button 
          className={`report-tab ${selectedReport === 'sales' ? 'active' : ''}`}
          onClick={() => setSelectedReport('sales')}
        >
          Sales Reports
        </button>
        <button 
          className={`report-tab ${selectedReport === 'products' ? 'active' : ''}`}
          onClick={() => setSelectedReport('products')}
        >
          Product Analysis
        </button>
        <button 
          className={`report-tab ${selectedReport === 'customers' ? 'active' : ''}`}
          onClick={() => setSelectedReport('customers')}
        >
          Customer Analysis
        </button>
      </div>

      {/* Period Selector */}
      <div className="period-selector">
        <label>Time Period:</label>
        <select 
          className="form-input"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          <option value="7days">Last 7 Days</option>
          <option value="4weeks">Last 4 Weeks</option>
          <option value="6months">Last 6 Months</option>
        </select>
      </div>

      {/* Report Content */}
      <div className="reports-content">
        {selectedReport === 'sales' && (
          <div className="report-section">
            <h3>Sales Trend Analysis</h3>
            <div className="chart-card">
              {renderSalesChart()}
            </div>
            <div className="sales-summary">
              <div className="summary-card">
                <h4>Total Sales</h4>
                <p className="summary-value">₹{getCurrentData().reduce((sum, item) => sum + item.sales, 0).toLocaleString()}</p>
              </div>
              <div className="summary-card">
                <h4>Average Daily</h4>
                <p className="summary-value">₹{Math.round(getCurrentData().reduce((sum, item) => sum + item.sales, 0) / getCurrentData().length).toLocaleString()}</p>
              </div>
              <div className="summary-card">
                <h4>Growth Rate</h4>
                <p className="summary-value">+12.5%</p>
              </div>
            </div>
          </div>
        )}

        {selectedReport === 'products' && (
          <div className="report-section">
            <h3>Top Products by Revenue</h3>
            <div className="chart-card">
              {renderTopProductsChart()}
            </div>
            <div className="products-table">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Revenue</th>
                    <th>Percentage</th>
                    <th>Orders</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>₹{product.revenue.toLocaleString()}</td>
                      <td>{product.percentage}%</td>
                      <td>{Math.floor(product.revenue / 25000)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedReport === 'customers' && (
          <div className="report-section">
            <h3>Customer Contribution Analysis</h3>
            <div className="chart-card">
              {renderCustomerContributionChart()}
            </div>
            <div className="customers-table">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Orders</th>
                    <th>Revenue</th>
                    <th>Percentage</th>
                    <th>Avg Order Value</th>
                  </tr>
                </thead>
                <tbody>
                  {customerContribution.map((customer, index) => (
                    <tr key={index}>
                      <td>{customer.name}</td>
                      <td>{customer.orders}</td>
                      <td>₹{customer.revenue.toLocaleString()}</td>
                      <td>{customer.percentage}%</td>
                      <td>₹{Math.round(customer.revenue / customer.orders).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
