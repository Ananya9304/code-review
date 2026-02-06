const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Optional role check middleware
exports.authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json({ msg: 'Forbidden: insufficient role' });
  next();
};
