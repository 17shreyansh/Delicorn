import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, App as AntApp } from 'antd';

// Context Providers
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';

// Layout Components
import { Navbar } from './components';

// Pages
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import AshtaDhatu from './pages/AshtaDhatu';
import FashionJewelry from './pages/FashionJewelry';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import ReturnRefund from './pages/ReturnRefund';
import Collections from './pages/Collections';

// Account Pages
import AccountOverview from './pages/Account/AccountOverview';
import MyOrders from './pages/Account/MyOrders';
import Wishlist from './pages/Account/Wishlist';
import Addresses from './pages/Account/Addresses';
import ReturnsRefunds from './pages/Account/ReturnsRefunds';

// Admin Pages
import AdminLayout from './admin/pages/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import Products from './admin/pages/Products';
import Categories from './admin/pages/Categories';
import Brand from './admin/pages/Brand';
import Order from './admin/pages/Order';
import Users from './admin/pages/users';

// Auth Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';

// Constants
import { ROUTES } from './constants/routes';

const theme = {
  token: {
    colorPrimary: '#667eea',
    borderRadius: 8,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial',
  },
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      <AntApp>
        <UserProvider>
          <CartProvider>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <div className="App">
                <Routes>
                  {/* Admin Routes - No Navbar */}
                  <Route path="/admin/*" element={
                    <ProtectedRoute adminOnly={true}>
                      <AdminLayout />
                    </ProtectedRoute>
                  } />
                  
                  {/* All other routes - With Navbar */}
                  <Route path="*" element={
                    <>
                      <Navbar />
                      <Routes>
                        {/* Main Pages */}
                        <Route path={ROUTES.HOME} element={<Home />} />
                        <Route path={ROUTES.SHOP} element={<AllProducts />} />
                        <Route path="/collections" element={<Collections />} />
                        <Route path={ROUTES.ASHTA_DHATU} element={<AshtaDhatu />} />
                        <Route path={ROUTES.FASHION_JEWELRY} element={<FashionJewelry />} />
                        
                        {/* Auth Pages */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/auth" element={<Login />} />
                        
                        {/* Product & Shopping */}
                        <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetail />} />
                        <Route path={ROUTES.CART} element={<Cart />} />
                        <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
                        
                        {/* Info Pages */}
                        <Route path={ROUTES.CONTACT_US} element={<ContactUs />} />
                        <Route path={ROUTES.ABOUT_US} element={<AboutUs />} />
                        <Route path={ROUTES.RETURN_REFUND} element={<ReturnRefund />} />
                        
                        {/* Account Pages */}
                        <Route path={ROUTES.ACCOUNT} element={<ProtectedRoute><AccountOverview /></ProtectedRoute>} />
                        <Route path={ROUTES.ACCOUNT_ORDERS} element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
                        <Route path={ROUTES.ACCOUNT_WISHLIST} element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
                        <Route path={ROUTES.ACCOUNT_ADDRESSES} element={<ProtectedRoute><Addresses /></ProtectedRoute>} />
                        <Route path={ROUTES.ACCOUNT_RETURNS} element={<ProtectedRoute><ReturnsRefunds /></ProtectedRoute>} />
                      </Routes>
                    </>
                  } />
                </Routes>
              </div>
            </Router>
          </CartProvider>
        </UserProvider>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;