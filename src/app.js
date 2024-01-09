const express = require("express");
const app = express();
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const companyRoutes = require("./routes/companyRoutes");
const authRoutes = require("./routes/authRoutes");
const superuserRoutes = require("./routes/superuserRoutes");
const userRoutes = require("./routes/userRoutes");
const customerRoutes = require("./routes/customerRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");

connectDB();

app.use(express.json()); // for parsing application/json

// Add Company Routes
app.use("/api/company", companyRoutes);

// AuthRoutes
app.use("/api/auth", authRoutes);

// users
app.use("/api/users", userRoutes);

// productRoutes
app.use("/api/products", productRoutes);

// customerRoutes
app.use("/api/customers", customerRoutes);

// invoiceRoutes
app.use("/api/invoices", invoiceRoutes);

module.exports = app;
