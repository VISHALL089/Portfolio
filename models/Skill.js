const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a skill name'],
    trim: true,
    unique: true,
  },
  category: {
    type: String,
    enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Other'],
    default: 'Other',
  },
  proficiency: {
    type: Number,
    min: 1,
    max: 100,
  },
}, { timestamps: true });

const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;
