"use strict";

const colleges = require("../data/collegeName.json");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "colleges",
      colleges.map((clg) => {
        return {
          id: uuidv4(),
          defaultValue: clg.defaultValue,
          value: clg.value,
          ar: clg.ar,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("colleges", null, {});
  },
};
