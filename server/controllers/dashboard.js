const User = require("../models/User");
const SurveyResult = require("../models/SurveyResult");

const getDashboardData = async (req, res, next) => {
  let data;

  try {
    const user = await User.findByPk(req.user.id);

    if (user.role === "admin") {
      data = await getAdminDashboardData();
    } else {
      data = await getStudentDashboardData(user.id);
    }

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};

async function getAdminDashboardData() {
  try {
    const totalusersRegistred = await User.count();
    const totalSurveysSubmitted = await SurveyResult.count();

    return {
      totalusersRegistred,
      totalSurveysSubmitted,
    };
  } catch (err) {
    console.log(err);
  }
}

async function getStudentDashboardData(userId) {
  try {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: SurveyResult,
        },
      ],
    });

    return {
      user,
    };
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getDashboardData,
};
