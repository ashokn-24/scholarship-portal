const express = require("express");
const {
  generateGoogleUrl,
  googleCallbackUrl,
  generateMicrosoftUrl,
  MicrosoftCallbackUrl,
  logout,
  profileViewer,
  refreshToken,
  collegeDataAPI,
} = require("../controllers/auth");
const authenticateJwt = require("../middleware/authJWT");
const router = express.Router();

router.get("/google", generateGoogleUrl);
router.get("/google/callback", googleCallbackUrl);

router.get("/microsoft", generateMicrosoftUrl);
router.get("/microsoft/callback", MicrosoftCallbackUrl);

router.post("/refresh-token", refreshToken);

router.get("/profile", authenticateJwt, profileViewer);
router.get("/logout", logout);

module.exports = router;
