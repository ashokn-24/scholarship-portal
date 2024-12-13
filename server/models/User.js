const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        "https://img.myloview.com/murals/default-avatar-profile-icon-vector-social-media-user-symbol-image-700-244492311.jpg",
    },
    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      allowNull: false,
      defaultValue: "Active",
    },
    role: {
      type: DataTypes.ENUM("basic", "admin"),
      allowNull: true,
      defaultValue: "basic",
    },
  },
  { freezeTableName: true, timestamps: true, paranoid: true }
);

module.exports = User;
