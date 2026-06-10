// server.js
require("dotenv").config();

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const brandRoutes = require("./routes/brandRoutes");
const isAdmin = require('./routes/isadmin');
const uploadRoutes = require('./routes/uploadRoutes');
const path = require('path');
const orders = require('./routes/orderRoutes')
const dummyPayment = require('./routes/paymentDummy');
const wishlist = require('./routes/wishlistRoutes');
const reviews = require('./routes/reviews')
const coupon = require('./routes/CouponRoutes')
const support = require('./routes/supportRoutes');
const menu = require('./routes/menuRoutes');
const searchRoutes = require('./routes/searchRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const addressRoutes = require('./routes/addressRoutes');
const returnRoutes = require('./routes/returnRoutes');
const debugRoutes = require('./routes/debugRoutes');
const homepageRoutes = require('./routes/homepageRoutes');
const dynamicHomeRoutes = require('./routes/dynamicHomeRoutes');
const OrderService = require('./services/OrderService');
const { initializeProductStock } = require('./utils/initializeStock');
const cron = require('node-cron');

const app = express();

// Middleware setup
app.use(cors({
    origin: function(origin, callback) {
        const allowedOrigins = [
            'http://localhost:5173', 
            'http://localhost:3000', 
            'http://127.0.0.1:5173',
            'https://delicorn.in',
            'https://www.delicorn.in',
            'http://delicorn.in'
        ];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200
}));

app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies

// IMPORTANT: Add cookie-parser middleware BEFORE your routes.
// This middleware parse    s the cookies from the incoming request and populates req.cookies.
app.use(cookieParser());

// Handle preflight requests for all routes
// app.options('*', cors());

// Serve static files from the 'uploads' directory
// When a request comes for /uploads, it will look in the actual 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // <--- NEW: Serve static uploaded files

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/admin", isAdmin);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orders); 
app.use('/api/payment', dummyPayment);
app.use('/api/wishlist', wishlist);
app.use('/api/reviews', reviews); 
app.use('/api/coupons', coupon); 
app.use('/api/tickets', support);
app.use('/api/menus', menu);
app.use('/api/search', searchRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/user/addresses', addressRoutes);
app.use('/api/returns', returnRoutes);
app.use('/api/debug', debugRoutes);
app.use('/api/home', homepageRoutes);
app.use('/api/dynamic-home', dynamicHomeRoutes);




// Basic route for testing API status
app.get("/", (req, res) => {
    res.send("Delicorn E-commerce API is running...");
});

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "API is healthy" });
});

// Initialize services and start server
const startServer = async () => {
    try {
        await connectDB();
        await initializeProductStock();
        const orderService = new OrderService();
        
        cron.schedule('*/15 * * * *', async () => {
            try {
                console.log('[Cleanup Job] Starting cleanup of abandoned orders...');
                const cleanedCount = await orderService.cleanupPendingOrders(30);
                console.log(`[Cleanup Job] Successfully cleaned up ${cleanedCount} abandoned orders`);
            } catch (error) {
                console.error('[Cleanup Job] Error cleaning up abandoned orders:', error);
            }
        });

        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`\n🚀 Delicorn E-commerce API Server`);
            console.log(`📡 Server running on port ${PORT}`);
            console.log(`🌐 API URL: http://localhost:${PORT}`);
            console.log(`📊 Health Check: http://localhost:${PORT}/api/health`);
            console.log(`\n📝 Available endpoints:`);
            console.log(`   - Products: http://localhost:${PORT}/api/products`);
            console.log(`   - Auth: http://localhost:${PORT}/api/auth`);
            console.log(`   - Admin: http://localhost:${PORT}/admin`);
            console.log(`\n✅ Ready for connections!\n`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();