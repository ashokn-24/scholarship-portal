const express = require("express");
const authRoutes = require("./routes/auth");
const dataRoutes = require("./routes/data");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/users");
const dashboardRoutes = require("./routes/dashboard");
const router = express.Router();
const cookieParser = require("cookie-parser");

router.use(express.json({ limit: "10mb" }));
router.use(cookieParser());

router.use("/static", express.static(__dirname + "/uploads"));

router.use("/data", dataRoutes);
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/users", userRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
