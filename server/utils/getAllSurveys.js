const sequelize = require("../db/db");

async function getSurveysData() {
  const [result] = await sequelize.query(
    'SELECT a.*, b.id AS collegeId, b.defaultValue AS collegeNameEng, b.ar AS collegeNameAr, c.id AS courseId, c."default" AS courseNameEng, c.ar AS courseNameAr FROM surveyresults AS a LEFT JOIN colleges AS b ON b.value = a.college LEFT JOIN courses AS c ON c.id = a.course WHERE a.deletedAt IS NULL;'
  );

  return result;
}

module.exports = getSurveysData;
