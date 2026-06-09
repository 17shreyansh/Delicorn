import React, { useState, useEffect, useRef } from 'react';
import { Layout, Input, Badge, Button, Drawer, Dropdown, Avatar, Spin } from 'antd';
import { ShoppingCartOutlined, UserOutlined, HeartOutlined, SearchOutlined, MenuOutlined, LogoutOutlined, SettingOutlined, TagOutlined, AppstoreOutlined, ShopOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo.png';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';
import apiService from '../../services/api';

const { Header } = Layout;
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

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
  const [marqueeData, setMarqueeData] = useState(null);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  const defaultMarquee = {
    text: '4L+ Happy Customers | Gifts For Her @ 50% OFF | Ships in 24 hours',
    backgroundColor: '#0d4b4b',
    textColor: '#ffffff',
    speed: 25,
    isActive: true
  };

  useEffect(() => {
    fetchMarqueeData();
  }, []);

  const fetchMarqueeData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/dynamic-home/marquee`);
      setMarqueeData(response.data.data?.upperMarquee || defaultMarquee);
    } catch (error) {
      console.error('Error fetching marquee:', error);
      setMarqueeData(defaultMarquee);
    }
  };

  const marquee = marqueeData || defaultMarquee;

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
      <link
        href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Top Promo Bar - Dynamic */}
      {marquee.isActive && (
        <div style={{
          backgroundColor: marquee.backgroundColor,
          color: marquee.textColor,
          textAlign: 'center',
          padding: '8px 0',
          fontSize: '13px',
          fontWeight: 600,
          fontFamily: "'Josefin Sans', sans-serif",
          letterSpacing: '0.5px',
          overflow: 'hidden',
          width: '100%',
        }}>
          <div style={{
            display: 'inline-block',
            whiteSpace: 'nowrap',
            animation: `scrollText ${marquee.speed}s linear infinite`,
          }}>
            {marquee.text} &nbsp;&nbsp;&nbsp; {marquee.text}
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <Header
        style={{
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 20px' : '0 40px',
          height: isMobile ? '70px' : '85px',
          borderBottom: '1px solid rgba(0,0,0,0.04)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
        }}
      >
        {/* Left Section - Logo */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          flex: '1',
          height: '100%'
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <img 
              src={logo} 
              alt="Delicorn Logo" 
              style={{ 
                height: isMobile ? '32px' : '40px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
              }} 
            />
          </Link>
        </div>

        {/* Center Menu - Absolute Centered (Locks it in place) */}
        {!isMobile && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: window.innerWidth > 1200 ? '45px' : '30px',
              alignItems: 'center',
              fontSize: '15px',
              fontWeight: 500,
              fontFamily: "'Josefin Sans', sans-serif",
              whiteSpace: 'nowrap',
            }}
          >
            <Link to="/shop" className="nav-link">Shop</Link>
            <Link to="/collections" className="nav-link">Collections</Link>
            <Link to="/why-ashtadhatu" className="nav-link">Why Ashtadhatu?</Link>
            <Link to="/about-us" className="nav-link">About Us</Link>
            <Link to="/contact-us" className="nav-link">Contact Us</Link>
          </div>
        )}

        {/* Right Section */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: isMobile ? '10px' : '18px',
          flex: '1',
          justifyContent: 'flex-end',
        }}>
          {/* Search Bar - Desktop Only */}
          {!isMobile && (
            <div className="search-container" ref={searchRef}>
              <Input
                placeholder="Search products..."
                prefix={<SearchOutlined style={{ color: '#888', fontSize: '15px' }} />}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px'}}>
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
                placement="bottomRight"
              >
                <Button
                  type="text"
                  className="icon-btn"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <Avatar size={26} icon={<UserOutlined />} style={{ backgroundColor: '#0d4b4b' }} />
                  {!isMobile && <span style={{ marginLeft: 8, color: '#0d4b4b', fontWeight: 600, fontFamily: "'Josefin Sans'" }}>{user?.name?.split(' ')[0]}</span>}
                </Button>
              </Dropdown>
            ) : (
              <Button
                type="text"
                className="icon-btn"
                icon={<UserOutlined style={{ fontSize: '18px' }} />}
                onClick={() => navigate('/login')}
              />
            )}
            
            <Button
              type="text"
              className="icon-btn"
              icon={<HeartOutlined style={{ fontSize: '18px' }} />}
              onClick={() => navigate('/account/wishlist')}
            />
            <Badge count={getCartItemsCount()} size="small" offset={[-4, 4]}>
              <Button
                type="text"
                className="icon-btn"
                icon={<ShoppingCartOutlined style={{ fontSize: '18px' }} />}
                onClick={() => navigate('/cart')}
              />
            </Badge>
          </div>

          {/* Login Link - Desktop Only */}
          {!isMobile && !isAuthenticated() && (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          )}
          
          {/* Mobile Menu Button */}
          {isMobile && (
            <Button
              type="text"
              className="icon-btn"
              icon={<MenuOutlined style={{ fontSize: '20px' }} />}
              onClick={() => setDrawerVisible(true)}
              style={{ marginLeft: '4px' }}
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
        width={320}
        styles={{
          header: { 
            backgroundColor: '#0d4b4b', 
            color: 'white',
            borderBottom: 'none'
          },
          title: {
            fontFamily: "'Josefin Sans', sans-serif",
            color: '#fff',
            fontWeight: 600
          }
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="mobile-search-container">
            <Input
              placeholder="Search products..."
              prefix={<SearchOutlined style={{ color: '#888' }} />}
              suffix={searchLoading && <Spin size="small" />}
              className="mobile-search-input"
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
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="mobile-menu-links">
            {!isAuthenticated() ? (
              <Link to="/login" className="mobile-link" onClick={() => setDrawerVisible(false)}>
                Login
              </Link>
            ) : (
              <>
                <div className="mobile-welcome">
                  Welcome, {user?.name}
                </div>
                <Link to="/account" className="mobile-link" onClick={() => setDrawerVisible(false)}>
                  My Account
                </Link>
                {isAdmin() && (
                  <Link to="/admin" className="mobile-link" onClick={() => setDrawerVisible(false)}>
                    Admin Panel
                  </Link>
                )}
                <Button 
                  type="text"
                  className="mobile-link mobile-logout"
                  onClick={() => { logout(); setDrawerVisible(false); }}
                >
                  Logout
                </Button>
              </>
            )}
            <Link to="/shop" className="mobile-link" onClick={() => setDrawerVisible(false)}>Shop</Link>
            <Link to="/collections" className="mobile-link" onClick={() => setDrawerVisible(false)}>Collections</Link>
            <Link to="/why-ashtadhatu" className="mobile-link" onClick={() => setDrawerVisible(false)}>Why Ashtadhatu?</Link>
            <Link to="/about-us" className="mobile-link" onClick={() => setDrawerVisible(false)}>About Us</Link>
            <Link to="/contact-us" className="mobile-link" onClick={() => setDrawerVisible(false)}>Contact Us</Link>
          </div>
        </div>
      </Drawer>

      <style>{`
        @keyframes scrollText {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        .nav-link {
          position: relative;
          color: #222 !important;
          text-decoration: none;
          padding: 6px 0;
          transition: color 0.3s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 50%;
          background-color: #0d4b4b;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(-50%);
          border-radius: 2px;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .nav-link:hover {
          color: #0d4b4b !important;
        }

        .icon-btn {
          color: #333 !important;
          border-radius: 50% !important;
          height: 40px !important;
          width: 40px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: all 0.2s ease !important;
        }
        .icon-btn:hover {
          background-color: rgba(13, 75, 75, 0.05) !important;
          color: #0d4b4b !important;
        }

        .login-btn {
          color: #fff !important;
          background-color: #0d4b4b;
          padding: 8px 24px;
          border-radius: 24px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Josefin Sans', sans-serif;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }
        .login-btn:hover {
          background-color: #083333;
          box-shadow: 0 4px 12px rgba(13, 75, 75, 0.2);
          transform: translateY(-1px);
        }

        /* FIXED SEARCH CONTAINER */
        .search-container {
          position: relative;
          width: 200px; /* Base width locks the space */
          display: flex;
          align-items: center;
          transition: width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .search-container:focus-within {
          width: 260px; /* Controlled expansion ONLY on click */
        }
        
        .navbar-search {
          width: 100%;
          border-radius: 24px;
          border: 1px solid transparent;
          background-color: rgba(0, 0, 0, 0.04);
          font-family: 'Josefin Sans', sans-serif;
          font-size: 14px;
          padding: 6px 16px;
          transition: all 0.3s ease;
        }
        
        .navbar-search:hover {
          background-color: rgba(0, 0, 0, 0.07); /* Subtle shade, NO width jump on hover */
        }
        
        .navbar-search:focus-within {
          background-color: #fff;
          border-color: #0d4b4b;
          box-shadow: 0 0 0 4px rgba(13, 75, 75, 0.06);
        }
        
        .navbar-search .ant-input {
          background-color: transparent !important;
          border: none !important;
          box-shadow: none !important;
          font-family: 'Josefin Sans', sans-serif;
        }
        .navbar-search .ant-input::placeholder { color: #888; }

        .search-suggestions,
        .mobile-search-suggestions {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          width: 100%;
          min-width: 320px;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 16px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
          z-index: 1001;
          max-height: 380px;
          overflow-y: auto;
          padding: 8px;
        }
        
        .mobile-search-container { width: 100%; position: relative; }
        .mobile-search-input {
          border-radius: 24px;
          padding: 8px 16px;
          background-color: #f5f5f5;
          border: 1px solid transparent;
          font-family: 'Josefin Sans', sans-serif;
        }
        .mobile-search-input:focus-within {
          border-color: #0d4b4b;
          background-color: #fff;
        }
        
        .suggestion-item {
          display: flex;
          align-items: center;
          padding: 10px 14px;
          cursor: pointer;
          border-radius: 10px;
          transition: background-color 0.2s ease;
        }
        .suggestion-item:hover { background-color: rgba(13, 75, 75, 0.04); }
        
        .suggestion-icon {
          color: #0d4b4b;
          margin-right: 14px;
          font-size: 16px;
          display: flex;
          opacity: 0.7;
        }
        
        .suggestion-text {
          flex: 1;
          font-family: 'Josefin Sans', sans-serif;
          font-size: 14px;
          color: #222;
          font-weight: 500;
        }
        
        .suggestion-type {
          font-size: 11px;
          color: #0d4b4b;
          text-transform: capitalize;
          background: rgba(13, 75, 75, 0.08);
          padding: 3px 10px;
          border-radius: 12px;
          font-family: 'Josefin Sans', sans-serif;
          font-weight: 600;
        }

        .mobile-menu-links { display: flex; flex-direction: column; }
        .mobile-link {
          color: #222 !important;
          text-decoration: none;
          font-size: 16px;
          padding: 16px 0;
          display: block;
          border-bottom: 1px solid #f0f0f0;
          font-family: 'Josefin Sans', sans-serif;
          font-weight: 500;
          transition: padding-left 0.3s ease, color 0.3s ease;
        }
        .mobile-link:hover { padding-left: 8px; color: #0d4b4b !important; }
        .mobile-welcome { color: #0d4b4b; font-size: 18px; padding: 12px 0 20px; font-family: 'Josefin Sans', sans-serif; font-weight: 700; }
        .mobile-logout { color: #ff4d4f !important; text-align: left; background: none; border: none; height: auto; line-height: normal; }

        .search-suggestions::-webkit-scrollbar,
        .mobile-search-suggestions::-webkit-scrollbar { width: 6px; }
        .search-suggestions::-webkit-scrollbar-track,
        .mobile-search-suggestions::-webkit-scrollbar-track { background: transparent; }
        .search-suggestions::-webkit-scrollbar-thumb,
        .mobile-search-suggestions::-webkit-scrollbar-thumb { background: #d9d9d9; border-radius: 10px; }
        .search-suggestions::-webkit-scrollbar-thumb:hover,
        .mobile-search-suggestions::-webkit-scrollbar-thumb:hover { background: #bfbfbf; }
      `}</style>
    </>
  );
};

export default Navbar;