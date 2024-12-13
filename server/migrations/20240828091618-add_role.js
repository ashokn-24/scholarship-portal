"use strict";

const sequelize = require("../db/db");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "role", {
      type: Sequelize.ENUM("basic", "admin"),
      allowNull: false,
      defaultValue: "basic",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "role");
  },
};
