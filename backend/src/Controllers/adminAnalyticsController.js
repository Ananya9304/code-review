const User = require('../models/User');
const Submission = require('../models/Submission');
const Review = require('../models/Review');

exports.getAdminAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalSubmissions = await Submission.countDocuments();
    const totalReviews = await Review.countDocuments();

    const avgAIScoreAgg = await Submission.aggregate([
      { $group: { _id: null, avgScore: { $avg: '$score' } } }
    ]);

    const avgAIScore = avgAIScoreAgg[0]?.avgScore || 0;

    const topUsers = await Submission.aggregate([
      {
        $group: {
          _id: '$user',
          avgScore: { $avg: '$score' }
        }
      },
      { $sort: { avgScore: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      totalUsers,
      totalSubmissions,
      totalReviews,
      avgAIScore: Number(avgAIScore.toFixed(2)),
      topUsers
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
