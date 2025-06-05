const { StatusCodes } = require("http-status-codes");
const User = require("../models/UserModel");
const Job = require("../models/JobModel");
const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises;

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }
    res.status(StatusCodes.OK).json({
      name: user.name,
      email: user.email,
      location: user.location,
      profileImg: user.profileImg,
    });
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
    if (req.file) {
      const response = await cloudinary.uploader.upload(req.file.path);
      await fs.unlink(req.file.path);
      user.profileImg = response.secure_url;
      user.imagePublicId = response.public_id;
    }
    await user.save();
    res.status(StatusCodes.OK).json({
      name: user.name,
      email: user.email,
      location: user.location,
      profileImg: user.profileImg,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

const getAdminStats = async (req, res) => {
  try {
    const [allUsers, allJobs] = await Promise.all([
      User.countDocuments({}),
      Job.countDocuments({}),
    ]);
    let activeUsers = await User.find({
      lastActive: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    }).populate("jobs");

    activeUsers = activeUsers.map((user) => ({
      name: user.name,
      location: user.location,
      lastActive: `${Math.floor(
        (new Date() - new Date(user.lastActive)) / (1000 * 60)
      )} minutes ago`,
      jobs: user.jobs?.map((job) => ({
        position: job.position,
        company: job.company,
      })),
    }));

    res.status(StatusCodes.OK).json({
      allUsers,
      allJobs,
      activeUsers,
    });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

module.exports = {
  getCurrentUser,
  getStats,
  updateUser,
  getAdminStats,
};
