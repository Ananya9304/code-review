const express = require('express');
const router = express.Router();
const { getUserAnalytics } = require('../Controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/me', protect, getUserAnalytics);

module.exports = router;
