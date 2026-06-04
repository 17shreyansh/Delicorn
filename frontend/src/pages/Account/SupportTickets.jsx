import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  Space,
  Typography,
  Row,
  Col,
  List,
  Avatar,
  message,
  Spin,
  Empty,
  Rate
} from 'antd';
import {
  PlusOutlined,
  EyeOutlined,
  SendOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { API_URL } from '../../constants/apiRoutes';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

axios.defaults.withCredentials = true;

const SupportTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [form] = Form.useForm();
  const [closeForm] = Form.useForm();

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/tickets`);
      setTickets(data.data);
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to fetch tickets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleCreateTicket = async (values) => {
    try {
      await axios.post(`${API_URL}/tickets`, values);
      message.success('Ticket created successfully');
      setCreateModalVisible(false);
      form.resetFields();
      fetchTickets();
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to create ticket');
    }
  };

  const handleViewTicket = async (ticketId) => {
    try {
      const { data } = await axios.get(`${API_URL}/tickets/${ticketId}`);
      setSelectedTicket(data.data);
      setViewModalVisible(true);
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to fetch ticket');
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;
    setSendingMessage(true);
    try {
      await axios.post(`${API_URL}/tickets/${selectedTicket._id}/messages`, { message: messageText });
      setMessageText('');
      const { data } = await axios.get(`${API_URL}/tickets/${selectedTicket._id}`);
      setSelectedTicket(data.data);
      message.success('Message sent successfully');
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to send message');
    } finally {
      setSendingMessage(false);
    }
  };

  const handleCloseTicket = async (values) => {
    try {
      await axios.put(`${API_URL}/tickets/${selectedTicket._id}/close`, values);
      message.success('Ticket closed successfully');
      setViewModalVisible(false);
      closeForm.resetFields();
      fetchTickets();
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to close ticket');
    }
  };

  const columns = [
    {
      title: 'Ticket ID',
      dataIndex: 'ticketId',
      key: 'ticketId',
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => <Tag>{category}</Tag>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = { Open: 'blue', 'In Progress': 'orange', Resolved: 'green', Closed: 'default' };
        return <Tag color={colors[status]}>{status}</Tag>;
      }
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button type="primary" ghost size="small" icon={<EyeOutlined />} onClick={() => handleViewTicket(record._id)}>
          View
        </Button>
      )
    }
  ];

  return (
    <Spin spinning={loading}>
      <div style={{ padding: '24px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <Title level={3}>My Support Tickets</Title>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setCreateModalVisible(true)}>
              Create Ticket
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={tickets}
            rowKey="_id"
            loading={loading}
            locale={{ emptyText: <Empty description="No tickets found" /> }}
          />
        </Card>

        <Modal
          title="Create Support Ticket"
          open={createModalVisible}
          onCancel={() => { setCreateModalVisible(false); form.resetFields(); }}
          footer={null}
          width={600}
        >
          <Form form={form} layout="vertical" onFinish={handleCreateTicket}>
            <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter a title' }]}>
              <Input placeholder="Brief description of your issue" />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter a description' }]}>
              <TextArea rows={4} placeholder="Provide detailed information about your issue" />
            </Form.Item>
            <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Please select a category' }]}>
              <Select placeholder="Select category">
                <Option value="Order Issue">Order Issue</Option>
                <Option value="Payment Problem">Payment Problem</Option>
                <Option value="Product Query">Product Query</Option>
                <Option value="Account Issue">Account Issue</Option>
                <Option value="Technical Support">Technical Support</Option>
                <Option value="General Inquiry">General Inquiry</Option>
              </Select>
            </Form.Item>
            <Form.Item name="priority" label="Priority" initialValue="Medium">
              <Select>
                <Option value="Low">Low</Option>
                <Option value="Medium">Medium</Option>
                <Option value="High">High</Option>
                <Option value="Critical">Critical</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">Create Ticket</Button>
                <Button onClick={() => { setCreateModalVisible(false); form.resetFields(); }}>Cancel</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title={`Ticket Details - ${selectedTicket?.ticketId}`}
          open={viewModalVisible}
          onCancel={() => setViewModalVisible(false)}
          footer={null}
          width={800}
        >
          {selectedTicket && (
            <div>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text strong>Category: </Text><Tag>{selectedTicket.category}</Tag>
                </Col>
                <Col span={12}>
                  <Text strong>Status: </Text>
                  <Tag color={selectedTicket.status === 'Open' ? 'blue' : selectedTicket.status === 'In Progress' ? 'orange' : selectedTicket.status === 'Resolved' ? 'green' : 'default'}>
                    {selectedTicket.status}
                  </Tag>
                </Col>
                <Col span={24}>
                  <Text strong>Title: </Text><Text>{selectedTicket.title}</Text>
                </Col>
                <Col span={24}>
                  <Text strong>Description: </Text><Paragraph>{selectedTicket.description}</Paragraph>
                </Col>
              </Row>
              
              <div style={{ marginTop: '24px' }}>
                <Title level={5}>Conversation</Title>
                <List
                  dataSource={selectedTicket.messages}
                  renderItem={(msg) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: msg.isAdminReply ? '#1890ff' : '#87d068' }}>{msg.sender.name.charAt(0)}</Avatar>}
                        title={
                          <Space>
                            <Text strong>{msg.sender.name}</Text>
                            {msg.isAdminReply && <Tag color="blue">Support</Tag>}
                            <Text type="secondary">{new Date(msg.timestamp).toLocaleString()}</Text>
                          </Space>
                        }
                        description={
                          <div style={{ padding: '8px 12px', backgroundColor: msg.isAdminReply ? '#f0f8ff' : '#f6ffed', borderRadius: '8px', marginTop: '8px' }}>
                            {msg.message}
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />

                {selectedTicket.status !== 'Closed' && (
                  <div style={{ marginTop: '16px' }}>
                    <Input.Group compact>
                      <Input
                        style={{ width: 'calc(100% - 100px)' }}
                        placeholder="Type your message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onPressEnter={handleSendMessage}
                      />
                      <Button type="primary" icon={<SendOutlined />} loading={sendingMessage} onClick={handleSendMessage} disabled={!messageText.trim()}>
                        Send
                      </Button>
                    </Input.Group>
                  </div>
                )}
              </div>

              {selectedTicket.status === 'Resolved' && (
                <div style={{ marginTop: '24px' }}>
                  <Title level={5}>Close Ticket</Title>
                  <Form form={closeForm} onFinish={handleCloseTicket}>
                    <Form.Item name="rating" label="Rate our support">
                      <Rate />
                    </Form.Item>
                    <Form.Item name="feedback" label="Feedback (optional)">
                      <TextArea rows={3} placeholder="Share your experience..." />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">Close Ticket</Button>
                    </Form.Item>
                  </Form>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </Spin>
  );
};

export default SupportTickets;