import React from 'react';
import { Row, Col, Card, Typography, Tag, Button, Space, Empty } from 'antd';
import { UndoOutlined } from '@ant-design/icons';
import AccountLayout from '../../components/AccountLayout';
import AccountContent from '../../components/AccountContent';

const { Text } = Typography;

const ReturnsRefunds = () => {
  const returns = [
    {
      id: 'RET001',
      orderId: 'ORD001',
      date: '2024-01-20',
      status: 'Processing',
      amount: 2500,
      reason: 'Product damaged',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100'
    },
    {
      id: 'RET002',
      orderId: 'ORD003',
      date: '2024-01-18',
      status: 'Completed',
      amount: 1800,
      reason: 'Wrong size',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'green';
      case 'Processing': return 'orange';
      case 'Rejected': return 'red';
      default: return 'default';
    }
  };

  return (
    <AccountLayout title="Returns & Refunds">
      <AccountContent>
        {returns.length === 0 ? (
          <Empty
            image={<UndoOutlined style={{ fontSize: '64px', color: '#114D4D' }} />}
            description="No returns or refunds"
          />
        ) : (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {returns.map(returnItem => (
              <Card key={returnItem.id} className="account-card">
                <Row gutter={[16, 16]} align="middle">
                  <Col xs={6} sm={4}>
                    <img
                      src={returnItem.image}
                      alt="Return Item"
                      style={{ 
                        width: '100%', 
                        maxWidth: '80px',
                        height: '80px', 
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                  </Col>
                  <Col xs={18} sm={12}>
                    <Space direction="vertical" size="small">
                      <Text strong>Return #{returnItem.id}</Text>
                      <Text type="secondary">Order #{returnItem.orderId}</Text>
                      <Text type="secondary">Requested on {returnItem.date}</Text>
                      <Text>Reason: {returnItem.reason}</Text>
                      <Tag color={getStatusColor(returnItem.status)}>{returnItem.status}</Tag>
                    </Space>
                  </Col>
                  <Col xs={12} sm={4} style={{ textAlign: 'center' }}>
                    <Text strong style={{ fontSize: '16px' }}>
                      ₹{returnItem.amount.toLocaleString()}
                    </Text>
                  </Col>
                  <Col xs={12} sm={4} style={{ textAlign: 'right' }}>
                    <Button type="primary">
                      Track Status
                    </Button>
                  </Col>
                </Row>
                    </Card>
            ))}
          </Space>
        )}
      </AccountContent>
    </AccountLayout>
  );
};

export default ReturnsRefunds;