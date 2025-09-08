import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { authService } from '../../services/authService';
import { validateForm } from '../../helpers/validation';
import { TOAST_MESSAGES } from '../../helpers/constants';
import './auth.css';

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setError, reset, watch } = useForm();

  const password = watch('password');

  const handleModeChange = (newMode) => {
    if (newMode !== isLogin) {
      setIsLogin(newMode);
      setShowPassword(false);
      setShowConfirmPassword(false);
      reset(); // Clear form when switching
    }
  };

  const onSubmit = async (data) => {
    const validation = validateForm(data, !isLogin);
    if (!validation.isValid) {
      Object.keys(validation.errors).forEach(field => {
        if (validation.errors[field]) {
          setError(field, { message: validation.errors[field] });
        }
      });
      toast.error(TOAST_MESSAGES.VALIDATION_ERROR);
      return;
    }

    // Validate password strength for signup
    if (!isLogin && data.password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(data.password)) {
        setError('password', {
          type: 'manual',
          message: 'Password must be at least 8 characters with uppercase, lowercase, and number'
        });
        toast.error('Password must be at least 8 characters with uppercase, lowercase, and number');
        return;
      }
    }

    setIsLoading(true);
    
    try {
      const result = isLogin ? await authService.login(data) : await authService.signup(data);
      
      if (result.success) {
        toast.success(isLogin ? TOAST_MESSAGES.LOGIN_SUCCESS : TOAST_MESSAGES.SIGNUP_SUCCESS);
        if (isLogin) {
          navigate('/dashboard');
        } else {
          setIsLogin(true);
          reset();
        }
      } else {
        toast.error(result.error || (isLogin ? TOAST_MESSAGES.LOGIN_ERROR : TOAST_MESSAGES.SIGNUP_ERROR));
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
          {/* Modern Toggle */}
          <div className="auth-toggle-container">
            <div className="auth-toggle">
               <button
                 className={`toggle-btn ${isLogin ? 'active' : ''}`}
                 onClick={() => handleModeChange(true)}
                 type="button"
               >
                 Sign In
               </button>
               <button
                 className={`toggle-btn ${!isLogin ? 'active' : ''}`}
                 onClick={() => handleModeChange(false)}
                 type="button"
               >
                 Sign Up
               </button>
              <div className={`toggle-slider ${isLogin ? 'login-active' : 'signup-active'}`}></div>
            </div>
          </div>

          {/* Auth Card with Flip Animation */}
          <div className={`auth-card ${isLogin ? 'login-card' : 'signup-card'}`}>
            {/* Header */}
            <div className="auth-header">
              <div className="auth-logo">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isLogin ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  )}
                </svg>
              </div>
               <h1 className="auth-title">
                 {isLogin ? 'Welcome Back' : 'Create Account'}
               </h1>
               <p className="auth-subtitle">
                 {isLogin ? 'Sign in to your TMS Billing account' : 'Join TMS Billing system today'}
               </p>
            </div>

            {/* Form */}
            <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
              {/* Name Fields for Signup */}
              {!isLogin && (
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input
                      {...register('firstName', { required: 'First name is required' })}
                      type="text"
                      className={`form-input ${errors.firstName ? 'error' : ''}`}
                      placeholder="John"
                      disabled={isLoading}
                    />
                    {errors.firstName && (
                      <div className="error-message">{errors.firstName.message}</div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input
                      {...register('lastName', { required: 'Last name is required' })}
                      type="text"
                      className={`form-input ${errors.lastName ? 'error' : ''}`}
                      placeholder="Doe"
                      disabled={isLoading}
                    />
                    {errors.lastName && (
                      <div className="error-message">{errors.lastName.message}</div>
                    )}
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  {...register('email', { required: 'Email is required' })}
                  type="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="john.doe@example.com"
                  disabled={isLoading}
                />
                {errors.email && (
                  <div className="error-message">{errors.email.message}</div>
                )}
              </div>

              {/* Phone Field for Signup */}
              {!isLogin && (
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    {...register('phone', { required: 'Phone number is required' })}
                    type="tel"
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                    placeholder="(123) 456-7890"
                    disabled={isLoading}
                  />
                  {errors.phone && (
                    <div className="error-message">{errors.phone.message}</div>
                  )}
                </div>
              )}

               {/* Password Field */}
               <div className="form-group">
                 <label className="form-label">Password</label>
                 <div className="password-input-container">
                   <input
                     {...register('password', { required: 'Password is required' })}
                     type={showPassword ? 'text' : 'password'}
                     className={`form-input password-input ${errors.password ? 'error' : ''}`}
                     placeholder={isLogin ? "Enter your password" : "Create a strong password"}
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

               {/* Confirm Password Field for Signup */}
               {!isLogin && (
                 <div className="form-group">
                   <label className="form-label">Confirm Password</label>
                   <div className="password-input-container">
                     <input
                       {...register('confirmPassword', { 
                         required: 'Please confirm your password',
                         validate: value => value === password || 'Passwords do not match'
                       })}
                       type={showConfirmPassword ? 'text' : 'password'}
                       className={`form-input password-input ${errors.confirmPassword ? 'error' : ''}`}
                       placeholder="Confirm your password"
                       disabled={isLoading}
                     />
                     <button
                       type="button"
                       className="password-toggle-btn"
                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                       disabled={isLoading}
                     >
                       {showConfirmPassword ? (
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
                   {errors.confirmPassword && (
                     <div className="error-message">{errors.confirmPassword.message}</div>
                   )}
                 </div>
               )}

              {/* Remember Me & Forgot Password for Login */}
              {isLogin && (
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
              )}

              {/* Terms and Conditions for Signup */}
              {!isLogin && (
                <div className="checkbox-group">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="checkbox"
                    disabled={isLoading}
                  />
                  <label htmlFor="terms" className="checkbox-label">
                    I agree to the{' '}
                    <a href="#" className="auth-link">Terms and Conditions</a>
                    {' '}and{' '}
                    <a href="#" className="auth-link">Privacy Policy</a>
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="submit-btn"
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    {isLogin ? 'Signing in...' : 'Creating account...'}
                  </>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            {/* Demo Credentials for Login */}
            {isLogin && (
              <div className="demo-credentials">
                <div className="demo-title">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 1 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                  </svg>
                  Demo Credentials
                </div>
                <div className="demo-item">Email: admin@tms.com | Password: Admin123!</div>
                <div className="demo-item">Email: user@tms.com | Password: User123!</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthContainer;
