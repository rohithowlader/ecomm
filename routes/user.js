const express = require("express");
const router = express.Router();

const {
  getMyProfile,
  updateProfile,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// Authenticated user's profile
router.get("/me", auth, getMyProfile);
router.put("/update", auth, updateProfile);

// // Admin-only
router.get("/", auth, admin, getAllUsers);
router.delete("/:id", auth, admin, deleteUser);

module.exports = router;
