import React from 'react';
import { Typography, Breadcrumb, Row, Col, Dropdown, Button } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import Footer from '../components/Footer';
import Offer2 from '../components/Offer2';
import { fashionJewelryProducts } from '../data/products';
import hero1 from '../assets/hero1.jpg';
import p2 from '../assets/p2.png';

const { Title } = Typography;

const FashionJewelry = () => {
  const categories = [
    { name: 'Earrings', image: p2, link: '/fashion-jewelry/earrings' },
    { name: 'Necklaces', image: p2, link: '/fashion-jewelry/necklaces' },
    { name: 'Bracelets', image: p2, link: '/fashion-jewelry/bracelets' },
    { name: 'Rings', image: p2, link: '/fashion-jewelry/rings' },
    { name: 'Anklets', image: p2, link: '/fashion-jewelry/anklets' }
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
          Fashion Statement Neckpieces
        </Title>
        <Breadcrumb style={{ marginBottom: '20px', fontFamily: "'Josefin Sans', sans-serif", justifyContent: 'center', display: 'flex' }}>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Fashion Jewelry</Breadcrumb.Item>
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
                  <Title level={4} style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: '500', color: '#333' }}>
                    {category.name}
                  </Title>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </div>

      {/* Products */}
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: '500', fontSize: '16px' }}>Filter:</span>
            <Dropdown
              menu={{
                items: [
                  { key: '1', label: 'All Categories' },
                  { key: '2', label: 'Earrings' },
                  { key: '3', label: 'Necklaces' },
                  { key: '4', label: 'Bracelets' },
                  { key: '5', label: 'Rings' },
                  { key: '6', label: 'Anklets' },
                  { key: '7', label: 'Price: Under ₹3000' },
                  { key: '8', label: 'Price: ₹3000-₹10000' },
                  { key: '9', label: 'Price: Above ₹10000' }
                ]
              }}
              trigger={['click']}
            >
              <Button icon={<FilterOutlined />} style={{ fontFamily: "'Josefin Sans', sans-serif", height: '32px', minWidth: '120px' }}>
                All
              </Button>
            </Dropdown>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: '500', fontSize: '16px' }}>Sort by:</span>
            <Dropdown
              menu={{
                items: [
                  { key: '1', label: 'Featured' },
                  { key: '2', label: 'Price: Low to High' },
                  { key: '3', label: 'Price: High to Low' },
                  { key: '4', label: 'Newest' },
                  { key: '5', label: 'Best Selling' },
                  { key: '6', label: 'Customer Rating' }
                ]
              }}
              trigger={['click']}
            >
              <Button style={{ fontFamily: "'Josefin Sans', sans-serif", height: '32px', minWidth: '120px' }}>
                Featured
              </Button>
            </Dropdown>
          </div>
        </div>
        <ProductList products={fashionJewelryProducts} />
      </div>

      <Offer2 />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FashionJewelry;