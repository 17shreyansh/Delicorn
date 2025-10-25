import React from 'react';
import { Layout, Row, Col, Typography, Card, Timeline } from 'antd';
import { TrophyOutlined, HeartOutlined, StarOutlined, TeamOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const AboutUs = () => {
  return (
    <Layout style={{ marginTop: '64px' }}>
      <Content style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Hero Section */}
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <Title level={1}>About Delicons</Title>
            <Paragraph style={{ fontSize: '20px', color: '#666', maxWidth: '800px', margin: '0 auto' }}>
              Crafting exquisite jewelry with passion, tradition, and modern elegance since 2010. 
              We believe every piece tells a story and creates lasting memories.
            </Paragraph>
          </div>

          {/* Story Section */}
          <Row gutter={[40, 40]} style={{ marginBottom: '80px' }}>
            <Col xs={24} lg={12}>
              <img
                src="https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600"
                alt="Our Story"
                style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px' }}
              />
            </Col>
            <Col xs={24} lg={12}>
              <Title level={2}>Our Story</Title>
              <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
                Founded in 2010 by master craftsmen with over 30 years of experience, Delicons began as a small 
                family workshop dedicated to preserving the ancient art of Ashta Dhatu jewelry making. Our journey 
                started with a simple belief: that jewelry should not just be beautiful, but meaningful.
              </Paragraph>
              <Paragraph style={{ fontSize: '16px', lineHeight: '1.8' }}>
                Today, we've grown into a trusted name in both traditional and contemporary jewelry, serving 
                customers across India and beyond. Every piece we create carries forward our commitment to 
                quality, authenticity, and the timeless beauty of handcrafted jewelry.
              </Paragraph>
            </Col>
          </Row>

          {/* Values Section */}
          <div style={{ marginBottom: '80px' }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>Our Values</Title>
            <Row gutter={[32, 32]}>
              <Col xs={24} sm={12} lg={6}>
                <Card style={{ textAlign: 'center', height: '100%' }}>
                  <TrophyOutlined style={{ fontSize: '48px', color: '#667eea', marginBottom: '16px' }} />
                  <Title level={4}>Quality</Title>
                  <Paragraph>
                    We use only the finest materials and traditional techniques to ensure every piece meets our high standards.
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card style={{ textAlign: 'center', height: '100%' }}>
                  <HeartOutlined style={{ fontSize: '48px', color: '#667eea', marginBottom: '16px' }} />
                  <Title level={4}>Passion</Title>
                  <Paragraph>
                    Our love for jewelry making drives us to create pieces that resonate with your personal style and story.
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card style={{ textAlign: 'center', height: '100%' }}>
                  <StarOutlined style={{ fontSize: '48px', color: '#667eea', marginBottom: '16px' }} />
                  <Title level={4}>Tradition</Title>
                  <Paragraph>
                    We honor ancient craftsmanship techniques while embracing modern design sensibilities.
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card style={{ textAlign: 'center', height: '100%' }}>
                  <TeamOutlined style={{ fontSize: '48px', color: '#667eea', marginBottom: '16px' }} />
                  <Title level={4}>Trust</Title>
                  <Paragraph>
                    Building lasting relationships with our customers through transparency, authenticity, and exceptional service.
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </div>

          {/* Timeline Section */}
          <Row gutter={[40, 40]} style={{ marginBottom: '80px' }}>
            <Col xs={24} lg={12}>
              <Title level={2}>Our Journey</Title>
              <Timeline
                items={[
                  {
                    children: (
                      <div>
                        <Title level={4}>2010 - The Beginning</Title>
                        <Paragraph>Started as a small family workshop specializing in Ashta Dhatu jewelry.</Paragraph>
                      </div>
                    ),
                  },
                  {
                    children: (
                      <div>
                        <Title level={4}>2015 - Expansion</Title>
                        <Paragraph>Introduced fashion jewelry collection and expanded our customer base.</Paragraph>
                      </div>
                    ),
                  },
                  {
                    children: (
                      <div>
                        <Title level={4}>2020 - Digital Transformation</Title>
                        <Paragraph>Launched our online platform to reach customers nationwide.</Paragraph>
                      </div>
                    ),
                  },
                  {
                    children: (
                      <div>
                        <Title level={4}>2024 - Present</Title>
                        <Paragraph>Continuing to innovate while preserving traditional craftsmanship.</Paragraph>
                      </div>
                    ),
                  },
                ]}
              />
            </Col>
            <Col xs={24} lg={12}>
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600"
                alt="Our Craftsmanship"
                style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px' }}
              />
            </Col>
          </Row>

          {/* Mission Section */}
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '60px 40px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <Title level={2} style={{ color: 'white', marginBottom: '20px' }}>Our Mission</Title>
            <Paragraph style={{ fontSize: '18px', color: 'white', maxWidth: '800px', margin: '0 auto' }}>
              To create jewelry that celebrates life's precious moments, combining traditional craftsmanship 
              with contemporary design to offer pieces that are not just accessories, but treasured heirlooms 
              that tell your unique story.
            </Paragraph>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default AboutUs;