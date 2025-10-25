import React from 'react';
import { Layout, Typography, Card, Row, Col, Timeline, Divider } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const ReturnRefund = () => {
  return (
    <Layout style={{ marginTop: '64px' }}>
      <Content style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={1}>Return & Refund Policy</Title>
            <Paragraph style={{ fontSize: '18px', color: '#666' }}>
              We want you to be completely satisfied with your purchase. 
              Please read our return and refund policy carefully.
            </Paragraph>
          </div>

          <Row gutter={[32, 32]} style={{ marginBottom: '60px' }}>
            <Col xs={24} md={8}>
              <Card style={{ textAlign: 'center', height: '100%' }}>
                <CheckCircleOutlined style={{ fontSize: '48px', color: '#52c41a', marginBottom: '16px' }} />
                <Title level={4}>30-Day Returns</Title>
                <Paragraph>
                  Return any item within 30 days of purchase for a full refund or exchange.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card style={{ textAlign: 'center', height: '100%' }}>
                <ClockCircleOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
                <Title level={4}>Quick Processing</Title>
                <Paragraph>
                  Returns are processed within 3-5 business days after we receive your item.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card style={{ textAlign: 'center', height: '100%' }}>
                <ExclamationCircleOutlined style={{ fontSize: '48px', color: '#fa8c16', marginBottom: '16px' }} />
                <Title level={4}>Quality Guarantee</Title>
                <Paragraph>
                  All items must be in original condition with tags and packaging intact.
                </Paragraph>
              </Card>
            </Col>
          </Row>

          <Card style={{ marginBottom: '40px' }}>
            <Title level={2}>Return Process</Title>
            <Timeline
              items={[
                {
                  children: (
                    <div>
                      <Title level={4}>Step 1: Initiate Return</Title>
                      <Paragraph>
                        Contact our customer service team or initiate a return through your account dashboard. 
                        Provide your order number and reason for return.
                      </Paragraph>
                    </div>
                  ),
                },
                {
                  children: (
                    <div>
                      <Title level={4}>Step 2: Package Your Item</Title>
                      <Paragraph>
                        Carefully package the item in its original packaging with all tags and accessories. 
                        Include the return authorization number we provide.
                      </Paragraph>
                    </div>
                  ),
                },
                {
                  children: (
                    <div>
                      <Title level={4}>Step 3: Ship the Item</Title>
                      <Paragraph>
                        Use the prepaid return label we provide or ship to our return address. 
                        We recommend using a trackable shipping method.
                      </Paragraph>
                    </div>
                  ),
                },
                {
                  children: (
                    <div>
                      <Title level={4}>Step 4: Processing & Refund</Title>
                      <Paragraph>
                        Once we receive and inspect your return, we'll process your refund within 3-5 business days. 
                        Refunds are issued to the original payment method.
                      </Paragraph>
                    </div>
                  ),
                },
              ]}
            />
          </Card>

          <Card style={{ marginBottom: '40px' }}>
            <Title level={2}>Return Conditions</Title>
            <Row gutter={[32, 32]}>
              <Col xs={24} md={12}>
                <Title level={4} style={{ color: '#52c41a' }}>Eligible for Return</Title>
                <ul style={{ paddingLeft: '20px' }}>
                  <li>Items in original condition with tags</li>
                  <li>Unworn jewelry with original packaging</li>
                  <li>Items returned within 30 days</li>
                  <li>Defective or damaged items</li>
                  <li>Wrong item received</li>
                </ul>
              </Col>
              <Col xs={24} md={12}>
                <Title level={4} style={{ color: '#ff4d4f' }}>Not Eligible for Return</Title>
                <ul style={{ paddingLeft: '20px' }}>
                  <li>Customized or personalized items</li>
                  <li>Items worn or damaged by customer</li>
                  <li>Items without original packaging</li>
                  <li>Items returned after 30 days</li>
                  <li>Gift cards and vouchers</li>
                </ul>
              </Col>
            </Row>
          </Card>

          <Card style={{ marginBottom: '40px' }}>
            <Title level={2}>Refund Information</Title>
            <Divider />
            <Row gutter={[32, 32]}>
              <Col xs={24} md={12}>
                <Title level={4}>Refund Timeline</Title>
                <ul style={{ paddingLeft: '20px' }}>
                  <li><Text strong>Credit/Debit Cards:</Text> 5-7 business days</li>
                  <li><Text strong>UPI/Net Banking:</Text> 3-5 business days</li>
                  <li><Text strong>Cash on Delivery:</Text> 7-10 business days</li>
                </ul>
              </Col>
              <Col xs={24} md={12}>
                <Title level={4}>Refund Amount</Title>
                <ul style={{ paddingLeft: '20px' }}>
                  <li>Full product price refunded</li>
                  <li>Original shipping charges non-refundable</li>
                  <li>Return shipping costs deducted (if applicable)</li>
                  <li>Processing fees may apply for certain payment methods</li>
                </ul>
              </Col>
            </Row>
          </Card>

          <Card>
            <Title level={2}>Exchange Policy</Title>
            <Paragraph style={{ fontSize: '16px' }}>
              We offer exchanges for size or style within 30 days of purchase. The item must be in original 
              condition with tags attached. Exchange shipping costs may apply. If the new item costs more, 
              you'll pay the difference. If it costs less, we'll refund the difference.
            </Paragraph>
            <Divider />
            <Title level={4}>Need Help?</Title>
            <Paragraph>
              If you have any questions about returns or refunds, please contact our customer service team:
            </Paragraph>
            <ul style={{ paddingLeft: '20px' }}>
              <li>Email: returns@delicons.com</li>
              <li>Phone: +91 9876543210</li>
              <li>Live Chat: Available on our website</li>
            </ul>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default ReturnRefund;