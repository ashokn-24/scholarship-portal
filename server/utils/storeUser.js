const User = require("../models/User");

const storeUserInfo = async (userData) => {
  try {
    const [user] = await User.findOrCreate({
      where: {
        email: userData.email,
      },
      defaults: {
        fullName: userData.fullName,
        email: userData.email,
        picture: userData.picture,
        accessToken: userData.accessToken,
        refreshToken: userData.refreshToken,
        authType: userData.authType,
      },
    });

    return user;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = storeUserInfo;
