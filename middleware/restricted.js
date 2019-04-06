const checkToken = require("../auth/token-handlers").checkToken;

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decToken = checkToken(token);

    if (decToken) {
      req.token = decToken;
      next();
    } else {
      res.status(401).json({ message: "Invalid token." });
    }
  } else {
    res.status(400).json({ message: "No token provided." });
  }
};
