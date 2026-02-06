const Submission = require('../models/Submission');
const Review = require('../models/Review');
const mongoose = require('mongoose');

// User analytics
exports.getUserAnalytics = async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.user.id);

    const userId = req.user.id;

    // 1. Total submissions
    const totalSubmissions = await Submission.countDocuments({ user: userId });

    // 2. Average AI score
   const aiScoreAgg = await Submission.aggregate([
  { $match: { user: userObjectId } },
  { $group: { _id: null, avgScore: { $avg: '$score' } } }
]);


    const avgAIScore = aiScoreAgg[0]?.avgScore || 0;

    // 3. Scores over time (for graphs)
    const scoreTimeline = await Submission.find({ user: userId })
      .select('score createdAt')
      .sort({ createdAt: 1 });

    // 4. Peer review average
 const peerScoreAgg = await Review.aggregate([
  {
    $lookup: {
      from: 'submissions',
      localField: 'submission',
      foreignField: '_id',
      as: 'submissionData'
    }
  },
  { $unwind: '$submissionData' },
  { $match: { 'submissionData.user': userObjectId } },
  {
    $group: {
      _id: null,
      avgPeerScore: { $avg: '$score' }
    }
  }
]);

    const avgPeerScore = peerScoreAgg[0]?.avgPeerScore || 0;

    res.json({
      totalSubmissions,
      avgAIScore: Number(avgAIScore.toFixed(2)),
      avgPeerScore: Number(avgPeerScore.toFixed(2)),
      scoreTimeline
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
