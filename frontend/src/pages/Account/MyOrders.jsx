import React from 'react';
import { Layout, Row, Col, Card, Typography, Tag, Button, Space } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import Sidebar from '../../components/Sidebar';

const { Content } = Layout;
const { Title, Text } = Typography;

const MyOrders = () => {
  const orders = [
    {
      id: 'ORD001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 2500,
      items: 2,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100'
    },
    {
      id: 'ORD002',
      date: '2024-01-10',
      status: 'Shipped',
      total: 1800,
      items: 1,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100'
    },
    {
      id: 'ORD003',
      date: '2024-01-05',
      status: 'Processing',
      total: 3200,
      items: 3,
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=100'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'green';
      case 'Shipped': return 'blue';
      case 'Processing': return 'orange';
      default: return 'default';
    }
  };

  return (
    <Layout style={{ marginTop: '64px' }}>
      <Content style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Title level={2} style={{ marginBottom: '30px' }}>My Orders</Title>
          
          <Row gutter={[32, 32]}>
            <Col xs={24} md={6}>
              <Sidebar />
            </Col>
            
            <Col xs={24} md={18}>
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                {orders.map(order => (
                  <Card key={order.id}>
                    <Row gutter={[16, 16]} align="middle">
                      <Col xs={24} sm={4}>
                        <img
                          src={order.image}
                          alt="Order"
                          style={{ 
                            width: '80px', 
                            height: '80px', 
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <Space direction="vertical" size="small">
                          <Text strong>Order #{order.id}</Text>
                          <Text type="secondary">Placed on {order.date}</Text>
                          <Text>{order.items} item(s)</Text>
                          <Tag color={getStatusColor(order.status)}>{order.status}</Tag>
                        </Space>
                      </Col>
                      <Col xs={24} sm={4}>
                        <Text strong style={{ fontSize: '16px' }}>
                          ₹{order.total.toLocaleString()}
                        </Text>
                      </Col>
                      <Col xs={24} sm={4}>
                        <Button icon={<EyeOutlined />}>
                          View Details
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Space>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default MyOrders;