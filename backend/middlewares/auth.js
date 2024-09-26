const jwt = require('jsonwebtoken');
 
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
 
  // Check if token is present
  if (!token) {
    return res.status(403).json({ message: 'Access Denied: No Token Provided!' });
  }
 
  try {
    // Verify the token
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
    req.user = decoded; // You can pass the decoded data to the request object if needed
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token!' });
  }
};
 
module.exports = verifyToken;