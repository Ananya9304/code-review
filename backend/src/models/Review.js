const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    submission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission',
      required: true
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    score: {
      type: Number,
      min: 0,
      max: 100,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
