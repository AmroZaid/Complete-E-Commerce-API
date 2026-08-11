const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Import Route Handlers
const authRoutes = require("./routes/authRoutes");
const productsRoutes = require("./routes/productsRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const usersRoutes = require("./routes/usersRoutes");

const app = express();

// 1. Security Headers (Task 9)
app.use(helmet());

// 2. Restricted CORS Setup (Task 10)
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// 3. General API Rate Limiting (Task 11)
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes"
  }
});
app.use("/api/", generalLimiter);

// 4. Stricter Rate Limiter for Authentication / Login (Task 11)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts per windowMs
  message: {
    success: false,
    message: "Too many login attempts from this IP, please try again after 15 minutes"
  }
});
app.use("/api/auth/login", loginLimiter);

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// 5. Mount API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/users", usersRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-commerce API is running"
  });
});

// 6. Unknown Route Handler (404) (Task 12)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

// 7. Temporary Debug Error Handler
app.use((err, req, res, next) => {
  console.error("❌ DETAILED SERVER ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    debug_error: err
  });
});
module.exports = app;