const pool = require("../config/database");

// GET /api/categories
async function getCategories(req, res, next) {
  try {
    const result = await pool.query("SELECT * FROM categories ORDER BY id ASC");
    res.status(200).json({ success: true, count: result.rows.length, data: result.rows });
  } catch (error) {
    next(error);
  }
}

// GET /api/categories/:id
async function getCategoryById(req, res, next) {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid category ID format" });
    }

    const result = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    next(error);
  }
}

// POST /api/categories (Admin only)
async function createCategory(req, res, next) {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }
    const result = await pool.query(
      "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *",
      [name, description || null]
    );
    res.status(201).json({ success: true, message: "Category created successfully", data: result.rows[0] });
  } catch (error) {
    next(error);
  }
}

// PUT /api/categories/:id (Admin only)
async function updateCategory(req, res, next) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid category ID format" });
    }

    const result = await pool.query(
      "UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *",
      [name, description || null, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, message: "Category updated successfully", data: result.rows[0] });
  } catch (error) {
    next(error);
  }
}

module.exports = { getCategories, getCategoryById, createCategory, updateCategory };