const pool = require('../config/database');

// GET /api/products
exports.getProducts = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT id, category_id, name, description, price, stock_quantity, sku, is_active, created_at FROM products WHERE is_active = true ORDER BY id ASC'
    );
    return res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/:id
exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Reject non-numeric IDs before querying database (Task 4)
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    const result = await pool.query(
      'SELECT id, category_id, name, description, price, stock_quantity, sku, is_active, created_at FROM products WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/products
exports.createProduct = async (req, res, next) => {
  try {
    const { category_id, name, description, price, stock_quantity, sku } = req.body;

    // Check duplicate SKU using parameterized query
    const skuCheck = await pool.query('SELECT id FROM products WHERE sku = $1', [sku]);
    if (skuCheck.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Product with this SKU already exists'
      });
    }

    const result = await pool.query(
      `INSERT INTO products (category_id, name, description, price, stock_quantity, sku)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, category_id, name, description, price, stock_quantity, sku, is_active, created_at`,
      [category_id, name, description || null, price, stock_quantity, sku]
    );

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/products/:id
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category_id, name, description, price, stock_quantity, sku, is_active } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    const checkProduct = await pool.query('SELECT id FROM products WHERE id = $1', [id]);
    if (checkProduct.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const activeState = is_active !== undefined ? is_active : true;

    const result = await pool.query(
      `UPDATE products
       SET category_id = $1, name = $2, description = $3, price = $4, stock_quantity = $5, sku = $6, is_active = $7
       WHERE id = $8
       RETURNING id, category_id, name, description, price, stock_quantity, sku, is_active, created_at`,
      [category_id, name, description || null, price, stock_quantity, sku, activeState, id]
    );

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/products/:id/deactivate
exports.deactivateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    const result = await pool.query(
      'UPDATE products SET is_active = false WHERE id = $1 RETURNING id, name, is_active',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Product deactivated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};