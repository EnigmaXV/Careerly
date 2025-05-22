const { StatusCodes } = require("http-status-codes");
const Job = require("../models/JobModel");
const User = require("../models/UserModel");

const register = async (req, res) => {
  try {
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: err.message });
  }
};

const login = async (req, res) => {
  try {
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: err.message });
  }
};

module.exports = {
  register,
  login,
};
