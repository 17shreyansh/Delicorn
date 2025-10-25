import React from 'react';
import { Layout, Row, Col, Typography, Button, Card, InputNumber, Empty, Space } from 'antd';
import { DeleteOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartSummary from '../components/CartSummary';

const { Content } = Layout;
const { Title, Text } = Typography;

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <Layout style={{ marginTop: '64px', minHeight: '80vh' }}>
        <Content style={{ padding: '40px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span>
                Your cart is empty
              </span>
            }
          >
            <Link to="/">
              <Button type="primary" icon={<ShoppingOutlined />}>
                Continue Shopping
              </Button>
            </Link>
          </Empty>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ marginTop: '64px' }}>
      <Content style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <Title level={2}>Shopping Cart</Title>
            <Button type="text" danger onClick={clearCart}>
              Clear Cart
            </Button>
          </div>

          <Row gutter={[32, 32]}>
            <Col xs={24} lg={16}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                {cartItems.map(item => (
                  <Card key={item.id} style={{ width: '100%' }}>
                    <Row gutter={[16, 16]} align="middle">
                      <Col xs={24} sm={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ 
                            width: '100%', 
                            height: '120px', 
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                        />
                      </Col>
                      <Col xs={24} sm={10}>
                        <Space direction="vertical" size="small">
                          <Link to={`/product/${item.id}`}>
                            <Title level={4} style={{ margin: 0 }}>
                              {item.name}
                            </Title>
                          </Link>
                          <Text type="secondary">{item.description}</Text>
                          <Text strong style={{ color: '#667eea', fontSize: '16px' }}>
                            ₹{item.price.toLocaleString()}
                          </Text>
                        </Space>
                      </Col>
                      <Col xs={24} sm={4}>
                        <Space direction="vertical" align="center">
                          <Text>Quantity</Text>
                          <InputNumber
                            min={0}
                            max={10}
                            value={item.quantity}
                            onChange={(value) => handleQuantityChange(item.id, value)}
                          />
                        </Space>
                      </Col>
                      <Col xs={24} sm={4}>
                        <Space direction="vertical" align="end" style={{ width: '100%' }}>
                          <Text strong style={{ fontSize: '16px' }}>
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </Text>
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </Button>
                        </Space>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Space>
            </Col>
            
            <Col xs={24} lg={8}>
              <CartSummary onCheckout={handleCheckout} />
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Cart;