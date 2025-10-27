import React, { useState } from 'react';
import { Row, Col, Card, Typography, Button, Modal, Form, Input, Select, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AccountLayout from '../../components/AccountLayout';
import AccountContent from '../../components/AccountContent';

const { Text } = Typography;
const { Option } = Select;

const Addresses = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const addresses = [
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      phone: '+91 9876543210',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      name: 'John Doe',
      address: '456 Business Park, Floor 5',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400002',
      phone: '+91 9876543210',
      isDefault: false
    }
  ];

  const handleAddAddress = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(() => {
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <AccountLayout title="Saved Addresses">
      <AccountContent>
        <div style={{ marginBottom: '24px', textAlign: 'right' }}>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAddAddress}
          >
            Add New Address
          </Button>
        </div>
        <Row gutter={[16, 16]}>
                {addresses.map(address => (
                  <Col xs={24} lg={12} key={address.id}>
                    <Card
                      className="account-card"
                      title={
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 600, color: '#114D4D' }}>{address.type}</span>
                          {address.isDefault && <Text type="secondary">(Default)</Text>}
                        </div>
                      }
                      extra={
                        <Space>
                          <Button type="text" icon={<EditOutlined />} />
                          <Button type="text" danger icon={<DeleteOutlined />} />
                        </Space>
                      }
                    >
                      <Space direction="vertical" size="small">
                        <Text strong>{address.name}</Text>
                        <Text>{address.address}</Text>
                        <Text>{address.city}, {address.state} - {address.pincode}</Text>
                        <Text>Phone: {address.phone}</Text>
                      </Space>
                    </Card>
                  </Col>
                ))}
        </Row>

        <Modal
          title={
            <Text style={{ fontFamily: 'Josefin Sans, sans-serif', fontWeight: 600, color: '#114D4D' }}>
              Add New Address
            </Text>
          }
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          width={600}
          okButtonProps={{
            style: {
              background: '#114D4D',
              borderColor: '#114D4D',
              fontFamily: 'Josefin Sans, sans-serif',
            }
          }}
          cancelButtonProps={{
            style: {
              fontFamily: 'Josefin Sans, sans-serif',
            }
          }}
        >
          <Form form={form} layout="vertical" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="type" label="Address Type" rules={[{ required: true }]}>
                  <Select>
                    <Option value="home">Home</Option>
                    <Option value="office">Office</Option>
                    <Option value="other">Other</Option>
                  </Select>
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
        </Modal>
      </AccountContent>
    </AccountLayout>
  );
};

export default Addresses;