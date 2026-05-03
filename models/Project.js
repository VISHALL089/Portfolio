const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a project title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  technologies: {
    type: [String],
    required: [true, 'Please add at least one technology'],
  },
  githubLink: {
    type: String,
  },
  liveLink: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
