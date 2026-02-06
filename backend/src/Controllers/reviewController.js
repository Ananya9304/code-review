const Review = require('../models/Review');
const Submission = require('../models/Submission');

// Create peer review
exports.createReview = async (req, res) => {
  const { score, comment } = req.body;
  const submissionId = req.params.submissionId;

  try {
    const submission = await Submission.findById(submissionId);
    if (!submission) {
      return res.status(404).json({ msg: 'Submission not found' });
    }

    const review = await Review.create({
      submission: submissionId,
      reviewer: req.user.id,
      score,
      comment
    });

    submission.status = 'peer_reviewed';
    await submission.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get reviews for a submission
exports.getReviewsForSubmission = async (req, res) => {
  try {
    const reviews = await Review.find({
      submission: req.params.submissionId
    }).populate('reviewer', 'name email');

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
