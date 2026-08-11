const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deactivateProduct
} = require("../controllers/productsController");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const validate = require("../middleware/validate");
const { productValidationRules } = require("../validators/productValidator");

const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin-only protected routes with validation (Task 3 & Task 7)
router.post(
  "/",
  authenticate,
  authorize("admin"),
  productValidationRules,
  validate,
  createProduct
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  productValidationRules,
  validate,
  updateProduct
);

router.patch("/:id/deactivate", authenticate, authorize("admin"), deactivateProduct);

module.exports = router;