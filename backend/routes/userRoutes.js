const express = require("express");
const router = express.Router();
const {
  getCurrentUser,
  getStats,
  updateUser,
} = require("../controllers/userControllers");

const { protect, restrictTo } = require("../middlewares/authMiddleware");

router.route("/get-current-user").get(protect, getCurrentUser);
router.route("/update-user").patch(protect, updateUser);
router.route("/get-stats").get(protect, restrictTo("admin"), getStats);

module.exports = router;
