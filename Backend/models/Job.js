const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['details', 'inProgress', 'accepted', 'rejected'],
    default: 'details'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);
