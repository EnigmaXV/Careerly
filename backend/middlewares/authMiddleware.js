/* global process */

const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const protect = async (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "You are not authorized to access this route" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    const isTestUser = req.user.userId === "684214b2e2b9a4904b708c9b";
    const activeUser = await User.findById(req.user.userId).select("-password");
    if (!activeUser) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "User not found" });
    }

    req.user.testUser = isTestUser;

    activeUser.lastActive = new Date();
    await activeUser.save();
    next();
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: err.message });
  }
};

const checkTestUser = (req, res, next) => {
  if (req.user.testUser) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: "Test user cannot perform this action" });
  }
  next();
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: "You do not have permission to perform this action" });
    }
    next();
  };
};

module.exports = { protect, restrictTo, checkTestUser };
