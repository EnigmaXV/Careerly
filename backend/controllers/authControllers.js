const { StatusCodes } = require("http-status-codes");
const Job = require("../models/JobModel");
const User = require("../models/UserModel");
const generateCookie = require("../utils/generateCookie");

const register = async (req, res) => {
  try {
    const { name, email, password, role, location } = req.body;

    const isUserExisted = await User.findOne({ email });
    if (isUserExisted) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        msg: "User already exists try to login instead",
      });
    }
    if (!name || !email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "name, email and password must be given" });
    }

    const isFirstUser = (await User.countDocuments({})) === 0;

    const user = await User.create({
      name,
      email,
      password,
      role: isFirstUser ? "admin" : role,
      location,
    });

    generateCookie(user, res);
    res.status(StatusCodes.CREATED).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        location: user.location,
        id: user._id,
      },
    });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "email and password must be given" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "User not found" });
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Invalid credentials" });
    }
    generateCookie(user, res);

    res.status(StatusCodes.OK).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        location: user.location,
        id: user._id,
      },
    });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: err.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("auth_token");

    res.status(StatusCodes.OK).json({
      success: true,
      msg: "User logged out successfully",
    });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: err.message });
  }
};

module.exports = {
  register,
  login,
  logout,
};
