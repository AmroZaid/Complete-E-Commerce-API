const pool = require("../config/database");

// 1. جلب كل المستخدمين
async function getUsers(req, res) {
  try {
    const result = await pool.query("SELECT id, full_name, email, phone, role, is_active, created_at FROM users ORDER BY id ASC");
    res.status(200).json({ success: true, count: result.rows.length, data: result.rows });
  } catch (error) {
    console.error("Users error:", error);
    res.status(500).json({ success: false, message: "Failed to retrieve users" });
  }
}

// 2. جلب مستخدم بواسطة ID
async function getUserById(req, res) {
  try {
    const id = Number(req.params.id);
    const result = await pool.query("SELECT id, full_name, email, phone, role, is_active, created_at FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to retrieve user" });
  }
}

// 3. إنشاء مستخدم جديد
async function createUser(req, res) {
  try {
    const { full_name, email, password_hash, phone, role = "customer" } = req.body;
    
    if (!full_name || !email || !password_hash) {
      return res.status(400).json({ 
        success: false, 
        message: "full_name, email and password_hash are required" 
      });
    }

    // فحص مباشر إذا كان البريد الإلكتروني موجود سابقاً
    const existingUser = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ 
        success: false, 
        message: "Email already exists" 
      });
    }

    const result = await pool.query(
      `INSERT INTO users (full_name, email, password_hash, phone, role) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, full_name, email, phone, role, is_active, created_at`,
      [full_name, email, password_hash, phone || null, role]
    );

    res.status(201).json({ 
      success: true, 
      message: "User created successfully", 
      data: result.rows[0] 
    });
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ success: false, message: "Failed to create user" });
  }
}

// 4. تفعيل / إلغاء تفعيل مستخدم
async function updateUserStatus(req, res) {
  try {
    const id = Number(req.params.id);
    const { is_active } = req.body;

    if (is_active === undefined) {
      return res.status(400).json({ success: false, message: "is_active status is required" });
    }

    const result = await pool.query(
      "UPDATE users SET is_active = $1 WHERE id = $2 RETURNING id, full_name, email, role, is_active",
      [is_active, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User status updated successfully", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update user status" });
  }
}

module.exports = { getUsers, getUserById, createUser, updateUserStatus };