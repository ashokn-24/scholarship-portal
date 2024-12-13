const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");

dotenv.config();

const saveFile = (files, field) => {
  if (Array.isArray(files) && files.length > 0) {
    const folderPath = `./uploads/${field}`;

    // Create the directory if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const fileData = files[0]; // Assuming you want the first file for each field
    if (fileData && fileData.name && fileData.content) {
      const extension = path.extname(fileData.name);
      const base64Data = fileData.content.replace(
        /^data:application\/pdf;base64,/,
        ""
      );
      const fileName = uuidv4() + extension;
      const filePath = `${folderPath}/${fileName}`;

      try {
        fs.writeFileSync(filePath, base64Data, "base64");

        // Construct the full file URL using environment variables
        const protocol = process.env.PROTOCOL || "http";
        const host = process.env.HOST || "localhost:3000";
        const fullFilePath = `${protocol}://${host}/api/static/${field}/${fileName}`;

        return fullFilePath; // Return the full URL of the saved file
      } catch (err) {
        console.log(`Error saving ${field}:`, err);
      }
    } else {
      console.log(`Skipping ${field}: Invalid file data`);
    }
  }
  return ""; // Return an empty string if no file was saved
};

module.exports = saveFile;
