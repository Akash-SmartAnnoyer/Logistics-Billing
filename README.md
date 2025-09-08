# TMS Billing System Frontend

A modern, responsive frontend application for a Transportation Management System (TMS) Billing platform built with React.js, Tailwind CSS, and JavaScript.

## 🚀 Features

- **Modern UI/UX**: Clean, professional design with milky theme and smooth animations
- **Authentication**: Login and Signup pages with form validation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Architecture**: Well-organized, reusable components (max 120 lines each)
- **Form Handling**: React Hook Form with comprehensive validation
- **API Integration**: Ready for backend integration with dummy API endpoints
- **Toast Notifications**: User-friendly feedback with react-hot-toast

## 🛠️ Tech Stack

- **React 18** - Latest version with hooks and modern features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hook Form** - Form state management and validation
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Toast notifications

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── Login.jsx          # Login component
│   │   └── Signup.jsx         # Signup component
│   ├── common/                # Reusable common components
│   └── Dashboard.jsx          # Main dashboard
├── services/
│   ├── api.js                 # Axios configuration
│   └── authService.js         # Authentication API calls
├── helpers/
│   ├── validation.js          # Form validation utilities
│   ├── constants.js           # Application constants
│   └── utils.js               # General utility functions
├── assets/
│   ├── images/                # Image assets
│   ├── logos/                 # Logo files
│   └── icons/                 # Icon files
├── hooks/                     # Custom React hooks
├── contexts/                  # React contexts
└── utils/                     # Additional utilities
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tms-billing-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🔐 Demo Credentials

For testing purposes, use these demo credentials:

**Admin Account:**
- Email: `admin@tms.com`
- Password: `Admin123!`

**User Account:**
- Email: `user@tms.com`
- Password: `User123!`

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#0ea5e9 to #0369a1)
- **Milky Theme**: White and grey shades for clean, professional look
- **Background**: Gradient from milky-50 to milky-100

### Components
- **Cards**: Glass effect with backdrop blur
- **Buttons**: Gradient primary and secondary styles
- **Inputs**: Rounded with focus states and validation
- **Animations**: Fade-in, slide-up, and floating effects

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=TMS Billing System
VITE_APP_VERSION=1.0.0
```

### API Integration
The application is ready for backend integration. Update the API endpoints in:
- `src/services/api.js` - Base API configuration
- `src/services/authService.js` - Authentication endpoints

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktop (1024px and up)
- Large screens (1280px and up)

## 🧪 Code Quality

- **Component Size**: Maximum 120 lines per component
- **Helper Functions**: Separated into dedicated files
- **API Services**: Organized by feature
- **Validation**: Comprehensive form validation
- **Error Handling**: User-friendly error messages
- **Loading States**: Smooth loading indicators

## 🚀 Deployment

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## 🔄 Future Enhancements

- [ ] Dashboard with billing analytics
- [ ] Invoice management system
- [ ] Customer management
- [ ] Payment tracking
- [ ] Reporting and analytics
- [ ] User profile management
- [ ] Settings and preferences

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please contact the development team.
