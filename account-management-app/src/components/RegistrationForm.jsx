import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/RegistrationForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const RegistrationForm = () => {
  const dispatch = useDispatch();  // Redux dispatch to update the state
  const token = useSelector(state => state.auth.token);  // Access token from Redux store
  const navigate = useNavigate();  // Hook to navigate programmatically
  const [passwordVisible, setPasswordVisible] = useState(false);  // State to manage password visibility
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    password: ''
  });  // State to manage form input values
  const [errors, setErrors] = useState({});  // State to manage form validation errors

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Validate form data
  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    // Check if phone number is exactly 10 digits
    if (!/^\d{10}$/.test(formData.phone)) {
      tempErrors.phone = 'Phone number must be 10 digits';
      isValid = false;
    }

    // Check if password length is at least 6 characters
    if (formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;  // Return if validation fails

    try {
      // Send POST request to register the user
      const response = await axios.post('/users/register', formData);
      dispatch(setToken(response.data.token));  // Save token in Redux store
      toast.success('Registration successful!');
      setTimeout(() => {
        navigate('/login');  // Redirect to login page after a short delay
      }, 1000);
    } catch (error) {
      toast.error('Error registering, please try again.');  // Handle errors
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="container-fluid registration-background">
      <div className="h-100 row align-items-center justify-content-center">
        <div className="col-md-6">
          <div className="card text-white bg-dark">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Register</h3>
              <form onSubmit={handleSubmit}>
                {/* Form Fields */}
                <div className="form-group mb-3">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <div className="text-danger">{errors.phone}</div>}
                </div>
                <div className="form-group mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-group position-relative mb-3">
                  <label>Password</label>
                  <input
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    type={passwordVisible ? 'text' : 'password'}
                  />
                  {errors.password && <div className="text-danger">{errors.password}</div>}
                  <button
                    type="button"
                    className="btn position-absolute text-light"
                    style={{ top: '50%', right: '5px', transform: 'translateY(-20%)' }}
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
                  </button>
                </div>
                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-primary">Register</button>
                </div>
              </form>
              <div className="text-center">
                <Link to="/login" className="text-white">Already have an account? Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default RegistrationForm;
