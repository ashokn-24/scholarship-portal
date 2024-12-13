const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const College = require("./College");

const Course = sequelize.define(
  "courses",
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
    default: {
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

College.hasMany(Course);

Course.belongsTo(College, {
  foreignKey: "collegeId",
  onDelete: "CASCADE",
});

module.exports = Course;
