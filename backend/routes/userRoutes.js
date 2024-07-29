const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

// Register User
router.post('/register', [
  check('firstname', 'First name is required').not().isEmpty(),
  check('lastname', 'Last name is required').not().isEmpty(),
  check('phone', 'Phone number is required').not().isEmpty(),
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').exists()
], userController.registerUser);

// Login User
router.post('/login', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').exists()
], userController.loginUser);

// Get User Profile
router.get('/profile', auth, userController.getUserProfile);

// Update User Profile
router.put('/profile', auth, userController.updateUserProfile);
router.delete('/profile', auth, userController.deleteUserProfile);

module.exports = router;
