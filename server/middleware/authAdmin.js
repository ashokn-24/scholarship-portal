const User = require("../models/User");

const authenticateAdmin = async (req, res, next) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const user = await User.findOne({
      where: { email: req.user.email },
    });

    if (!user || user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden. Admin role required." });
    }

    next();
  } catch (err) {
    console.error("Error in Admin Middleware:", err);
    res.sendStatus(500); // Internal Server Error for unexpected issues
  }
};

module.exports = authenticateAdmin;
