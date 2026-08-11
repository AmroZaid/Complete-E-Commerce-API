const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUserStatus
} = require("../controllers/usersController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const checkOwnership = require("../middleware/checkOwnership");

const router = express.Router();

// Admin-only: View all users
router.get("/", authenticate, authorize("admin"), getUsers);

// Protected & IDOR-safe: Users can only view their own profile, or Admin can view any profile
router.get("/:id", authenticate, checkOwnership, getUserById);

// Public or Admin-only user creation
router.post("/", createUser);

// Admin-only: Update user status
router.patch("/:id/status", authenticate, authorize("admin"), updateUserStatus);

module.exports = router;