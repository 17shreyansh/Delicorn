import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import { allProducts } from '../data/products';
import ProductCard from './ProductCard';

const { Title } = Typography;

const FeaturedProducts = ({ limit = 8 }) => {
  const featuredProducts = allProducts.slice(0, limit);

  return (
    <div style={{
      padding: '40px 16px',
      backgroundColor: '#fff',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <Title level={2} style={{
          marginBottom: '32px',
          fontSize: 'clamp(24px, 4vw, 32px)',
          fontFamily: "'Prata', serif",
          fontWeight: '400',
          color: '#114D4D'
        }}>
          Sacred Pendants & Bracelets
        </Title>
        <Row gutter={[20, 24]} justify="center">
          {featuredProducts.map(product => (
            <Col
              xs={24}
              sm={12}
              md={8}  
              lg={6}
              xl={6}
              key={product.id}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
        
      </div>
    </div>
  );
};

export default FeaturedProducts;