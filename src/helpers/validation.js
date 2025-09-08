// Form validation helper functions

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const getValidationMessage = (field, value) => {
  switch (field) {
    case 'email':
      if (!value) return 'Email is required';
      if (!validateEmail(value)) return 'Please enter a valid email address';
      return '';
    
    case 'password':
      if (!value) return 'Password is required';
      if (!validatePassword(value)) return 'Password must be at least 8 characters with uppercase, lowercase, and number';
      return '';
    
    case 'confirmPassword':
      if (!value) return 'Please confirm your password';
      return '';
    
    case 'firstName':
    case 'lastName':
      if (!value) return 'This field is required';
      if (!validateName(value)) return 'Must be at least 2 characters';
      return '';
    
    case 'phone':
      if (!value) return 'Phone number is required';
      if (!validatePhone(value)) return 'Please enter a valid phone number';
      return '';
    
    default:
      return '';
  }
};

export const validateForm = (formData, isSignup = false) => {
  const errors = {};
  
  // Common validations
  errors.email = getValidationMessage('email', formData.email);
  errors.password = getValidationMessage('password', formData.password);
  
  if (isSignup) {
    errors.firstName = getValidationMessage('firstName', formData.firstName);
    errors.lastName = getValidationMessage('lastName', formData.lastName);
    errors.phone = getValidationMessage('phone', formData.phone);
    errors.confirmPassword = getValidationMessage('confirmPassword', formData.confirmPassword);
    
    // Check if passwords match
    if (formData.password && formData.confirmPassword && 
        formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
  }
  
  return {
    isValid: Object.values(errors).every(error => error === ''),
    errors
  };
};
