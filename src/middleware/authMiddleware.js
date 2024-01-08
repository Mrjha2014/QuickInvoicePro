const jwt = require("jsonwebtoken");
const config = require("../config/config");

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

const requireSuperUser = (req, res, next) => {
  authenticate(req, res, () => {
    if (req.user && req.user.isSuperUser) {
      return next();
    } else {
      return res.status(403).json({ message: 'Access denied. Requires superuser privileges.' });
    }
  });
};

module.exports = { authenticate, requireSuperUser };
