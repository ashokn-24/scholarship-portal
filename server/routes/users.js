const { Router } = require("express");
const { getAllUsers } = require("../controllers/users");
const authenticateAdmin = require("../middleware/authAdmin");
const authenticateJwt = require("../middleware/authJWT");

const router = Router();

router.get("/all", authenticateJwt, authenticateAdmin, getAllUsers);

module.exports = router;