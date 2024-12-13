"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("colleges", "value", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.createTable("courses", {
      id: {
        type: Sequelize.CHAR(36),
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      default: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ar: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      collegeId: {
        type: Sequelize.CHAR(36),
        references: {
          model: "colleges",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("colleges", "value");
    await queryInterface.dropTable("courses");
  },
};
