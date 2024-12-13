const express = require("express");

const {
  collegeDataAPI,
  coursesDataAPI,
  saveSurveyResults,
  submitQueryForm,
} = require("../controllers/data");
const authenticateJwt = require("../middleware/authJWT");
const router = express.Router();

router.get("/colleges", collegeDataAPI);
router.get("/courses", coursesDataAPI);
router.post("/survey-results", authenticateJwt, saveSurveyResults);
router.post("/query-form", submitQueryForm);

module.exports = router;
