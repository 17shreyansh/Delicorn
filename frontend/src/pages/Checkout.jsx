import React, { useState } from 'react';
import { Layout, Steps, Form, Input, Select, Button, Card, Row, Col, Typography, Space, Radio, message } from 'antd';
import { CreditCardOutlined, EnvironmentOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartSummary from '../components/CartSummary';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const steps = [
    {
      title: 'Shipping Address',
      icon: <EnvironmentOutlined />
    },
    {
      title: 'Payment Method',
      icon: <CreditCardOutlined />
    },
    {
      title: 'Order Review',
      icon: <CheckCircleOutlined />
    }
  ];

  const handleNext = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    });
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handlePlaceOrder = () => {
    message.success('Order placed successfully!');
    clearCart();
    navigate('/account/orders');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card title="Shipping Address">
            <Form form={form} layout="vertical">
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
                  <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                    <Input.TextArea rows={3} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item name="city" label="City" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item name="state" label="State" rules={[{ required: true }]}>
                    <Select>
                      <Option value="maharashtra">Maharashtra</Option>
                      <Option value="delhi">Delhi</Option>
                      <Option value="karnataka">Karnataka</Option>
                      <Option value="gujarat">Gujarat</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={8}>
                  <Form.Item name="pincode" label="Pincode" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        );

      case 1:
        return (
          <Card title="Payment Method">
            <Form.Item name="paymentMethod" rules={[{ required: true }]}>
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value="card">Credit/Debit Card</Radio>
                  <Radio value="upi">UPI</Radio>
                  <Radio value="netbanking">Net Banking</Radio>
                  <Radio value="cod">Cash on Delivery</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Card>
        );

      case 2:
        return (
          <Card title="Order Review">
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text strong>{item.name}</Text>
                    <br />
                    <Text type="secondary">Qty: {item.quantity}</Text>
                  </div>
                  <Text strong>₹{(item.price * item.quantity).toLocaleString()}</Text>
                </div>
              ))}
            </Space>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Layout style={{ marginTop: '64px' }}>
      <Content style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Title level={2} style={{ marginBottom: '30px' }}>Checkout</Title>
          
          <Steps current={currentStep} items={steps} style={{ marginBottom: '40px' }} />

          <Row gutter={[32, 32]}>
            <Col xs={24} lg={16}>
              {renderStepContent()}
              
              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between' }}>
                {currentStep > 0 && (
                  <Button onClick={handlePrevious}>
                    Previous
                  </Button>
                )}
                {currentStep < steps.length - 1 ? (
                  <Button type="primary" onClick={handleNext} style={{ marginLeft: 'auto' }}>
                    Next
                  </Button>
                ) : (
                  <Button type="primary" onClick={handlePlaceOrder} style={{ marginLeft: 'auto' }}>
                    Place Order
                  </Button>
                )}
              </div>
            </Col>
            
            <Col xs={24} lg={8}>
              <CartSummary showCheckoutButton={false} />
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Checkout;