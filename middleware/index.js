const jwt = require('jsonwebtoken');
const ls = require('local-storage'); 

// Middleware to extract user ID and email from token and attach to req.user
const authMiddleware = (req, res, next) => {
  const token = ls.get('token'); // Retrieve the token from local storage

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token not found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

module.exports = { authMiddleware };
