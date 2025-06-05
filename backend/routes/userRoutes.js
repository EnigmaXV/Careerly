const express = require("express");
const router = express.Router();
const {
  getCurrentUser,
  getStats,
  updateUser,
  getAdminStats,
} = require("../controllers/userControllers");

const { protect, restrictTo } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

router.route("/me").get(protect, getCurrentUser);
router.route("/me").patch(protect, upload.single("profileImage"), updateUser);
router.route("/stats").get(protect, getStats);
router.route("/admin-stats").get(protect, restrictTo("admin"), getAdminStats);

module.exports = router;
