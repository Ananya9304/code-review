const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: String,
    code: String,
    language: String,

    score: {
      type: Number,
      default: 0
    },
    aiFeedback: String,

    issues: [String],
    suggestions: [String],
    complexity: String,

    status: {
      type: String,
      enum: ['pending', 'ai_reviewed', 'peer_reviewed'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Submission', submissionSchema);
