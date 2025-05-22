const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
const { StatusCodes } = require("http-status-codes");
require("dotenv").config();

const connectToDatabase = require("./DB/connectToDatabase");
const jobsRouter = require("./routes/JobRoutes");
const authRouter = require("./routes/authRoutes");

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.use("/api/v1/jobs", jobsRouter);
app.use("/api/v1/auth", authRouter);

app.use((err, req, res, next) => {
  console.log(chalk.red(err));
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
