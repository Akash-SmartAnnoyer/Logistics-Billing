import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AuthContainer from './components/auth/AuthContainer';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-milky-50 via-white to-milky-100">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            },
          }}
        />
                    <Routes>
                      <Route path="/" element={<Navigate to="/auth" replace />} />
                      <Route path="/auth" element={<AuthContainer />} />
                      <Route path="/login" element={<AuthContainer />} />
                      <Route path="/signup" element={<AuthContainer />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/dashboard/*" element={<Dashboard />} />
                    </Routes>
      </div>
    </Router>
  );
}

export default App;
