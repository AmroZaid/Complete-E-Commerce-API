const express = require("express");
const cors = require("cors");
const productsRoutes = require("./routes/productsRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const usersRoutes = require("./routes/usersRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/users", usersRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-commerce API is running"
  });
});

// 1. Unknown Route Handler (404)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

// 2. Global Error Handler (500)
app.use((err, req, res, next) => {
  console.error("Global Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message
  });
});

module.exports = app;