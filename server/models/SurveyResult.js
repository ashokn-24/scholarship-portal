const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./User");

const SurveyResult = sequelize.define(
  "surveyresults",
  {
    id: {
      type: DataTypes.CHAR(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    referenceId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    surName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    familyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthPlace: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    maritalStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isKuwaitResidency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passportNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passportExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    college: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    course: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    personName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    howDidYouFind: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nominatingInstitution: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    directorName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    organizationEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    whoSupportsTheFamily: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doYouWork: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doYouVolunteer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    receiveGrant: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    typeOfScholarship: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthFile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photoFile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    diplomaFile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gradesFile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passportFile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passportValidFile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    healthFile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    arabLangFile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    criminalStatusFile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    recommendationFile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    testCompletionFile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sequenceFile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    kuwaitEduFile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { freezeTableName: true, timestamps: true, paranoid: true }
);

User.hasMany(SurveyResult);

SurveyResult.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

module.exports = SurveyResult;
