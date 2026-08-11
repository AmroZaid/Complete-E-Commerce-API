const { body } = require("express-validator");

const productValidationRules = [
  body("name")
    .notEmpty()
    .withMessage("Product name is required")
    .isString()
    .isLength({ max: 150 })
    .withMessage("Product name must not exceed 150 characters"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than zero"),

  body("stock_quantity")
    .notEmpty()
    .withMessage("Stock quantity is required")
    .isInt({ min: 0 })
    .withMessage("Stock quantity must be a non-negative integer"),

  body("sku")
    .notEmpty()
    .withMessage("SKU is required")
    .isString()
    .trim()
];

module.exports = { productValidationRules };