const jwt = require("jsonwebtoken");

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden if the token is invalid or expired
      }
      req.user = user;
      // Attach the decoded user data to req.user
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = authenticateJwt;
