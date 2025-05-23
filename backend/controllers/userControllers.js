const { StatusCodes } = require("http-status-codes");
const User = require("../models/UserModel");
const Job = require("../models/JobModel");

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }
    res.status(StatusCodes.OK).json({ success: true, user });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

const getStats = async (req, res) => {
  try {
    const [allUsers, allJobs, rejectedJobs, pendingJobs, interviews] =
      await Promise.all([
        User.countDocuments({}),
        Job.countDocuments({}),
        Job.countDocuments({ status: "declined" }),
        Job.countDocuments({ status: "pending" }),
        Job.countDocuments({ status: "interviews" }),
      ]);

    res.status(StatusCodes.OK).json({
      allUsers,
      allJobs,
      rejectedJobs,
      pendingJobs,
      interviews,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, location } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, msg: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.location = location || user.location;
    await user.save();
    res.status(StatusCodes.OK).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        location: user.location,
      },
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

module.exports = {
  getCurrentUser,
  getStats,
  updateUser,
};
