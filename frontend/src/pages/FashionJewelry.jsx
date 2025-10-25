import React from 'react';
import { Typography, Breadcrumb, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import Slider from '../components/Slider';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import { fashionJewelryProducts } from '../data/products';
import hero1 from '../assets/hero1.jpg';
import p2 from '../assets/p2.png';

const { Title } = Typography;

const FashionJewelry = () => {
  const categories = [
    { name: 'Earrings', image: p2, link: '/fashion-jewelry/earrings' },
    { name: 'Necklaces', image: p2, link: '/fashion-jewelry/necklaces' },
    { name: 'Bracelets', image: p2, link: '/fashion-jewelry/bracelets' },
    { name: 'Rings', image: p2, link: '/fashion-jewelry/rings' }
  ];

  return (
    <div style={{ marginTop: '64px' }}>
      {/* Hero Header */}
      <div 
        style={{
          backgroundImage: `url(${hero1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)'
        }} />
        <Title 
          level={1} 
          style={{ 
            color: 'white', 
            fontSize: '48px', 
            textAlign: 'center',
            zIndex: 1,
            fontFamily: "'Prata', serif"
          }}
        >
          Fashion Jewelry Collection
        </Title>
      </div>

      {/* Heading and Breadcrumb */}
      <div style={{ padding: '40px 20px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Breadcrumb style={{ marginBottom: '20px' }}>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Fashion Jewelry</Breadcrumb.Item>
        </Breadcrumb>
        
        <Title level={2} style={{ textAlign: 'center', marginBottom: '40px', fontFamily: "'Prata', serif" }}>
          Modern & Trendy Jewelry
        </Title>
      </div>

      {/* Categories */}
      <div style={{ padding: '0 20px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <Row gutter={[24, 24]}>
          {categories.map((category, index) => (
            <Col xs={12} sm={6} key={index}>
              <Link to={category.link}>
                <div style={{ textAlign: 'center', cursor: 'pointer' }}>
                  <img 
                    src={category.image} 
                    alt={category.name}
                    style={{ 
                      width: '100%', 
                      height: '200px', 
                      objectFit: 'cover', 
                      borderRadius: '8px',
                      marginBottom: '10px'
                    }}
                  />
                  <Title level={4} style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                    {category.name}
                  </Title>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </div>

      {/* Slider Banners */}
      <Slider />

      {/* Products */}
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <ProductList 
          products={fashionJewelryProducts} 
          title="Featured Fashion Jewelry"
        />
      </div>

      {/* Image Section Component */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FashionJewelry;