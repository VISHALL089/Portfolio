const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  socialLinks: {
    linkedin: String,
    github: String,
    twitter: String,
  },
  resumeLink: {
    type: String,
  },
}, { timestamps: true });

const About = mongoose.model('About', aboutSchema);
module.exports = About;
