const SurveyResult = require("../models/SurveyResult");
const User = require("../models/User");
const getSurveysData = require("../utils/getAllSurveys");

const getAllSurveys = async (req, res) => {
  try {
    const surveys = await getSurveysData();
    res.status(200).json(surveys);
  } catch (err) {
    console.error("Error during get Scholarship:", err);
    res.status(500).send("Error fetching Scholarship");
  }
};

const getSurveyByID = async (req, res) => {
  const params = req.params.id;
  const user = await User.findByPk(req.user.id);

  try {
    const survey = await SurveyResult.findByPk(req.params.id);

    if (user.role !== "admin" && survey.userId !== user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    res.status(200).json(survey);
  } catch (err) {
    console.error("Error during get scholarship by ID:", err);
    res.status(500).send("Error fetching scholarships");
  }
};

const deleteSurveyByID = async (req, res) => {
  try {
    await SurveyResult.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "scholarship deleted successfully" });
  } catch (err) {
    console.error("Error during delete scholarship:", err);
    res.status(500).send("Error fetching scholarships");
  }
};

module.exports = { getAllSurveys, getSurveyByID, deleteSurveyByID };
