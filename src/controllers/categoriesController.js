const pool = require("../config/database");

// جلب كل التصنيفات
async function getCategories(req, res) {
  try {
    const result = await pool.query("SELECT * FROM categories ORDER BY id ASC");
    res.status(200).json({ success: true, count: result.rows.length, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to retrieve categories" });
  }
}

// جلب تصنيف بواستطة ID
async function getCategoryById(req, res) {
  try {
    const id = Number(req.params.id);
    const result = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to retrieve category" });
  }
}

// إنشاء تصنيف جديد
async function createCategory(req, res) {
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
    res.status(500).json({ success: false, message: "Failed to create category" });
  }
}

// تحديث تصنيف
async function updateCategory(req, res) {
  try {
    const id = Number(req.params.id);
    const { name, description } = req.body;
    const result = await pool.query(
      "UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *",
      [name, description, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, message: "Category updated successfully", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update category" });
  }
}

module.exports = { getCategories, getCategoryById, createCategory, updateCategory };