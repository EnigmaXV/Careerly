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

router.route("/").get(protect, getAllJobs).post(protect, createJob);
router
  .route("/:id")
  .get(getJob)
  .patch(protect, updateJob)
  .delete(protect, deleteJob);

module.exports = router;
