const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  console.log("--- AUTH DEBUG ---");
  console.log("Token Received:", token ? "Yes (starts with " + token.substring(0, 10) + ")" : "No");
  console.log("Secret in use:", process.env.JWT_SECRET);

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Verification Success! User ID:", decoded.id);
    next();
  } catch (err) {
    console.log("Verification Failed Error:", err.message);
    return res.status(401).json({ message: 'Token is not valid', error: err.message });
  }
};