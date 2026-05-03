const express = require('express');
const router = express.Router();
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { protect } = require('../middleware/auth');
const { body } = require('express-validator');
const { validateResult } = require('../middleware/validate');

// Validation middleware for creating/updating a project
const validateProject = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('technologies').isArray({ min: 1 }).withMessage('At least one technology is required'),
];

// Routes
router.route('/')
  .get(getProjects)
  .post(protect, validateProject, validateResult, createProject);

router.route('/:id')
  .put(protect, validateProject, validateResult, updateProject)
  .delete(protect, deleteProject);

module.exports = router;
