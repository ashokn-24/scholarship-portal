const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./db/db");
const apiRoutes = require("./api");
const path = require("path");

dotenv.config();

require("./events/subscribers");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.static(path.join(__dirname, "public", "dist")));

// Sync the DATABASE AND Models
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to MS SQL Server established successfully.");
    await sequelize.sync();
    console.log("Database & tables synced successfully.");
  } catch (err) {
    console.error("Database Error:", err);
  }
})();

// Routes
app.use("/api", apiRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "dist", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
