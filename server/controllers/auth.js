const { OAuth2Client } = require("google-auth-library");
const { ConfidentialClientApplication } = require("@azure/msal-node");

const User = require("../models/User");
const UserOAuth = require("../models/UserOAuth");
const College = require("../models/College");

const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const sequelize = require("../db/db");
const { where } = require("sequelize");
const storeUserInfo = require("../utils/storeUser");
const generateTokens = require("../utils/generateTokens");

dotenv.config();

const adminEmails = JSON.parse(process.env.ADMIN_EMAILS);

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.POROTOCOL}://${process.env.HOST}/api/auth/google/callback`
);

const graphMeEndpoint = "https://graph.microsoft.com/v1.0/me";

const microsoftRedirectURI = `${process.env.POROTOCOL}://${process.env.HOST}/api/auth/microsoft/callback`;

const clientUri = `${process.env.POROTOCOL}://${process.env.HOST}`;

const msalConfig = {
  auth: {
    clientId: process.env.MICROSOFT_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}`,
    redirectUri: microsoftRedirectURI,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    tokenRenewalOffsetSeconds: 300,
  },
};

const pca = new ConfidentialClientApplication(msalConfig);

const generateGoogleUrl = async (req, res) => {
  const scope = ["profile", "email"];
  try {
    const url = client.generateAuthUrl({
      access_type: "offline",
      scope: scope,
    });
    res.redirect(url);
  } catch (error) {
    console.error("Error initiating Google auth:", error);
    res.status(500).send("Failed to initiate Google authentication.");
  }
};

const googleCallbackUrl = async (req, res) => {
  const { code, error } = req.query;
  const transaction = await sequelize.transaction();

  if (error)
    return res.redirect(`${clientUri}/sign-in?success=false&error=${error}`);

  try {
    const { tokens } = await client.getToken(code);
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const role = adminEmails.includes(payload.email) ? "admin" : "basic";

    // Store user info in the database
    const [user] = await User.findOrCreate({
      where: {
        email: payload.email,
      },
      defaults: {
        fullName: payload.name,
        email: payload.email,
        picture: payload.picture,
        role: role,
      },
      transaction: transaction,
    });

    const userOauth = await UserOAuth.updateOrCreate({
      where: {
        userId: user.id,
        provider: "google",
      },
      data: {
        userId: user.id,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        provider: "google",
      },
      transaction: transaction,
    });

    const { id, fullName, email } = user;

    const { accessToken, refreshToken } = await generateTokens({
      id,
      fullName,
      email,
    });

    transaction.commit();

    // Store tokens in cookies
    res.cookie("rftkn", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.redirect(
      `${clientUri}/sign-in?accessToken=${accessToken}&success=true`
    );
  } catch (error) {
    await transaction.rollback();
    console.error("Error handling Google callback:", error);
    res.status(500).send("Authentication failed.");
  }
};

const refreshToken = async (req, res) => {
  const rftkn = req.cookies.rftkn;

  if (!rftkn) {
    return res.status(401).json({ message: "unauthorized" });
  }

  jwt.verify(rftkn, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res.status(403);
    }

    const userData = await User.findByPk(user.id);

    if (!userData) {
      return res.status(403).json({ message: "unauthorized" });
    }

    const { id, fullName, email } = userData;

    const { accessToken, refreshToken } = await generateTokens({
      id,
      fullName,
      email,
    });

    res.cookie("rftkn", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.json({ accessToken });
  });

  // return res.status(500).json({ message: "internal server error" });
};

// Microsoft OAuth flow would be similar
const generateMicrosoftUrl = async (req, res) => {
  const authCodeUrlParameters = {
    scopes: ["user.read"],
    redirectUri: microsoftRedirectURI,
  };

  pca
    .getAuthCodeUrl(authCodeUrlParameters)
    .then((response) => res.redirect(response))
    .catch((error) => {
      console.error("Error generating Microsoft auth URL:", error);
      res.status(500).send("Failed to initiate Microsoft authentication.");
    });
};

const MicrosoftCallbackUrl = async (req, res) => {
  const { code, error } = req.query;

  const transaction = await sequelize.transaction();

  if (error) return res.redirect(`${clientUri}/?success=false&error=${error}`);

  const tokenRequest = {
    code,
    redirectUri: microsoftRedirectURI,
    scopes: ["user.read"],
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    authority: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}`,
  };

  try {
    const response = await pca.acquireTokenByCode(tokenRequest);
    const userResponse = await fetch(graphMeEndpoint, {
      headers: { Authorization: `Bearer ${response.accessToken}` },
    });

    // USER PROFILE FETCH
    // const userPfp = await fetch(`${graphMeEndpoint}/me/photo/$value`, {
    //   headers: { Authorization: `Bearer ${response.accessToken}` },
    // });

    // if (userPfp.ok) {
    //   const buffer = await userPfp.arrayBuffer();
    //   const base64Image = Buffer.from(buffer).toString("base64");
    //   const imageUrl = `data:image/jpeg;base64,${base64Image}`;
    //   // console.log("Image URL:", imageUrl);
    // } else {
    //   console.error(
    //     "Error fetching profile photo:",
    //     userPfp.status,
    //     userPfp.statusText
    //   );
    // }

    if (!userResponse.ok)
      throw new Error(`Microsoft Graph API error: ${userResponse.status}`);

    const userProfile = await userResponse.json();

    const role = adminEmails.includes(userProfile.mail) ? "admin" : "basic";

    const [user] = await User.findOrCreate({
      where: {
        email: userProfile.mail,
      },
      defaults: {
        fullName: userProfile.displayName,
        email: userProfile.mail,
        picture: userProfile.picture,
        role: role,
      },
      transaction: transaction,
    });

    const userOauth = await UserOAuth.updateOrCreate({
      where: {
        userId: user.id,
        provider: "microsoft",
      },
      data: {
        userId: user.id,
        accessToken: response.accessToken,
        refreshToken: null,
        provider: "microsoft",
      },
      transaction: transaction,
    });

    const { id, fullName, email } = user;

    const { accessToken, refreshToken } = await generateTokens({
      id,
      fullName,
      email,
    });

    transaction.commit();

    res.cookie("rftkn", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.redirect(
      `${clientUri}/sign-in?accessToken=${accessToken}&success=true`
    );
  } catch (error) {
    transaction.rollback();
    console.error("Error during Microsoft OAuth callback:", error);
    res.status(500).send("Authentication failed.");
  }
};

const profileViewer = async (req, res) => {
  if (!req.user) {
    console.warn("User is not authenticated.");
    return res.status(401).json({ message: "Not authenticated" });
  }

  const user = await User.findOne({ where: { email: req.user.email } });

  res.status(200).json(user);
};

const logout = async (req, res) => {
  res.clearCookie("rftkn"); // clearing refresh token

  res.status(200).send("Logout successful");
};

module.exports = {
  generateGoogleUrl,
  googleCallbackUrl,
  generateMicrosoftUrl,
  MicrosoftCallbackUrl,
  profileViewer,
  refreshToken,
  logout,
};
