const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// Register User
exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, phone, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            firstname,
            lastname,
            phone,
            email,
            password
        });

        await user.save();

        jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


exports.updateUserProfile = async (req, res) => {
    try {
        const { firstname, lastname, phone, email, password } = req.body;
        const userId = req.user.id; // Assuming you have user ID in request from middleware

        // Find user and update
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.firstname = firstname;
        user.lastname = lastname;
        user.phone = phone;
        user.email = email;

        if (password) {
            user.password = password;
        }

        await user.save();
        res.json({ msg: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Error updating profile', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.deleteUserProfile = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    try {
        const userId = req.user.id;

        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
        console.error('Error deleting user account', error);
        res.status(500).json({ message: 'Error deleting account' });
    }
};