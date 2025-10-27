import React, { useState } from 'react';
import { Typography, Button, Card, Row, Col } from 'antd';
import AccountLayout from '../../components/AccountLayout';
import AccountContent from '../../components/AccountContent';

const { Text } = Typography;

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState('Ordered');

  const orders = [
    {
      id: 1,
      name: 'Streamlined Sparkle Diamond Bangle',
      size: '45 * 55 MM',
      weight: '9.616 g',
      qty: 1,
      date: 'Order Placed - 18 Sept',
      image: 'https://via.placeholder.com/80',
    },
    {
      id: 2,
      name: 'Streamlined Sparkle Diamond Bangle',
      size: '45 * 55 MM',
      weight: '9.616 g',
      qty: 1,
      date: 'Shipped - 20 Sept',
      image: 'https://via.placeholder.com/80',
    },
  ];

  const tabs = ['Ordered', 'Track Order', 'Delivered', 'Order History'];

  return (
    <AccountLayout title="My Orders">
      <AccountContent>
        <div className="account-tabs">
          {tabs.map((tab) => (
            <Button
              key={tab}
              type={activeTab === tab ? 'primary' : 'default'}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>

        <div>
          {orders.map((order) => (
            <Card key={order.id} className="account-card" bordered={false}>
              <Row gutter={[16, 16]} align="middle">
                <Col xs={6} sm={4} md={3}>
                  <img
                    src={order.image}
                    alt="Product"
                    style={{
                      width: '100%',
                      maxWidth: '60px',
                      height: '60px',
                      borderRadius: '6px',
                      objectFit: 'cover',
                    }}
                  />
                </Col>
                <Col xs={18} sm={14} md={15}>
                  <Text strong style={{ display: 'block', color: '#114D4D', marginBottom: '4px' }}>
                    {order.name}
                  </Text>
                  <Text type="secondary" style={{ display: 'block', fontSize: '13px' }}>
                    Size: {order.size} | Weight: {order.weight}
                  </Text>
                  <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>
                    {order.date}
                  </Text>
                </Col>
                <Col xs={12} sm={3} md={3} style={{ textAlign: 'center' }}>
                  <Text>Qty: {order.qty}</Text>
                </Col>
                <Col xs={12} sm={3} md={3} style={{ textAlign: 'right' }}>
                  <Button type="link" style={{ color: '#114D4D', padding: 0 }}>
                    View details
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      </AccountContent>
    </AccountLayout>
  );
};

export default MyOrders;
