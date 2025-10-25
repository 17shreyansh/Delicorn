import React from 'react';
import { Menu } from 'antd';
import { UserOutlined, ShoppingOutlined, HeartOutlined, EnvironmentOutlined, UndoOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/account',
      icon: <UserOutlined />,
      label: 'Account Overview',
    },
    {
      key: '/account/orders',
      icon: <ShoppingOutlined />,
      label: 'My Orders',
    },
    {
      key: '/account/wishlist',
      icon: <HeartOutlined />,
      label: 'Wishlist',
    },
    {
      key: '/account/addresses',
      icon: <EnvironmentOutlined />,
      label: 'Addresses',
    },
    {
      key: '/account/returns',
      icon: <UndoOutlined />,
      label: 'Returns & Refunds',
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <div className="account-sidebar" style={{ background: '#f5f5f5', minHeight: '500px' }}>
      <Menu
        mode="vertical"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{ 
          background: 'transparent',
          border: 'none',
          padding: '20px 0'
        }}
      />
    </div>
  );
};

export default Sidebar;