import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AshtaDhatu from './pages/AshtaDhatu';
import FashionJewelry from './pages/FashionJewelry';

import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import ReturnRefund from './pages/ReturnRefund';
import AccountOverview from './pages/Account/AccountOverview';
import MyOrders from './pages/Account/MyOrders';
import Wishlist from './pages/Account/Wishlist';
import Addresses from './pages/Account/Addresses';
import ReturnsRefunds from './pages/Account/ReturnsRefunds';

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
      <UserProvider>
        <CartProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <div className="App">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ashta-dhatu" element={<AshtaDhatu />} />
                <Route path="/fashion-jewelry" element={<FashionJewelry />} />

                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/return-refund" element={<ReturnRefund />} />
                <Route path="/account" element={<AccountOverview />} />
                <Route path="/account/orders" element={<MyOrders />} />
                <Route path="/account/wishlist" element={<Wishlist />} />
                <Route path="/account/addresses" element={<Addresses />} />
                <Route path="/account/returns" element={<ReturnsRefunds />} />
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </UserProvider>
    </ConfigProvider>
  );
}

export default App;