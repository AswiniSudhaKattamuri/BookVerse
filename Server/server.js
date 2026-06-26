const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();

connectDB();

const app = express();
const authRoutes = require("./routes/authRoutes");
const bookRoutes=require("./routes/bookRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const cartRoutes=require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/books",bookRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("🚀 BookVerse API is running...");
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});