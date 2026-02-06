require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const app = express();

// DB connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/submissions', require('./src/routes/submissionRoutes'));
app.use('/api/reviews', require('./src/routes/reviewRoutes'));
app.use('/api/analytics', require('./src/routes/analyticsRoutes'));
app.use('/api/admin/analytics', require('./src/routes/adminAnalyticsRoutes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
