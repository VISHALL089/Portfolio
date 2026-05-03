const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/authController');
const { body } = require('express-validator');
const { validateResult } = require('../middleware/validate');

// Validation middleware
const validateLogin = [
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').exists().withMessage('Password is required'),
];

const validateRegister = [
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// Routes
router.post('/login', validateLogin, validateResult, loginUser);
router.post('/register', validateRegister, validateResult, registerUser);

module.exports = router;
