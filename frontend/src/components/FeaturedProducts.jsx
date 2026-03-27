import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Spin, Empty, Button } from 'antd';
import { Link } from 'react-router-dom';
import { ProductCard } from './product';
import apiService from '../services/api';

const { Title } = Typography;

const FeaturedProducts = ({ limit = 4, productType, title, emptyLink }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await apiService.getProducts({ 
          featured: true, 
          productType,
          limit 
        });
        setProducts(response.data || []);
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [limit, productType]);

  if (loading) {
    return (
      <div style={{
        padding: '40px 16px',
        backgroundColor: '#fff',
        textAlign: 'center'
      }}>
        <Spin size="large" />
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div style={{
      padding: '40px 16px',
      backgroundColor: '#fff'
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
          {title}
        </Title>
        <Row gutter={[20, 24]} justify="center">
          {products.map(product => (
            <Col
              xs={24}
              sm={12}
              md={8}  
              lg={6}
              xl={6}
              key={product._id}
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