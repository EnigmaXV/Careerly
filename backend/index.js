/* eslint-env node */
/* global process, __dirname,  */
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
const { StatusCodes } = require("http-status-codes");
require("dotenv").config();
const path = require("path");
const cloudinary = require("cloudinary").v2;

const connectToDatabase = require("./DB/connectToDatabase");
const jobsRouter = require("./routes/JobRoutes");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

// Middlewares
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "./public")));
app.use(morgan("dev"));
app.use(cookieParser());

//Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Routes
app.use("/api/v1/jobs", jobsRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.use((err, req, res) => {
  console.log(err);
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: `Error: ${err.message}` });
});

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  const chalk = (await import("chalk")).default;
  try {
    const url = process.env.MONGO_URI.replace(
      "<db_password>",
      process.env.MONGO_PASSWORD
    );
    await connectToDatabase(url);

    app.listen(PORT, () => {
      console.log(chalk.blue("✅ Connected to MongoDB successfully"));
      console.log(chalk.green(`Server is running on port ${PORT}`));
    });
  } catch (err) {
    console.error(chalk.red("🚨 Something went wrong", err));
  }
};

startServer();
