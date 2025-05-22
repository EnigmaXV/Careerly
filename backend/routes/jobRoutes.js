const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  createJob,
  updateJob,
  getJob,
  deleteJob,
} = require("../controllers/jobControllers");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

router.route("/").get(protect, getAllJobs).post(createJob);
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;
