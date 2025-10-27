import React, { useState } from 'react';
import { Typography, Button, Input, Form, Select, Row, Col } from 'antd';
import { EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import AccountLayout from '../../components/AccountLayout';
import AccountContent from '../../components/AccountContent';

const { Text } = Typography;
const { Option } = Select;

const AccountOverview = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const initialValues = {
    name: 'FULLNAME',
    phone: '9898989899',
    email: 'Hello@Mail.Com',
    gender: 'FEMALE',
    dob: '09/09/1990'
  };

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue(initialValues);
  };

  const handleSave = () => {
    form.validateFields().then(() => {
      setIsEditing(false);
      // Handle save logic here
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  return (
    <AccountLayout title="My Account">
      <AccountContent>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <Text
            style={{
              fontFamily: 'Josefin Sans, sans-serif',
              fontSize: '18px',
              fontWeight: 600,
              color: '#114D4D',
            }}
          >
            Profile Details
          </Text>
          {!isEditing ? (
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={handleEdit}
              style={{
                color: '#114D4D',
                fontSize: '16px',
                fontFamily: 'Josefin Sans, sans-serif',
              }}
            >
              Edit
            </Button>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={handleSave}
                style={{
                  background: '#114D4D',
                  borderColor: '#114D4D',
                  fontFamily: 'Josefin Sans, sans-serif',
                }}
              >
                Save
              </Button>
              <Button
                icon={<CloseOutlined />}
                onClick={handleCancel}
                style={{
                  fontFamily: 'Josefin Sans, sans-serif',
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>

        <Form form={form} layout="vertical" initialValues={initialValues}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="name"
                label={<Text style={{ fontWeight: 600, color: '#114D4D', fontFamily: 'Josefin Sans, sans-serif' }}>Full Name</Text>}
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input
                  disabled={!isEditing}
                  style={{
                    fontFamily: 'Josefin Sans, sans-serif',
                    background: isEditing ? '#fff' : '#f5f5f5',
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="phone"
                label={<Text style={{ fontWeight: 600, color: '#114D4D', fontFamily: 'Josefin Sans, sans-serif' }}>Contact Number</Text>}
                rules={[{ required: true, message: 'Please enter your phone number' }]}
              >
                <Input
                  disabled={!isEditing}
                  style={{
                    fontFamily: 'Josefin Sans, sans-serif',
                    background: isEditing ? '#fff' : '#f5f5f5',
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                name="email"
                label={<Text style={{ fontWeight: 600, color: '#114D4D', fontFamily: 'Josefin Sans, sans-serif' }}>Email Address</Text>}
                rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
              >
                <Input
                  disabled={!isEditing}
                  style={{
                    fontFamily: 'Josefin Sans, sans-serif',
                    background: isEditing ? '#fff' : '#f5f5f5',
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="gender"
                label={<Text style={{ fontWeight: 600, color: '#114D4D', fontFamily: 'Josefin Sans, sans-serif' }}>Gender</Text>}
                rules={[{ required: true, message: 'Please select your gender' }]}
              >
                <Select
                  disabled={!isEditing}
                  style={{
                    fontFamily: 'Josefin Sans, sans-serif',
                  }}
                >
                  <Option value="MALE">Male</Option>
                  <Option value="FEMALE">Female</Option>
                  <Option value="OTHER">Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="dob"
                label={<Text style={{ fontWeight: 600, color: '#114D4D', fontFamily: 'Josefin Sans, sans-serif' }}>Date of Birth</Text>}
                rules={[{ required: true, message: 'Please enter your date of birth' }]}
              >
                <Input
                  disabled={!isEditing}
                  placeholder="DD/MM/YYYY"
                  style={{
                    fontFamily: 'Josefin Sans, sans-serif',
                    background: isEditing ? '#fff' : '#f5f5f5',
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </AccountContent>
    </AccountLayout>
  );
};

export default AccountOverview;
