const path = require("path");
const College = require("../models/College");
const Course = require("../models/Course");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const saveFile = require("../utils/saveFile");
const SurveyResult = require("../models/SurveyResult");
const { eventEmitter, events } = require("../events/emitter");
const User = require("../models/User");
const generateReferenceID = require("../utils/refrenceId");
const Counter = require("../models/Counter");

const { CONTACT_US, FORM_SUBMITTED } = events;

const collegeDataAPI = async (req, res) => {
  try {
    const colleges = await College.findAll();

    res.status(200).json(colleges);
  } catch (err) {
    console.error("Error during college data API:", error);
    res.status(500).send("Authentication failed.");
  }
};

const coursesDataAPI = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json(courses);
  } catch (err) {
    console.error("Error during courses data API:", error);
    res.status(500).send("Authentication failed.");
  }
};

const saveSurveyResults = async (req, res) => {
  try {
    const userId = req.user.id;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    let counterRecord = await Counter.findOne({
      where: { year: currentYear, month: currentMonth },
    });

    let counter = 1;

    if (counterRecord) {
      counter = counterRecord.counter + 1;
    } else {
      await Counter.create({
        year: currentYear,
        month: currentMonth,
        counter: 1,
      });
    }

    const referenceId = generateReferenceID(currentYear, currentMonth, counter);

    const existResults = await SurveyResult.findOne({ where: { userId } });

    if (existResults) {
      return res.json({ hasSubmitted: true });
    }

    const surveyData = req.body;

    const fileFields = [
      "birthFile",
      "photoFile",
      "diplomaFile",
      "gradesFile",
      "passportFile",
      "passportValidFile",
      "healthFile",
      "arabLangFile",
      "criminalStatusFile",
      "recommendationFile",
      "testCompletionFile",
      "sequenceFile",
      "kuwaitEduFile",
    ];

    let allSavedFiles = {};
    for (const field of fileFields) {
      const files = req.body[field];
      const savedFilePath = saveFile(files, field);
      if (savedFilePath) {
        allSavedFiles[field] = savedFilePath;
      }
    }

    const updatedSurveyData = {
      ...surveyData,
      ...allSavedFiles,
      userId,
      referenceId,
    };

    const results = await SurveyResult.create(updatedSurveyData);

    await Counter.update(
      { counter },
      { where: { year: currentYear, month: currentMonth } }
    );

    const user = await User.findByPk(userId);
    eventEmitter.emit(FORM_SUBMITTED, {
      name: user.fullName,
      email: user.email,
      referenceId: results.referenceId,
    });

    res.status(201).json({
      message: "Survey results saved successfully.",
      savedFiles: allSavedFiles,
      referenceId,
      hasSubmitted: false,
    });
  } catch (err) {
    console.error("Error during save survey results API:", err);
    res.status(500).send("Internal server error.");
  }
};

const submitQueryForm = (req, res) => {
  const { name, email, questions } = req.body;

  try {
    eventEmitter.emit(CONTACT_US, { name, email, questions });
    res.status(200).json({
      message: "Submitted successfully",
    });
  } catch (err) {
    console.error("Error during submitting query form: ", err);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  collegeDataAPI,
  coursesDataAPI,
  saveSurveyResults,
  submitQueryForm,
};
