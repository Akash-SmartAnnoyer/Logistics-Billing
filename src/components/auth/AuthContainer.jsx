import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { authService } from '../../services/authService';
import { validateForm } from '../../helpers/validation';
import { TOAST_MESSAGES } from '../../helpers/constants';
import './auth.css';

const AuthContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setError } = useForm();

  const onSubmit = async (data) => {
    const validation = validateForm(data, false);
    if (!validation.isValid) {
      Object.keys(validation.errors).forEach(field => {
        if (validation.errors[field]) {
          setError(field, { message: validation.errors[field] });
        }
      });
      toast.error(TOAST_MESSAGES.VALIDATION_ERROR);
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await authService.login(data);
      
      if (result.success) {
        toast.success(TOAST_MESSAGES.LOGIN_SUCCESS);
        // Check if user is super admin
        if (result.data.user.role === 'superadmin') {
          navigate('/super-admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        toast.error(result.error || TOAST_MESSAGES.LOGIN_ERROR);
      }
    } catch (error) {
      toast.error(TOAST_MESSAGES.NETWORK_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="auth-background"></div>
      <div className="auth-container">
        <div className="auth-card-container">
          {/* Auth Card */}
          <div className="auth-card login-card">
            {/* Header */}
            <div className="auth-header">
              <div className="auth-logo">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
               <h1 className="auth-title">Welcome Back</h1>
               <p className="auth-subtitle">Sign in to your TMS Billing account</p>
            </div>

            {/* Form */}
            <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  {...register('email', { required: 'Email is required' })}
                  type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="superadmin@tms.com"
                  disabled={isLoading}
                />
                {errors.email && (
                  <div className="error-message">{errors.email.message}</div>
                )}
              </div>

               {/* Password Field */}
               <div className="form-group">
                 <label className="form-label">Password</label>
                 <div className="password-input-container">
                   <input
                     {...register('password', { required: 'Password is required' })}
                     type={showPassword ? 'text' : 'password'}
                     className={`form-input password-input ${errors.password ? 'error' : ''}`}
                     placeholder="Enter your password"
                     disabled={isLoading}
                   />
                   <button
                     type="button"
                     className="password-toggle-btn"
                     onClick={() => setShowPassword(!showPassword)}
                     disabled={isLoading}
                   >
                     {showPassword ? (
                       <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                       </svg>
                     ) : (
                       <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                       </svg>
                     )}
                   </button>
                 </div>
                 {errors.password && (
                   <div className="error-message">{errors.password.message}</div>
                 )}
               </div>

              {/* Remember Me & Forgot Password */}
              <div className="form-extras">
                <div className="checkbox-group">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="checkbox"
                  />
                  <label htmlFor="remember-me" className="checkbox-label">
                    Remember me
                  </label>
                </div>
                <a href="#" className="auth-link">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="submit-btn"
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="demo-credentials">
              <div className="demo-title">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 1 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                </svg>
                Demo Credentials
              </div>
              <div className="demo-item">
                <strong>Super Admin:</strong> superadmin@tms.com | SuperAdmin123!
              </div>
              <div className="demo-item">
                <strong>User:</strong> user@tms.com | User123!
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthContainer;
