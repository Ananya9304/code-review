const express = require('express');
const router = express.Router();
const {
  createReview,
  getReviewsForSubmission
} = require('../Controllers/reviewController');

const { protect, authorize } = require('../middleware/authMiddleware');

// Reviewer/Admin can review
router.post(
  '/:submissionId',
  protect,
  authorize('reviewer', 'admin'),
  createReview
);

// Get reviews (any logged-in user)
router.get(
  '/:submissionId',
  protect,
  getReviewsForSubmission
);

module.exports = router;
