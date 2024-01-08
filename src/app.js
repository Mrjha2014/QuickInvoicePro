const express = require("express");
const app = express();
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const companyRoutes = require("./routes/companyRoutes");
const authRoutes = require("./routes/authRoutes");
const superuserRoutes = require("./routes/superuserRoutes");
const userRoutes = require("./routes/userRoutes");
// const testRoutes = require("./routes/testroutes");

connectDB();

app.use(express.json()); // for parsing application/json

// Add Company Routes
app.use("/api/company", companyRoutes);

// AuthRoutes
app.use("/api/auth", authRoutes);

// Procted routs
app.use("/api/", productRoutes);

// superuserRoutes
app.use("/api", superuserRoutes);

// Add users
app.use("/api/users", userRoutes);

// app.use("/api", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the Express App");
});

// Test
// app.use("/api", testRoutes);

module.exports = app;
