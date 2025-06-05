const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  createJob,
  updateJob,
  getJob,
  deleteJob,
} = require("../controllers/jobControllers");
const { protect, checkTestUser } = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(protect, getAllJobs)
  .post(protect, checkTestUser, createJob);
router
  .route("/:id")
  .get(getJob)
  .patch(protect, checkTestUser, updateJob)
  .delete(protect, checkTestUser, deleteJob);

module.exports = router;
