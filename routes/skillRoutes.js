const express = require('express');
const router = express.Router();
const { getSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skillController');
const { protect } = require('../middleware/auth');
const { body } = require('express-validator');
const { validateResult } = require('../middleware/validate');

// Validation middleware for creating/updating a skill
const validateSkill = [
  body('name').notEmpty().withMessage('Skill name is required'),
];

// Routes
router.route('/')
  .get(getSkills)
  .post(protect, validateSkill, validateResult, createSkill);

router.route('/:id')
  .put(protect, validateSkill, validateResult, updateSkill)
  .delete(protect, deleteSkill);

module.exports = router;
