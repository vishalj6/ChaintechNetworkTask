import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccountForm from './components/AccountForm';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Component to handle private routes
const PrivateRoute = ({ element }) => {
  const token = useSelector(state => state.auth.token);  // Get token from Redux store
  return token ? element : <Navigate to="/login" />;  // Redirect to login if token is not present
};

// Main App component
const App = () => {
  return (
    <Router>
      <div className="App w-100 min-vh-100"> {/* Ensure full width and minimum height */}
        <Routes>
          <Route path="/login" element={<LoginForm />} />  {/* Route for login form */}
          <Route path="/register" element={<RegistrationForm />} />  {/* Route for registration form */}
          <Route path="/" element={<PrivateRoute element={<AccountForm />} />} />  {/* Protected route for account form */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;