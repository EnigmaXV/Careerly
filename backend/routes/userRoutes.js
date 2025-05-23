const express = require("express");
const router = express.Router();
const {
  getCurrentUser,
  getStats,
  updateUser,
} = require("../controllers/userControllers");

const { protect, restrictTo } = require("../middlewares/authMiddleware");

router.route("/me").get(protect, getCurrentUser);
router.route("/me").patch(protect, updateUser);
router.route("/users/stats").get(protect, restrictTo("admin"), getStats);

module.exports = router;
