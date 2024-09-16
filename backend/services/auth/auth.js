const jwt = require('jsonwebtoken');

  //Get this route for making authorizations, it gets the token from the Cookies (Cookies needs to be passed in every request)
  const authorize = (req, res, next) => {
    // Access the token from the cookie
    const token = req.cookies.jwt_token;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    // Check if token is valid
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log('Token verification error:', err.message);
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
