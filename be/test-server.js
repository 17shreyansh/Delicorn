// Minimal server test
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

console.log("Setting up middleware...");

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

console.log("Middleware setup complete");

console.log("Loading routes...");

try {
    const authRoutes = require("./routes/authRoutes");
    console.log("✓ authRoutes loaded");
    app.use("/api/auth", authRoutes);
    console.log("✓ authRoutes registered");

    const productRoutes = require("./routes/productRoutes");
    console.log("✓ productRoutes loaded");
    app.use("/api/products", productRoutes);
    console.log("✓ productRoutes registered");

    const categoryRoutes = require("./routes/categoryRoutes");
    app.use("/api/categories", categoryRoutes);
    console.log("✓ categoryRoutes registered");

    const brandRoutes = require("./routes/brandRoutes");
    app.use("/api/brands", brandRoutes);
    console.log("✓ brandRoutes registered");

    const isAdmin = require("./routes/isadmin");
    app.use("/api/admin", isAdmin);
    console.log("✓ isAdmin registered");

    const uploadRoutes = require("./routes/uploadRoutes");
    app.use("/api/upload", uploadRoutes);
    console.log("✓ uploadRoutes registered");

    const orders = require("./routes/orderRoutes");
    app.use("/api/orders", orders);
    console.log("✓ orders registered");

    console.log("\n✓ All routes loaded successfully!");
    console.log("Server should start now...");

} catch (error) {
    console.error("\n✗ ERROR:");
    console.error(error);
    process.exit(1);
}

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
