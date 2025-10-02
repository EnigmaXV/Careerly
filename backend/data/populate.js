/* eslint-env node */
/* global process */

const mockData = require("./mockData");
const Job = require("../models/JobModel");
require("dotenv").config();
const connectDB = require("../DB/connectToDatabase");

const url = process.env.MONGO_URI.replace(
  "<db_password>",
  process.env.MONGO_PASSWORD
);

const populateDatabase = async () => {
  try {
    await connectDB(url);
    console.log("Connected to MongoDB successfully");

    const modifiedMockData = mockData.map((job) => {
      return {
        ...job,
        createdBy: "684214b2e2b9a4904b708c9b",
      };
    });
    await Job.create(modifiedMockData);
    console.log("✅Jobs populated successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error populating database:", err);
    process.exit(1);
  }
};

if (process.argv.includes("--import")) {
  populateDatabase();
} else {
  console.log("No action specified. Use --import to populate the database.");
  process.exit(1);
}
