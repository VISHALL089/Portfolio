const express = require('express');
const router = express.Router();
const { getAbout, updateAbout } = require('../controllers/aboutController');
const { protect } = require('../middleware/auth');
const { body } = require('express-validator');
const { validateResult } = require('../middleware/validate');

// Validation middleware for updating about info
const validateAbout = [
  body('name').notEmpty().withMessage('Name is required'),
  body('bio').notEmpty().withMessage('Bio is required'),
];

// Routes
router.route('/')
  .get(getAbout)
  .put(protect, validateAbout, validateResult, updateAbout);

module.exports = router;
