"use strict";
const { v4: uuidv4 } = require("uuid");

const colleges = require("../data/collegeName.json");
const courses = require("../data/courseName.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch all colleges
    const [colleges] = await queryInterface.sequelize.query(
      `SELECT id, value FROM colleges`
    );

    // Create a map of college values to their IDs
    const collegeMap = colleges.reduce((acc, college) => {
      acc[college.value] = college.id;
      return acc;
    }, {});

    // Map courses to include the correct collegeId
    const coursesWithCollegeId = courses.map((course) => {
      return {
        id: uuidv4(),
        value: course.value,
        default: course.default,
        ar: course.ar,
        createdAt: new Date(),
        updatedAt: new Date(),
        collegeId: collegeMap[course.value], // Use the mapped college ID
      };
    });

    // Bulk insert courses
    await queryInterface.bulkInsert("courses", coursesWithCollegeId);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("courses", null, {});
  },
};
