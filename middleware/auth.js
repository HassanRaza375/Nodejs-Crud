const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization"); // Get full Authorization header
  console.log("Authorization Header:", authHeader); // Debugging output

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied, no token" });
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer "
  console.log("Extracted Token:", token); // Debugging output

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
