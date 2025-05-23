const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

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

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send(`Running on port ${PORT}`);
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
