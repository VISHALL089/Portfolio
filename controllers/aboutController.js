const About = require('../models/About');

// @desc    Get about info
// @route   GET /api/about
// @access  Public
const getAbout = async (req, res, next) => {
  try {
    // Assuming there's only one about document
    const about = await About.findOne();
    if (!about) {
      return res.json({});
    }
    res.json(about);
  } catch (error) {
    next(error);
  }
};

// @desc    Create or Update about info
// @route   PUT /api/about
// @access  Private
const updateAbout = async (req, res, next) => {
  try {
    let about = await About.findOne();

    if (about) {
      about = await About.findByIdAndUpdate(about._id, req.body, {
        new: true,
        runValidators: true,
      });
    } else {
      about = await About.create(req.body);
    }

    res.json(about);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAbout, updateAbout };
