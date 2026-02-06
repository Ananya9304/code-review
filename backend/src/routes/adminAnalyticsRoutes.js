const express = require('express');
const router = express.Router();
const { getAdminAnalytics } = require('../Controllers/adminAnalyticsController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get(
  '/dashboard',
  protect,
  authorize('admin'),
  getAdminAnalytics
);

module.exports = router;
