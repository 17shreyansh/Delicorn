// Debug script to find the problematic route
const express = require('express');
const app = express();

const routes = [
  { path: '/api/auth', file: './routes/authRoutes' },
  { path: '/api/products', file: './routes/productRoutes' },
  { path: '/api/categories', file: './routes/categoryRoutes' },
  { path: '/api/brands', file: './routes/brandRoutes' },
  { path: '/api/admin', file: './routes/isadmin' },
  { path: '/api/upload', file: './routes/uploadRoutes' },
  { path: '/api/orders', file: './routes/orderRoutes' },
  { path: '/api/payment', file: './routes/paymentDummy' },
  { path: '/api/wishlist', file: './routes/wishlistRoutes' },
  { path: '/api/reviews', file: './routes/reviews' },
  { path: '/api/coupons', file: './routes/CouponRoutes' },
  { path: '/api/tickets', file: './routes/supportRoutes' },
  { path: '/api/menus', file: './routes/menuRoutes' },
  { path: '/api/search', file: './routes/searchRoutes' },
  { path: '/api/delivery', file: './routes/deliveryRoutes' },
  { path: '/api/user/addresses', file: './routes/addressRoutes' },
  { path: '/api/returns', file: './routes/returnRoutes' },
  { path: '/api/debug', file: './routes/debugRoutes' },
  { path: '/api/home', file: './routes/homepageRoutes' },
  { path: '/api/dynamic-home', file: './routes/dynamicHomeRoutes' }
];

for (const route of routes) {
  try {
    console.log(`\nLoading route: ${route.path} from ${route.file}`);
    const router = require(route.file);
    app.use(route.path, router);
    console.log(`✓ Successfully loaded: ${route.path}`);
  } catch (error) {
    console.error(`✗ ERROR loading ${route.path}:`);
    console.error(error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

console.log('\n✓ All routes loaded successfully!');
