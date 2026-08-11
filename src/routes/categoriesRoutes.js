const express = require("express");
const {
  getCategories,
  getCategoryById,
  createCategory
} = require("../controllers/categoriesController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);

// Admin-only protected route
router.post("/", authenticate, authorize("admin"), createCategory);

module.exports = router;