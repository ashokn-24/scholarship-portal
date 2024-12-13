const express = require("express");

const authenticateJwt = require("../middleware/authJWT");
const {
  getAllSurveys,
  getSurveyByID,
  deleteSurveyByID,
} = require("../controllers/admin");
const authenticateAdmin = require("../middleware/authAdmin");
const router = express.Router();

router.get("/surveys", authenticateJwt, authenticateAdmin, getAllSurveys);
router.get("/survey/:id", authenticateJwt, getSurveyByID);
router.delete(
  "/survey/:id",
  authenticateJwt,
  authenticateAdmin,
  deleteSurveyByID
);

module.exports = router;
