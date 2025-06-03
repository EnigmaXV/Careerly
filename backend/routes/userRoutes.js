const express = require("express");
const router = express.Router();
const {
  getCurrentUser,
  getStats,
  updateUser,
  getAdminStats,
} = require("../controllers/userControllers");

const { protect, restrictTo } = require("../middlewares/authMiddleware");

router.route("/me").get(protect, getCurrentUser);
router.route("/me").patch(protect, updateUser);
router.route("/admin-stats").get(protect, restrictTo("admin"), getAdminStats);

module.exports = router;
