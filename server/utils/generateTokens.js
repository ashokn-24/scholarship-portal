const { sign } = require("jsonwebtoken");

const generateTokens = async (payload) => {
  const accessToken = await sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 1000 * 60 * 60, // 1 hour
  });

  const refreshToken = await sign(
    { id: payload.id }, // Corrected payload
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: 1000 * 60 * 60 * 24 * 7, // 1 week
    }
  );

  return { accessToken, refreshToken };
};

// Corrected export statement
module.exports = generateTokens;
