// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import { authService } from '../../services/authService';
// import { validateForm } from '../../helpers/validation';
// import { TOAST_MESSAGES } from '../../helpers/constants';
// // CSS is now handled by AuthContainer // Import the CSS file

// const Signup = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState('');
//   const navigate = useNavigate();
//   const { register, handleSubmit, formState: { errors }, setError, watch } = useForm();

//   const password = watch('password');

//   // Password strength checker
//   const checkPasswordStrength = (password) => {
//     if (!password) return '';
    
//     const hasLower = /[a-z]/.test(password);
//     const hasUpper = /[A-Z]/.test(password);
//     const hasNumber = /\d/.test(password);
//     const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
//     const isLongEnough = password.length >= 8;
    
//     const score = [hasLower, hasUpper, hasNumber, hasSpecial, isLongEnough].filter(Boolean).length;
    
//     if (score < 3) return 'Weak';
//     if (score < 5) return 'Medium';
//     return 'Strong';
//   };

//   const onSubmit = async (data) => {
//     // Validate form
//     const validation = validateForm(data, true);
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
//       const result = await authService.signup(data);
      
//       if (result.success) {
//         toast.success(TOAST_MESSAGES.SIGNUP_SUCCESS);
//         navigate('/login');
//       } else {
//         toast.error(result.error || TOAST_MESSAGES.SIGNUP_ERROR);
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
//                     d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" 
//                   />
//                 </svg>
//               </div>
//               <h1 className="auth-title">Create Account</h1>
//               <p className="auth-subtitle">Join TMS Billing system today</p>
//             </div>

//             {/* Signup Form */}
//             <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
//               {/* Name Fields */}
//               <div className="form-row">
//                 <div className="form-group">
//                   <label htmlFor="firstName" className="form-label">
//                     First Name
//                   </label>
//                   <input
//                     {...register('firstName', { required: 'First name is required' })}
//                     type="text"
//                     id="firstName"
//                     className={`form-input ${errors.firstName ? 'error' : ''}`}
//                     placeholder="John"
//                     disabled={isLoading}
//                   />
//                   {errors.firstName && (
//                     <div className="error-message">
//                       <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//                         <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
//                       </svg>
//                       {errors.firstName.message}
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="form-group">
//                   <label htmlFor="lastName" className="form-label">
//                     Last Name
//                   </label>
//                   <input
//                     {...register('lastName', { required: 'Last name is required' })}
//                     type="text"
//                     id="lastName"
//                     className={`form-input ${errors.lastName ? 'error' : ''}`}
//                     placeholder="Doe"
//                     disabled={isLoading}
//                   />
//                   {errors.lastName && (
//                     <div className="error-message">
//                       <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//                         <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
//                       </svg>
//                       {errors.lastName.message}
//                     </div>
//                   )}
//                 </div>
//               </div>

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
//                   placeholder="john.doe@example.com"
//                   disabled={isLoading}
//                 />
//                 {errors.email && (
//                   <div className="error-message">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//                       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
//                     </svg>
//                     {errors.email.message}
//                   </div>
//                 )}
//               </div>

//               {/* Phone Field */}
//               <div className="form-group">
//                 <label htmlFor="phone" className="form-label">
//                   Phone Number
//                 </label>
//                 <input
//                   {...register('phone', { required: 'Phone number is required' })}
//                   type="tel"
//                   id="phone"
//                   className={`form-input ${errors.phone ? 'error' : ''}`}
//                   placeholder="(123) 456-7890"
//                   disabled={isLoading}
//                 />
//                 {errors.phone && (
//                   <div className="error-message">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//                       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
//                     </svg>
//                     {errors.phone.message}
//                   </div>
//                 )}
//               </div>

//               {/* Password Field */}
//               <div className="form-group">
//                 <label htmlFor="password" className="form-label">
//                   Password
//                 </label>
//                 <input
//                   {...register('password', { 
//                     required: 'Password is required',
//                     onChange: (e) => setPasswordStrength(checkPasswordStrength(e.target.value))
//                   })}
//                   type="password"
//                   id="password"
//                   className={`form-input ${errors.password ? 'error' : ''}`}
//                   placeholder="Create a strong password"
//                   disabled={isLoading}
//                 />
//                 {errors.password && (
//                   <div className="error-message">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//                       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
//                     </svg>
//                     {errors.password.message}
//                   </div>
//                 )}
//                 {password && (
//                   <div className={`password-strength ${passwordStrength ? 'visible' : ''}`}>
//                     Password strength: 
//                     <span style={{
//                       color: passwordStrength === 'Weak' ? '#ef4444' : 
//                              passwordStrength === 'Medium' ? '#f59e0b' : '#10b981',
//                       fontWeight: '600',
//                       marginLeft: '0.25rem'
//                     }}>
//                       {passwordStrength}
//                     </span>
//                   </div>
//                 )}
//                 <div className="password-strength visible">
//                   Must be at least 8 characters with uppercase, lowercase, and number
//                 </div>
//               </div>

//               {/* Confirm Password Field */}
//               <div className="form-group">
//                 <label htmlFor="confirmPassword" className="form-label">
//                   Confirm Password
//                 </label>
//                 <input
//                   {...register('confirmPassword', { 
//                     required: 'Please confirm your password',
//                     validate: value => value === password || 'Passwords do not match'
//                   })}
//                   type="password"
//                   id="confirmPassword"
//                   className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
//                   placeholder="Confirm your password"
//                   disabled={isLoading}
//                 />
//                 {errors.confirmPassword && (
//                   <div className="error-message">
//                     <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//                       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
//                     </svg>
//                     {errors.confirmPassword.message}
//                   </div>
//                 )}
//               </div>

//               {/* Terms and Conditions */}
//               <div className="checkbox-group" style={{ marginTop: '1rem' }}>
//                 <input
//                   id="terms"
//                   name="terms"
//                   type="checkbox"
//                   required
//                   className="checkbox"
//                   disabled={isLoading}
//                 />
//                 <label htmlFor="terms" className="checkbox-label">
//                   I agree to the{' '}
//                   <a href="#" className="auth-link">Terms and Conditions</a>
//                   {' '}and{' '}
//                   <a href="#" className="auth-link">Privacy Policy</a>
//                 </label>
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
//                     Creating account...
//                   </>
//                 ) : (
//                   'Create Account'
//                 )}
//               </button>
//             </form>

//             {/* Footer */}
//             <div className="auth-footer">
//               <p className="auth-footer-text">
//                 Already have an account?
//                 <Link to="/login" className="auth-footer-link">
//                   Sign in here
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Signup;