const pool = require('../config/database');
const bcrypt = require('bcrypt');

// GET /api/users (Admin only)
exports.getUsers = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT id, full_name, email, phone, role, created_at FROM users ORDER BY id ASC'
    );
    return res.status(200).json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/users/:id (Protected - IDOR safe)
exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    const result = await pool.query(
      'SELECT id, full_name, email, phone, role, created_at FROM users WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
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

// POST /api/users
exports.createUser = async (req, res, next) => {
  try {
    const { full_name, email, password, password_hash, phone, role } = req.body;
    const userPassword = password || password_hash;

    if (!full_name || !email || !userPassword) {
      return res.status(400).json({
        success: false,
        message: 'Full name, email, and password are required'
      });
    }

    const emailCheck = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (emailCheck.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(userPassword, 12);
    const userRole = role || 'customer';

    const result = await pool.query(
      `INSERT INTO users (full_name, email, password_hash, phone, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, full_name, email, phone, role, created_at`,
      [full_name, email, hashedPassword, phone || null, userRole]
    );

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/users/:id/status (Admin only)
exports.updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format'
      });
    }

    const result = await pool.query(
      'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, full_name, email, role',
      [role, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User status updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};