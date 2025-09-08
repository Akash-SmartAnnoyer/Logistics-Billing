// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import { authService } from '../../services/authService';
// import { validateForm } from '../../helpers/validation';
// import { TOAST_MESSAGES } from '../../helpers/constants';
// // CSS is now handled by AuthContainer

// const Login = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const { register, handleSubmit, formState: { errors }, setError } = useForm();

//   const onSubmit = async (data) => {
//     // Validate form
//     const validation = validateForm(data, false);
//     if (!validation.isValid) {
//       Object.keys(validation.errors).forEach(field => {
//         if (validation.errors[field]) {
//           setError(field, { message: validation.errors[field] });
//         }
//       });
//       toast.error(TOAST_MESSAGES.VALIDATION_ERROR);
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       const result = await authService.login(data);
      
//       if (result.success) {
//         toast.success(TOAST_MESSAGES.LOGIN_SUCCESS);
//         navigate('/dashboard');
//       } else {
//         toast.error(result.error || TOAST_MESSAGES.LOGIN_ERROR);
//       }
//     } catch (error) {
//       toast.error(TOAST_MESSAGES.NETWORK_ERROR);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="auth-background"></div>
//       <div className="auth-container">
//         <div className="auth-card-container">
//           <div className="auth-card fade-in">
//             {/* Header */}
//             <div className="auth-header">
//               <div className="auth-logo">
//                 <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path 
//                     strokeLinecap="round" 
//                     strokeLinejoin="round" 
//                     strokeWidth={2} 
//                     d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
//                   />
//                 </svg>
//               </div>
//               <h1 className="auth-title">Welcome Back</h1>
//               <p className="auth-subtitle">Sign in to your TMS Billing account</p>
//             </div>

//             {/* Login Form */}
//             <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
//               {/* Email Field */}
//               <div className="form-group">
//                 <label htmlFor="email" className="form-label">
//                   Email Address
//                 </label>
//                 <input
//                   {...register('email', { required: 'Email is required' })}
//                   type="email"
//                   id="email"
//                   className={`form-input ${errors.email ? 'error' : ''}`}
//                   placeholder="Enter your email"
//                   disabled={isLoading}
//                 />
//                 {errors.email && (
//                   <div className="error-message">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//                       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
//                     </svg>
//                     {errors.email.message}
//                   </div>
//                 )}
//               </div>

//               {/* Password Field */}
//               <div className="form-group">
//                 <label htmlFor="password" className="form-label">
//                   Password
//                 </label>
//                 <input
//                   {...register('password', { required: 'Password is required' })}
//                   type="password"
//                   id="password"
//                   className={`form-input ${errors.password ? 'error' : ''}`}
//                   placeholder="Enter your password"
//                   disabled={isLoading}
//                 />
//                 {errors.password && (
//                   <div className="error-message">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//                       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
//                     </svg>
//                     {errors.password.message}
//                   </div>
//                 )}
//               </div>

//               {/* Remember Me & Forgot Password */}
//               <div className="form-extras">
//                 <div className="checkbox-group">
//                   <input
//                     id="remember-me"
//                     name="remember-me"
//                     type="checkbox"
//                     className="checkbox"
//                   />
//                   <label htmlFor="remember-me" className="checkbox-label">
//                     Remember me
//                   </label>
//                 </div>
//                 <a href="#" className="auth-link">
//                   Forgot password?
//                 </a>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="submit-btn"
//               >
//                 {isLoading ? (
//                   <>
//                     <span className="loading-spinner"></span>
//                     Signing in...
//                   </>
//                 ) : (
//                   'Sign In'
//                 )}
//               </button>

//               {/* Demo Credentials */}
//               <div className="demo-credentials">
//                 <div className="demo-title">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
//                   </svg>
//                   Demo Credentials
//                 </div>
//                 <div className="demo-item">
//                   <strong>Admin:</strong> admin@tms.com | Admin123!
//                 </div>
//                 <div className="demo-item">
//                   <strong>User:</strong> user@tms.com | User123!
//                 </div>
//               </div>
//             </form>

//             {/* Footer */}
//             <div className="auth-footer">
//               <p className="auth-footer-text">
//                 Don't have an account?
//                 <Link to="/signup" className="auth-footer-link">
//                   Sign up here
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;