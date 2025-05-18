const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  createJob,
  updateJob,
  getJob,
  deleteJob,
} = require("../controllers/jobControllers");

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;
