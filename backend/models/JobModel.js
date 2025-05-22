const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 100,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: {
        values: ["interview", "declined", "pending"],
        message: "{VALUE} is not a valid status",
      },
      default: "pending",
    },
    jobType: {
      type: String,
      enum: {
        values: ["full-time", "part-time", "internship"],
        message: "{VALUE} is not a valid job type",
      },
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "Remote",
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
