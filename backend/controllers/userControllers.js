const { StatusCodes } = require("http-status-codes");
const User = require("../models/UserModel");
const Job = require("../models/JobModel");
const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises;
const mongoose = require("mongoose");
const day = require("dayjs");
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
    let defaultStats = await Job.aggregate([
      {
        $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    defaultStats = defaultStats.reduce(
      (acc, curr) => {
        const { _id: status, count } = curr;
        acc[status] = count;
        return acc;
      },
      { pending: 0, interview: 0, declined: 0 }
    );

    let monthlyApplications = await Job.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 6 },
    ]);
    monthlyApplications = monthlyApplications
      .map((item) => {
        const {
          _id: { year, month },
          count,
        } = item;

        const date = day()
          .month(month - 1)
          .year(year)
          .format("MMM YY");
        return { date, count };
      })
      .reverse();

    res.status(StatusCodes.OK).json({
      defaultStats,
      monthlyApplications,
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
