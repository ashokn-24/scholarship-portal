const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Counter = sequelize.define(
  "counters",
  {
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    counter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Counter;
