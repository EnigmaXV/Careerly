const { StatusCodes } = require("http-status-codes");
const Job = require("../models/JobModel");

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).sort("-createdAt");

    res
      .status(StatusCodes.OK)
      .json({ success: true, count: jobs.length, jobs });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: err.message });
  }
};

const createJob = async (req, res) => {
  try {
    const { company, position } = req.body;

    if (!company || !position) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Please provide all values" });
    }

    const job = await Job.create({
      company,
      position,
      createdBy: req.user.userId,
    });
    res.status(StatusCodes.CREATED).json({ success: true, job });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: err.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const { id: jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        msg: `No job found for this id with id: ${jobId}`,
      });
    }
    if (job.createdBy.toString() !== req.user.userId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ success: false, msg: "Not authorized to update this job" });
    }

    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(StatusCodes.OK).json({ success: true, job: updatedJob });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: err.message });
  }
};

const getJob = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        msg: `No job found for this id with id: ${jobId}`,
      });
    }
    res.status(StatusCodes.OK).json({ success: true, job });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: err.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const job = await Job.findByIdAndDelete(jobId);
    if (!job) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        msg: `No job found for this id with id: ${jobId}`,
      });
    }
    res.status(StatusCodes.OK).json({ success: true, msg: "Job deleted" });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: err.message });
  }
};

module.exports = {
  getAllJobs,
  createJob,
  updateJob,
  getJob,
  deleteJob,
};
