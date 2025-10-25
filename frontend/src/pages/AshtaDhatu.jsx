import React from 'react';
import { Typography, Breadcrumb, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import Slider from '../components/Slider';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import { ashtaDhatuProducts } from '../data/products';
import hero1 from '../assets/jewelleryImage.jpg';
import p1 from '../assets/c1.jpg';

const { Title } = Typography;

const AshtaDhatu = () => {
  const categories = [
    { name: 'Rings', image: p1, link: '/ashta-dhatu/rings' },
    { name: 'Pendants', image: p1, link: '/ashta-dhatu/pendants' },
    { name: 'Bracelets', image: p1, link: '/ashta-dhatu/bracelets' },
    { name: 'Earrings', image: p1, link: '/ashta-dhatu/earrings' },
    { name: 'Necklaces', image: p1, link: '/ashta-dhatu/necklaces' },

  ];

  return (
    <div>
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
        
      </div>

      {/* Heading and Breadcrumb */}
      <div style={{ padding: '40px 20px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        
        <Title level={2} style={{ textAlign: 'center', fontFamily: "'Prata', serif", color: "#114D4D", fontWeight: '400' }}>
          Ashta Dhatu Divine
        </Title>
        <Breadcrumb style={{ marginBottom: '20px', fontFamily: "'Josefin Sans', sans-serif", justifyContent: 'center', display: 'flex' }}>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Ashta Dhatu</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {/* Categories */}
      <div style={{ padding: '0 20px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <Row gutter={[24, 24]} justify="center">
          {categories.map((category, index) => (
            <Col xs={12} sm={8} md={6} lg={4} xl={4} key={index}>
              <Link to={category.link}>
                <div style={{ textAlign: 'center', cursor: 'pointer' }}>
                  <img 
                    src={category.image} 
                    alt={category.name}
                    style={{ 
                      width: '150px', 
                      height: '150px', 
                      objectFit: 'cover', 
                      borderRadius: '50%',
                      marginBottom: '10px',
                      border: '1px solid #114D4D'
                    }}
                  />
                  <Title level={4} style={{ fontFamily: "'Josefin Sans', sans-serif",fontWeight: '500', color: '#333' }}>
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
          products={ashtaDhatuProducts} 
          title="Featured Ashta Dhatu Products"
        />
      </div>

      {/* Image Section Component */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AshtaDhatu;