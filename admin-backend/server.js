require("dotenv").config();
const express = require("express");
//const connectDB = require("./config/db");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/", adminRoutes);

console.log(authRoutes); // Should log a router object, not a plain object
console.log(adminRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Admin Backend running on port ${PORT}`));
