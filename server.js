const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
// Route files
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
// const orderRoutes = require('./routes/order');
const userRoutes = require("./routes/user");
// const couponRoutes = require('./routes/coupon');

// Middleware
const authMiddleware = require("./middleware/auth");

dotenv.config();
const app = express();

const connectDB = require("./config/db");

// Connect DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/products", require("./routes/product"));
// app.use("/api/orders", require("./routes/order"));
// app.use("/api/users", require("./routes/user"));
// app.use("/api/coupons", require("./routes/coupon"));

// Public Routes
app.use("/api/auth", authRoutes);

// Protected Routes (using middleware)
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/products", productRoutes); // Can add admin protection per route
// app.use('/api/orders', authMiddleware, orderRoutes);
// app.use('/api/coupons', authMiddleware, couponRoutes);

//router.post("/create", authMiddleware, adminMiddleware, createCoupon);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send(`Running on port ${PORT}`);
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
