import React from 'react';
import { Layout, Row, Col, Typography, Form, Input, Button, Card, Space } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const ContactUs = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Contact form submitted:', values);
    form.resetFields();
  };

  return (
    <Layout style={{ marginTop: '64px' }}>
      <Content style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={1}>Contact Us</Title>
            <Paragraph style={{ fontSize: '18px', color: '#666' }}>
              We'd love to hear from you. Get in touch with us.
            </Paragraph>
          </div>

          <Row gutter={[40, 40]}>
            <Col xs={24} lg={12}>
              <Card title="Send us a Message">
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                      <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item name="phone" label="Phone Number">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Form.Item name="message" label="Message" rules={[{ required: true }]}>
                        <Input.TextArea rows={6} />
                      </Form.Item>
                    </Col>
                    <Col xs={24}>
                      <Button type="primary" htmlType="submit" size="large" block>
                        Send Message
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Card>
                  <Space>
                    <PhoneOutlined style={{ fontSize: '24px', color: '#667eea' }} />
                    <div>
                      <Title level={4} style={{ margin: 0 }}>Phone</Title>
                      <Paragraph style={{ margin: 0 }}>+91 9876543210</Paragraph>
                    </div>
                  </Space>
                </Card>

                <Card>
                  <Space>
                    <MailOutlined style={{ fontSize: '24px', color: '#667eea' }} />
                    <div>
                      <Title level={4} style={{ margin: 0 }}>Email</Title>
                      <Paragraph style={{ margin: 0 }}>info@delicons.com</Paragraph>
                    </div>
                  </Space>
                </Card>

                <Card>
                  <Space>
                    <EnvironmentOutlined style={{ fontSize: '24px', color: '#667eea' }} />
                    <div>
                      <Title level={4} style={{ margin: 0 }}>Address</Title>
                      <Paragraph style={{ margin: 0 }}>
                        123 Jewelry Street<br />
                        Mumbai, Maharashtra 400001<br />
                        India
                      </Paragraph>
                    </div>
                  </Space>
                </Card>

                <Card>
                  <Space>
                    <ClockCircleOutlined style={{ fontSize: '24px', color: '#667eea' }} />
                    <div>
                      <Title level={4} style={{ margin: 0 }}>Business Hours</Title>
                      <Paragraph style={{ margin: 0 }}>
                        Monday - Saturday: 10:00 AM - 8:00 PM<br />
                        Sunday: 11:00 AM - 6:00 PM
                      </Paragraph>
                    </div>
                  </Space>
                </Card>
              </Space>
            </Col>
          </Row>

          <div style={{ marginTop: '60px' }}>
            <Card title="Find Us">
              <div style={{ height: '400px', background: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Paragraph style={{ color: '#666', fontSize: '16px' }}>
                  Google Maps Integration Placeholder
                </Paragraph>
              </div>
            </Card>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default ContactUs;