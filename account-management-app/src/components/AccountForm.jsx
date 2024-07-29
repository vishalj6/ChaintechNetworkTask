import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../css/AccountForm.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearToken } from '../slices/authSlice';

const AccountForm = () => {
    // Redux hooks for accessing and dispatching authentication state
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Local state for form data, password visibility, and validation errors
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        password: ''
    });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({});

    // Fetch user profile data when the component mounts or token changes
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Redirect to login if no token is present
                if (!token) {
                    navigate('/login');
                    return;
                }
                // Fetch profile data using the token
                const response = await axios.get('/users/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching user profile', error);
                toast.error('Error fetching user profile');
            }
        };

        fetchUserProfile();
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

        // Check if phone number is valid
        if (!/^\d{10}$/.test(formData.phone)) {
            tempErrors.phone = 'Phone number must be 10 digits';
            isValid = false;
        }

        // Check if password meets length requirement
        if (formData.password && formData.password.length < 6) {
            tempErrors.password = 'Password must be at least 6 characters long';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    // Handle form submission to update user profile
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await axios.put(
                '/users/profile',
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Error updating profile');
        }
    };

    // Handle account deletion
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                await axios.delete('/users/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success('Account deleted successfully');
                dispatch(clearToken());
                navigate('/login');
            } catch (error) {
                toast.error('Error deleting account');
            }
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Handle user logout
    const onLogout = () => {
        dispatch(clearToken());
        navigate('/login');
    }

    return (
        <div className='account-form-container'>
            <form className='account-form' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="firstname"
                        value={formData.firstname ?? ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="lastname"
                        value={formData.lastname ?? ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone"
                        value={formData.phone ?? ""}
                        onChange={handleChange}
                    />
                    {errors.phone && <div className="text-danger">{errors.phone}</div>}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email ?? ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group position-relative">
                    <label>Password</label>
                    <input
                        type={passwordVisible ? 'text' : 'password'}
                        className="form-control"
                        name="password"
                        value={formData.password ?? ""}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        className="btn position-absolute text-light"
                        style={{ top: '50%', right: '5px', transform: 'translateY(-20%)' }}
                        onClick={togglePasswordVisibility}
                    >
                        <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
                    </button>
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                </div>
                <div className='mt-3'>
                    <button type="submit" className="btn btn-primary me-2">Update</button>
                    <button
                        type="button"
                        className="btn btn-danger me-2"
                        onClick={handleDelete}
                    >
                        Delete Account
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                </div>
            </form>
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

export default AccountForm;
