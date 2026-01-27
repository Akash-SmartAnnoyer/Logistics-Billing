import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useTheme } from './contexts/ThemeContext';
import AuthContainer from './components/auth/AuthContainer';
import Dashboard from './components/Dashboard';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import './index.css';

function App() {
  const { theme } = useTheme();
  
  return (
    <Router basename="/Logistics-Billing">
      <div className="min-h-screen" style={{ background: 'var(--bg-gradient)' }}>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: theme === 'dark' ? 'rgba(18, 18, 18, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              boxShadow: theme === 'dark' ? '0 8px 32px rgba(0, 0, 0, 0.5)' : '0 8px 32px rgba(0, 0, 0, 0.1)',
              color: theme === 'dark' ? '#f5f5f5' : '#1a1a1a',
            },
          }}
        />
                    <Routes>
                      <Route path="/" element={<Navigate to="/auth" replace />} />
                      <Route path="/auth" element={<AuthContainer />} />
                      <Route path="/login" element={<AuthContainer />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/dashboard/*" element={<Dashboard />} />
                      <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
                      <Route path="/super-admin/carriers" element={<SuperAdminDashboard />} />
                      <Route path="/super-admin/settings" element={<SuperAdminDashboard />} />
                      <Route path="/super-admin/*" element={<SuperAdminDashboard />} />
                    </Routes>
      </div>
    </Router>
  );
}

export default App;
