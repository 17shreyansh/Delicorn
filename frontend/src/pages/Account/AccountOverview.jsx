import React from 'react';
import { Layout, Row, Col, Card, Typography, Button, Form, Input } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import Sidebar from '../../components/Sidebar';

const { Content } = Layout;
const { Title, Text } = Typography;

const AccountOverview = () => {
  const [form] = Form.useForm();

  return (
    <Layout style={{ marginTop: '64px' }}>
      <Content style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Title level={2} style={{ marginBottom: '30px' }}>My Account</Title>
          
          <Row gutter={[32, 32]}>
            <Col xs={24} md={6}>
              <Sidebar />
            </Col>
            
            <Col xs={24} md={18}>
              <Card title="Account Information" extra={<Button icon={<EditOutlined />}>Edit</Button>}>
                <Form form={form} layout="vertical">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                      <Form.Item label="First Name" name="firstName" initialValue="John">
                        <Input disabled />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Last Name" name="lastName" initialValue="Doe">
                        <Input disabled />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item label="Email" name="email" initialValue="john.doe@example.com">
                        <Input disabled />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item label="Phone" name="phone" initialValue="+91 9876543210">
                        <Input disabled />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>

              <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
                <Col xs={24} sm={8}>
                  <Card>
                    <div style={{ textAlign: 'center' }}>
                      <Title level={3} style={{ color: '#667eea' }}>12</Title>
                      <Text>Total Orders</Text>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card>
                    <div style={{ textAlign: 'center' }}>
                      <Title level={3} style={{ color: '#52c41a' }}>8</Title>
                      <Text>Wishlist Items</Text>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card>
                    <div style={{ textAlign: 'center' }}>
                      <Title level={3} style={{ color: '#fa8c16' }}>3</Title>
                      <Text>Saved Addresses</Text>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default AccountOverview;