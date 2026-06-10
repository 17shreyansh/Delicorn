import React, { useState, useEffect } from 'react';
import { Button, Typography, Spin } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import image from '../assets/hero1.jpg';

const { Title, Paragraph } = Typography;
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const Hero = () => {
  const [heroData, setHeroData] = useState(null);
  const [marqueeData, setMarqueeData] = useState(null);
  const [loading, setLoading] = useState(true);

  const defaultHeroData = {
    title: 'Discover Exquisite Jewelry',
    subtitle: 'Premium Ashta Dhatu and Fashion Jewelry crafted with love and tradition',
    backgroundImage: image,
    primaryButtonText: 'Shop Now',
    primaryButtonLink: '/shop',
    secondaryButtonText: 'View Collections',
    secondaryButtonLink: '/collections'
  };

  const defaultMarqueeData = {
    lowerMarquee: {
      text: '4L+ Happy Customers | Gifts For Her @ 50% OFF | Ships in 24 hours',
      backgroundColor: '#0d4b4b',
      textColor: '#ffffff',
      speed: 6,
      isActive: true
    }
  };

  useEffect(() => {
    fetchDynamicData();
  }, []);

  const fetchDynamicData = async () => {
    try {
      const [heroRes, marqueeRes] = await Promise.all([
        axios.get(`${VITE_BACKEND_URL}/api/dynamic-home/hero`),
        axios.get(`${VITE_BACKEND_URL}/api/dynamic-home/marquee`)
      ]);
      setHeroData(heroRes.data.data);
      setMarqueeData(marqueeRes.data.data);
    } catch (error) {
      console.error('Error fetching hero data:', error);
      setHeroData(defaultHeroData);
      setMarqueeData(defaultMarqueeData);
    } finally {
      setLoading(false);
    }
  };

  const hero = heroData || defaultHeroData;
  const marquee = marqueeData || defaultMarqueeData;

  const bgImage = hero.backgroundImage?.startsWith('http') 
    ? hero.backgroundImage 
    : hero.backgroundImage?.startsWith('/uploads') || hero.backgroundImage?.startsWith('/assets')
    ? `${VITE_BACKEND_URL}${hero.backgroundImage}`
    : hero.backgroundImage;

  if (loading) {
    return (
      <div style={{ height: 'calc(100vh - 90px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div 
        style={{
          backgroundImage: `url(${bgImage})`,
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
            {hero.title}
          </Title>
          <Paragraph 
            style={{ 
              color: 'white', 
              fontSize: 'clamp(16px, 2.5vw, 20px)', 
              marginBottom: '30px',
              fontFamily: "'Josefin Sans', sans-serif"
            }}
          >
            {hero.subtitle}
          </Paragraph>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to={hero.primaryButtonLink || '/shop'}>
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
                {hero.primaryButtonText || 'Shop Now'}
              </Button>
            </Link>
            <Link to={hero.secondaryButtonLink || '/collections'}>
              <Button 
                size="large" 
                style={{ 
                  background: 'white', 
                  color: '#0d4b4b',
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontWeight: 500
                }}
              >
                {hero.secondaryButtonText || 'View Collections'}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Lower Marquee - After Hero */}
      {marquee.lowerMarquee?.isActive && (
        <div style={{
          backgroundColor: marquee.lowerMarquee.backgroundColor,
          color: marquee.lowerMarquee.textColor,
          textAlign: 'center',
          padding: '6px 0',
          fontSize: '14px',
          fontWeight: 500,
          fontFamily: "'Josefin Sans', sans-serif",
          whiteSpace: 'nowrap',
        }}>
          <marquee behavior="scroll" direction="left" scrollamount={marquee.lowerMarquee.speed}>
            {marquee.lowerMarquee.text} &nbsp;&nbsp;&nbsp; {marquee.lowerMarquee.text}
          </marquee>
        </div>
      )}
    </>
  );
};

export default Hero;