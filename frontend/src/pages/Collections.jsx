import React from 'react';
import { Row, Col, Card, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Collections = () => {
  const collections = [
    {
      id: 1,
      title: 'Ashta Dhatu Collection',
      description: 'Sacred jewelry made from eight precious metals',
      image: '/api/placeholder/400/300',
      link: '/ashta-dhatu'
    },
    {
      id: 2,
      title: 'Fashion Jewelry',
      description: 'Contemporary designs for modern lifestyle',
      image: '/api/placeholder/400/300',
      link: '/fashion-jewelry'
    }
  ];

  return (
    <div style={{ padding: '40px 20px', fontFamily: "'Josefin Sans', sans-serif" }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <Title level={1} style={{ color: '#0d4b4b', fontFamily: "'Josefin Sans', sans-serif" }}>
          Our Collections
        </Title>
        <Paragraph style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
          Discover our carefully curated jewelry collections, each telling a unique story of craftsmanship and tradition.
        </Paragraph>
      </div>

      <Row gutter={[32, 32]} justify="center">
        {collections.map(collection => (
          <Col xs={24} md={12} lg={10} key={collection.id}>
            <Card
              hoverable
              cover={
                <div style={{ 
                  height: '300px', 
                  background: 'linear-gradient(135deg, #0d4b4b 0%, #1a6b6b 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '24px'
                }}>
                  {collection.title}
                </div>
              }
              style={{ borderRadius: '16px', overflow: 'hidden' }}
            >
              <div style={{ padding: '20px' }}>
                <Title level={3} style={{ color: '#0d4b4b', marginBottom: '16px' }}>
                  {collection.title}
                </Title>
                <Paragraph style={{ color: '#666', marginBottom: '24px' }}>
                  {collection.description}
                </Paragraph>
                <Link to={collection.link}>
                  <Button 
                    type="primary" 
                    size="large"
                    style={{
                      background: '#0d4b4b',
                      borderColor: '#0d4b4b',
                      fontFamily: "'Josefin Sans', sans-serif"
                    }}
                  >
                    Explore Collection
                  </Button>
                </Link>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Collections;