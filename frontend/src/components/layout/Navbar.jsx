import React, { useState, useEffect, useRef } from 'react';
import { Layout, Input, Badge, Button, Drawer, Dropdown, Menu, Avatar, Spin } from 'antd';
import { ShoppingCartOutlined, UserOutlined, HeartOutlined, SearchOutlined, MenuOutlined, LogoutOutlined, SettingOutlined, TagOutlined, AppstoreOutlined, ShopOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import apiService from '../../services/api';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const { getCartItemsCount } = useCart();
  const { user, logout, isAuthenticated, isAdmin } = useUser();
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);


  // Search functionality
  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setSearchLoading(true);
        try {
          const response = await apiService.getSearchSuggestions(searchQuery.trim());
          setSearchSuggestions(response.suggestions || []);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Search suggestions error:', error);
          setSearchSuggestions([]);
        } finally {
          setSearchLoading(false);
        }
      } else {
        setSearchSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target) &&
          suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = (value) => {
    if (value.trim()) {
      navigate(`/shop?search=${encodeURIComponent(value.trim())}`);
      setShowSuggestions(false);
      setSearchQuery('');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setShowSuggestions(false);
    setSearchQuery('');
    
    switch (suggestion.type) {
      case 'product':
        navigate(`/product/${suggestion.slug}`);
        break;
      case 'category':
        navigate(`/shop?category=${suggestion.slug}`);
        break;
      case 'brand':
        navigate(`/shop?brand=${suggestion.slug}`);
        break;
      case 'search':
      case 'tag':
        navigate(`/shop?search=${encodeURIComponent(suggestion.term || suggestion.name)}`);
        break;
      default:
        navigate(`/shop?search=${encodeURIComponent(suggestion.name)}`);
    }
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'product': return <ShopOutlined />;
      case 'category': return <AppstoreOutlined />;
      case 'brand': return <TagOutlined />;
      case 'search': return <SearchOutlined />;
      case 'tag': return <TagOutlined />;
      default: return <SearchOutlined />;
    }
  };



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
            <div className="search-container" ref={searchRef}>
              <Input
                placeholder="Search products, categories, brands..."
                prefix={<SearchOutlined style={{ color: '#999' }} />}
                suffix={searchLoading && <Spin size="small" />}
                className="navbar-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onPressEnter={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
              />
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="search-suggestions" ref={suggestionsRef}>
                  {searchSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <span className="suggestion-icon">
                        {getSuggestionIcon(suggestion.type)}
                      </span>
                      <span className="suggestion-text">
                        {suggestion.name || suggestion.term}
                      </span>
                      <span className="suggestion-type">
                        {suggestion.type}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Icons */}
          <div style={{ display: 'flex', alignItems: 'center'}}>
            {isAuthenticated() ? (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'account',
                      icon: <UserOutlined />,
                      label: <Link to="/account">My Account</Link>
                    },
                    {
                      key: 'wishlist',
                      icon: <HeartOutlined />,
                      label: <Link to="/account/wishlist">Wishlist</Link>
                    },
                    ...(isAdmin() ? [{
                      key: 'admin',
                      icon: <SettingOutlined />,
                      label: <Link to="/admin">Admin Panel</Link>
                    }] : []),
                    { type: 'divider' },
                    {
                      key: 'logout',
                      icon: <LogoutOutlined />,
                      label: 'Logout',
                      onClick: logout
                    }
                  ]
                }}
                trigger={['click']}
              >
                <Button
                  type="text"
                  style={{ padding: isMobile ? '4px' : '8px', display: 'flex', alignItems: 'center' }}
                >
                  <Avatar size="small" icon={<UserOutlined />} style={{ backgroundColor: '#0d4b4b' }} />
                  {!isMobile && <span style={{ marginLeft: 8, color: '#0d4b4b' }}>{user?.name}</span>}
                </Button>
              </Dropdown>
            ) : (
              <Button
                type="text"
                icon={<UserOutlined style={{ color: '#0d4b4b', fontSize: isMobile ? '16px' : '18px' }} />}
                onClick={() => navigate('/login')}
                style={{ padding: isMobile ? '4px' : '8px' }}
              />
            )}
            
            <Button
              type="text"
              icon={<HeartOutlined style={{ color: '#0d4b4b', fontSize: isMobile ? '16px' : '18px' }} />}
              onClick={() => navigate('/account/wishlist')}
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

          {/* Login Link - Desktop Only */}
          {!isMobile && !isAuthenticated() && (
            <Link 
              to="/login" 
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
              Login
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
          <div className="mobile-search-container">
            <Input
              placeholder="Search products, categories, brands..."
              prefix={<SearchOutlined style={{ color: '#999' }} />}
              suffix={searchLoading && <Spin size="small" />}
              style={{
                borderRadius: '25px',
                border: '1px solid #e0e0e0',
                backgroundColor: '#f8f9fa',
                fontFamily: "'Josefin Sans', sans-serif",
                fontSize: '14px',
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onPressEnter={(e) => handleSearch(e.target.value)}
            />
            {showSuggestions && searchSuggestions.length > 0 && (
              <div className="mobile-search-suggestions">
                {searchSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <span className="suggestion-icon">
                      {getSuggestionIcon(suggestion.type)}
                    </span>
                    <span className="suggestion-text">
                      {suggestion.name || suggestion.term}
                    </span>
                    <span className="suggestion-type">
                      {suggestion.type}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Mobile Menu Links */}
          <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '20px' }}>
            {!isAuthenticated() ? (
              <Link 
                to="/login" 
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
                Login
              </Link>
            ) : (
              <>
                <div style={{ 
                  color: '#0d4b4b', 
                  fontSize: '16px', 
                  padding: '15px 0',
                  borderBottom: '1px solid #f5f5f5',
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontWeight: 600
                }}>
                  Welcome, {user?.name}
                </div>
                <Link 
                  to="/account" 
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
                  My Account
                </Link>
                {isAdmin() && (
                  <Link 
                    to="/admin" 
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
                    Admin Panel
                  </Link>
                )}
                <Button 
                  type="text"
                  onClick={() => { logout(); setDrawerVisible(false); }}
                  style={{ 
                    color: '#ff4d4f', 
                    fontSize: '16px', 
                    padding: '15px 0',
                    display: 'block',
                    borderBottom: '1px solid #f5f5f5',
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontWeight: 500,
                    textAlign: 'left',
                    border: 'none',
                    background: 'none'
                  }}
                >
                  Logout
                </Button>
              </>
            )}
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
        
        .search-suggestions {
          position: absolute;
          top: 100%;
          right: 0;
          width: 100%;
          min-width: 300px;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          z-index: 1001;
          margin-top: 4px;
          max-height: 400px;
          overflow-y: auto;
        }
        
        .mobile-search-container {
          position: relative;
          width: 100%;
        }
        
        .mobile-search-suggestions {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          z-index: 1001;
          margin-top: 4px;
          max-height: 300px;
          overflow-y: auto;
        }
        
        .suggestion-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          cursor: pointer;
          transition: background-color 0.2s ease;
          border-bottom: 1px solid #f5f5f5;
        }
        
        .suggestion-item:last-child {
          border-bottom: none;
        }
        
        .suggestion-item:hover {
          background-color: #f8f9fa;
        }
        
        .suggestion-icon {
          color: #0d4b4b;
          margin-right: 12px;
          font-size: 14px;
          width: 16px;
          display: flex;
          justify-content: center;
        }
        
        .suggestion-text {
          flex: 1;
          font-family: 'Josefin Sans', sans-serif;
          font-size: 14px;
          color: #333;
          font-weight: 500;
        }
        
        .suggestion-type {
          font-size: 12px;
          color: #999;
          text-transform: capitalize;
          background: #f0f0f0;
          padding: 2px 8px;
          border-radius: 10px;
          font-family: 'Josefin Sans', sans-serif;
        }
        
        .search-suggestions::-webkit-scrollbar,
        .mobile-search-suggestions::-webkit-scrollbar {
          width: 4px;
        }
        
        .search-suggestions::-webkit-scrollbar-track,
        .mobile-search-suggestions::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 2px;
        }
        
        .search-suggestions::-webkit-scrollbar-thumb,
        .mobile-search-suggestions::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 2px;
        }
        
        .search-suggestions::-webkit-scrollbar-thumb:hover,
        .mobile-search-suggestions::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </>
  );
};

export default Navbar;
