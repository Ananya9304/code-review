const express = require('express');
const router = express.Router();

const {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  getMySubmissions
} = require('../controllers/submissionController');

const { protect, authorize } = require('../middleware/authMiddleware');

// ✅ Create submission (User)
router.post('/', protect, createSubmission);

// ✅ Get logged-in user's submissions
router.get('/my', protect, getMySubmissions);

// ✅ Get all submissions (Admin / Reviewer)
router.get('/', protect, authorize('admin', 'reviewer'), getAllSubmissions);

// ✅ Get single submission (MUST BE LAST)
router.get('/:id', protect, getSubmissionById);

module.exports = router;
