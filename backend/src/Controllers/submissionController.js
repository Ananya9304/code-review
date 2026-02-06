const Submission = require('../models/Submission');
const { analyzeCode } = require('../services/aiReviewService');

// Create submission
exports.createSubmission = async (req, res) => {
  const { title, code, language } = req.body;

  try {
    const aiResult = analyzeCode(code, language);

    const submission = await Submission.create({
      user: req.user.id,
      title,
      code,
      language,
      score: aiResult.score,
      aiFeedback: aiResult.aiFeedback,
      issues: aiResult.issues,
      suggestions: aiResult.suggestions,
      complexity: aiResult.complexity,
      status: "ai_reviewed"
    });

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get logged-in user's submissions
exports.getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ user: req.user.id });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all submissions
exports.getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find().populate('user', 'name email');
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single submission
exports.getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id).populate('user', 'name email');
    if (!submission) return res.status(404).json({ msg: 'Submission not found' });
    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
