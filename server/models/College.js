const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const College = sequelize.define(
  "colleges",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    defaultValue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true, timestamps: true, paranoid: true }
);

module.exports = College;
