require("dotenv").config();
const app = require("./app");
const pool = require("./config/database");

const PORT = process.env.PORT || 3000;

// فحص الاتصال بـ Neon PostgreSQL عند التشغيل
async function testDbConnection() {
  try {
    const res = await pool.query("SELECT NOW() AS current_time");
    console.log("✅ Database connected successfully:", res.rows[0].current_time);
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  testDbConnection();
});