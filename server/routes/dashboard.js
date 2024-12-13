const { Router } = require("express");
const authenticateJwt = require("../middleware/authJWT");
const { getDashboardData } = require("../controllers/dashboard");

const router = Router();

router.get("/", authenticateJwt, getDashboardData);

module.exports = router;