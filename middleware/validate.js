const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    // Create an error with all validation messages
    throw new Error(errors.array().map(err => err.msg).join(', '));
  }
  next();
};

module.exports = { validateResult };
