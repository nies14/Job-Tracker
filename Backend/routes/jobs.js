const router = require('express').Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');

// Protect all routes with auth middleware
router.use(auth);

// Get all jobs for the logged-in user
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new job
router.post('/', async (req, res) => {
  const job = new Job({
    ...req.body,
    user: req.user._id
  });

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update job
router.patch('/:id', async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, user: req.user._id });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (req.body.status) job.status = req.body.status;
    if (req.body.notes) job.notes = req.body.notes;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete job
router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user._id 
    });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
