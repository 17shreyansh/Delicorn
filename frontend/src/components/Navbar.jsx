import React, { useState, useEffect, useRef } from 'react';
import { Layout, Input, Badge, Button, Drawer } from 'antd';
import { ShoppingCartOutlined, UserOutlined, HeartOutlined, SearchOutlined, MenuOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const { getCartItemsCount } = useCart();
  const { user } = useUser();
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
      

      

    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  return (
    <>
      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* Top Promo Bar */}
      <div
        style={{
          backgroundColor: '#0d4b4b',
          color: '#fff',
          textAlign: 'center',
          padding: '6px 0',
          fontSize: '14px',
          fontWeight: 500,
          fontFamily: "'Josefin Sans', sans-serif",
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
            animation: 'scrollText 20s linear infinite',
          }}
        >
          4L+ Happy Customers | Gifts For Her @ 50% OFF | Ships in 24 hours &nbsp;&nbsp;&nbsp;
          4L+ Happy Customers | Gifts For Her @ 50% OFF | Ships in 24 hours
        </div>
      </div>

      {/* Main Navbar */}
      <Header
        style={{
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 15px' : '0 30px',
          height: isMobile ? '70px' : '90px',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        {/* Left Section - Logo */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          flex: isMobile ? '0 0 auto' : '1',
          height: '100%'
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <img 
              src={logo} 
              alt="Delicorn Logo" 
              style={{ 
                height: isMobile ? '35px' : '45px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
              }} 
            />
          </Link>
        </div>

        {/* Center Menu - Desktop Only */}
        {!isMobile && (
          <div
            style={{
              display: 'flex',
              gap: window.innerWidth > 1200 ? '50px' : '30px',
              alignItems: 'center',
              fontSize: '15px',
              fontWeight: 500,
              fontFamily: "'Josefin Sans', sans-serif",
              flex: '2',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
              minWidth: 0
            }}
          >
            <Link 
              to="/shop" 
              style={{ 
                color: '#003333', 
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                display: 'inline-block',
                lineHeight: '1'
              }}
            >
              Shop
            </Link>
            <Link 
              to="/collections" 
              style={{ 
                color: '#003333', 
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                display: 'inline-block',
                lineHeight: '1'
              }}
            >
              Collections
            </Link>
            <Link 
              to="/why-ashtadhatu" 
              style={{ 
                color: '#003333', 
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                display: 'inline-block',
                lineHeight: '1'
              }}
            >
              Why Ashtadhatu?
            </Link>
            <Link 
              to="/about-us" 
              style={{ 
                color: '#003333', 
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                display: 'inline-block',
                lineHeight: '1'
              }}
            >
              About Us
            </Link>
            <Link 
              to="/contact-us" 
              style={{ 
                color: '#003333', 
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                display: 'inline-block',
                lineHeight: '1'
              }}
            >
              Contact Us
            </Link>
          </div>
        )}

        {/* Right Section */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: isMobile ? '8px' : '15px',
          flex: '1',
          justifyContent: 'flex-end',
          minWidth: 0
        }}>
          {/* Search Bar - Desktop Only */}
          {!isMobile && (
            <div className="search-container">
              <Input
                placeholder="Search gifts..."
                prefix={<SearchOutlined style={{ color: '#999' }} />}
                className="navbar-search"
              />
            </div>
          )}

          {/* Icons */}
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <Button
              type="text"
              icon={<UserOutlined style={{ color: '#0d4b4b', fontSize: isMobile ? '16px' : '18px' }} />}
              onClick={() => navigate('/account')}
              style={{ padding: isMobile ? '4px' : '8px' }}
            />
            <Button
              type="text"
              icon={<HeartOutlined style={{ color: '#0d4b4b', fontSize: isMobile ? '16px' : '18px' }} />}
              onClick={() => navigate('/wishlist')}
              style={{ padding: isMobile ? '4px' : '8px' }}
            />
            <Badge count={getCartItemsCount()} size="small">
              <Button
                type="text"
                icon={<ShoppingCartOutlined style={{ color: '#0d4b4b', fontSize: isMobile ? '16px' : '18px' }} />}
                onClick={() => navigate('/cart')}
                style={{ padding: isMobile ? '4px' : '8px' }}
              />
            </Badge>
          </div>

          {/* Signup/Login Link */}
          {!isMobile && (
            <Link 
              to="/auth" 
              style={{ 
                color: '#0d4b4b', 
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
                fontFamily: "'Josefin Sans', sans-serif",
                marginLeft: '15px',
                whiteSpace: 'nowrap'
              }}
            >
              Signup/Login
            </Link>
          )}
          
          {/* Mobile Menu Button */}
          {isMobile && (
            <Button
              type="text"
              icon={<MenuOutlined style={{ color: '#0d4b4b', fontSize: '18px' }} />}
              onClick={() => setDrawerVisible(true)}
              style={{ padding: '4px', marginLeft: '8px' }}
            />
          )}
        </div>
      </Header>

      {/* Mobile Drawer Menu */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={300}
        styles={{
          header: { 
            backgroundColor: '#0d4b4b', 
            color: 'white',
            fontFamily: "'Josefin Sans', sans-serif"
          }
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', padding: '10px 0' }}>
          {/* Mobile Search */}
          <Input
            placeholder="Search gifts..."
            prefix={<SearchOutlined style={{ color: '#999' }} />}
            style={{
              borderRadius: '25px',
              border: '1px solid #e0e0e0',
              backgroundColor: '#f8f9fa',
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: '14px',
            }}
          />
          
          {/* Mobile Menu Links */}
          <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '20px' }}>
            <Link 
              to="/auth" 
              style={{ 
                color: '#0d4b4b', 
                textDecoration: 'none', 
                fontSize: '16px', 
                padding: '15px 0',
                display: 'block',
                borderBottom: '1px solid #f5f5f5',
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 600
              }}
              onClick={() => setDrawerVisible(false)}
            >
              Signup/Login
            </Link>
            <Link 
              to="/shop" 
              style={{ 
                color: '#003333', 
                textDecoration: 'none', 
                fontSize: '16px', 
                padding: '15px 0',
                display: 'block',
                borderBottom: '1px solid #f5f5f5',
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 500
              }}
              onClick={() => setDrawerVisible(false)}
            >
              Shop
            </Link>
            <Link 
              to="/collections" 
              style={{ 
                color: '#003333', 
                textDecoration: 'none', 
                fontSize: '16px', 
                padding: '15px 0',
                display: 'block',
                borderBottom: '1px solid #f5f5f5',
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 500
              }}
              onClick={() => setDrawerVisible(false)}
            >
              Collections
            </Link>
            <Link 
              to="/why-ashtadhatu" 
              style={{ 
                color: '#003333', 
                textDecoration: 'none', 
                fontSize: '16px', 
                padding: '15px 0',
                display: 'block',
                borderBottom: '1px solid #f5f5f5',
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 500
              }}
              onClick={() => setDrawerVisible(false)}
            >
              Why Ashtadhatu?
            </Link>
            <Link 
              to="/about-us" 
              style={{ 
                color: '#003333', 
                textDecoration: 'none', 
                fontSize: '16px', 
                padding: '15px 0',
                display: 'block',
                borderBottom: '1px solid #f5f5f5',
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 500
              }}
              onClick={() => setDrawerVisible(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact-us" 
              style={{ 
                color: '#003333', 
                textDecoration: 'none', 
                fontSize: '16px', 
                padding: '15px 0',
                display: 'block',
                borderBottom: '1px solid #f5f5f5',
                fontFamily: "'Josefin Sans', sans-serif",
                fontWeight: 500
              }}
              onClick={() => setDrawerVisible(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Drawer>

      {/* Custom CSS for search input focus */}
      <style>{`
        @keyframes scrollText {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .search-container {
          position: relative;
          display: flex;
          justify-content: flex-end;
        }
        
        .navbar-search {
          width: 10vw;
          min-width: 180px;
          max-width: 300px;
          borderRadius: 25px;
          border: 1px solid #e0e0e0;
          backgroundColor: #f8f9fa;
          fontFamily: 'Josefin Sans', sans-serif;
          fontSize: 14px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: right center;
        }
        
        .navbar-search:hover,
        .navbar-search:focus {
          width: 25vw;
          min-width: 250px;
          border-color: #0d4b4b;
          box-shadow: 0 0 0 2px rgba(13, 75, 75, 0.1);
        }
        
        .navbar-search .ant-input {
          background-color: transparent;
          border: none;
          box-shadow: none;
        }
        
        .navbar-search .ant-input::placeholder {
          color: #999;
        }
        

      `}</style>
    </>
  );
};

export default Navbar;
