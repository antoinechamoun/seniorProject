const jwt = require("jsonwebtoken");

const verifyIsLoggedIn = (req, res, next) => {
  next();
  return;
  try {
    const token = req.cookies.access_token;
    if (!token) {
      res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).send("Unauthorized, Invalid token");
    }
  } catch (error) {
    next(error);
  }
};

const verifyIsAdmin = (req, res, next) => {
  next();
  return;
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Unauthorized token. Admin access only");
  }
};

module.exports = { verifyIsLoggedIn, verifyIsAdmin };
