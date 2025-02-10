const router = require('express').Router();
const Job = require('../models/Job');

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new job
router.post('/', async (req, res) => {
  const job = new Job({
    companyName: req.body.companyName,
    jobDescription: req.body.jobDescription,
    notes: req.body.notes,
    status: req.body.status
  });

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update job status
router.patch('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (req.body.status) {
      job.status = req.body.status;
    }
    if (req.body.notes) {
      job.notes = req.body.notes;
    }
    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete job
router.delete('/:id', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
