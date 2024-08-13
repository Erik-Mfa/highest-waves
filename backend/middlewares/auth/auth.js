const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
  // Access the token from the cookie
  const token = req.cookies.jwt_token;

  console.log('Cookies:', req.cookies); // Log all cookies for debugging
  console.log('Token:', token); // Log the token extracted

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Token verification error:', err.message); // Log token verification errors
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};



const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

module.exports = { authorize, isAdmin };
