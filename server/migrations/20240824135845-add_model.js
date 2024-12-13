"use strict";

const User = require("../models/User");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("surveyresults", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      surName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      familyName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      birthPlace: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      maritalStatus: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isKuwaitResidency: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nationality: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      passportNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      passportExpires: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      college: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      course: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      personName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      telephone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      howDidYouFind: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nominatingInstitution: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      directorName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      organizationEmail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      whoSupportsTheFamily: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      doYouWork: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      doYouVolunteer: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      receiveGrant: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      typeOfScholarship: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      birthFile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      photoFile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      diplomaFile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gradesFile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      passportFile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      passportValidFile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      healthFile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      arabLangFile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      criminalStatusFile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      recommendationFile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      testCompletionFile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sequenceFile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      kuwaitEduFile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      userId: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        references: {
          model: "users", // References the User model
          key: "id",
        },
        onDelete: "CASCADE",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("surveyresults");
  },
};
