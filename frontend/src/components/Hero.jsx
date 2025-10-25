import React from 'react';
import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import image from '../assets/hero1.jpg';

const { Title, Paragraph } = Typography;

const Hero = () => {
  return (
    <>
      {/* Hero Section */}
      <div 
        style={{
          backgroundImage: ' url(' + image + ')',
          backgroundSize: 'cover',
          backgroundPositionY: '20%',
          backgroundRepeat: 'no-repeat',
          height: 'calc(100vh - 90px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white'
        }}
      >
        <div style={{ maxWidth: '800px', padding: '0 20px' }}>
          <Title 
            level={1} 
            style={{ 
              color: 'white', 
              fontSize: 'clamp(32px, 5vw, 48px)', 
              marginBottom: '20px',
              fontFamily: "'Josefin Sans', sans-serif"
            }}
          >
            Discover Exquisite Jewelry
          </Title>
          <Paragraph 
            style={{ 
              color: 'white', 
              fontSize: 'clamp(16px, 2.5vw, 20px)', 
              marginBottom: '30px',
              fontFamily: "'Josefin Sans', sans-serif"
            }}
          >
            Premium Ashta Dhatu and Fashion Jewelry crafted with love and tradition
          </Paragraph>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop">
              <Button 
                type="primary" 
                size="large"
                style={{
                  backgroundColor: '#0d4b4b',
                  borderColor: '#0d4b4b',
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontWeight: 500
                }}
              >
                Shop Now
              </Button>
            </Link>
            <Link to="/collections">
              <Button 
                size="large" 
                style={{ 
                  background: 'white', 
                  color: '#0d4b4b',
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontWeight: 500
                }}
              >
                View Collections
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div
        style={{
          backgroundColor: '#0d4b4b',
          color: '#fff',
          textAlign: 'center',
          padding: '6px 0',
          fontSize: '14px',
          fontWeight: 500,
          fontFamily: "'Josefin Sans', sans-serif",
          whiteSpace: 'nowrap',
        }}
      >
        <marquee behavior="scroll" direction="left" scrollamount="6">
          4L+ Happy Customers | Gifts For Her @ 50% OFF | Ships in 24 hours &nbsp;&nbsp;&nbsp;
          4L+ Happy Customers | Gifts For Her @ 50% OFF | Ships in 24 hours
        </marquee>
      </div>
    </>
  );
};

export default Hero;