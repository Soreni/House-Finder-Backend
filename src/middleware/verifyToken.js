const jwt = require("jsonwebtoken");
const config = require('../config/key')


module.exports = function(req, res, next) {
    const token = req.header("auth-token");
    if (!token) return res.status(401).json("Access denied. No token provided.");
  
    try {
      const decoded = jwt.verify(token, config.JWT_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json("Invalid token.");
    }
  };
  