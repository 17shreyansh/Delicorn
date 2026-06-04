import React, { useState, useEffect } from 'react';
import {
  Card, Form, Input, Button, Space, Typography, Row, Col, message,
  Tabs, ColorPicker, Spin, Upload, Modal, InputNumber, Switch
} from 'antd';
import {
  SaveOutlined, PlusOutlined, DeleteOutlined
} from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;
const { TextArea } = Input;

axios.defaults.withCredentials = true;
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const UnifiedHomePage = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const [heroForm] = Form.useForm();
  const [jewelryForm] = Form.useForm();
  const [sliderForm] = Form.useForm();
  const [marqueeForm] = Form.useForm();

  const [heroFileList, setHeroFileList] = useState([]);
  const [jewelryFileList, setJewelryFileList] = useState([]);
  const [sliderFileList, setSliderFileList] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [hero, jewelry, slider, marquee] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/dynamic-home/hero`).catch(() => ({ data: { data: null } })),
        axios.get(`${API_BASE_URL}/api/dynamic-home/jewelry`).catch(() => ({ data: { data: null } })),
        axios.get(`${API_BASE_URL}/api/dynamic-home/slider`).catch(() => ({ data: { data: null } })),
        axios.get(`${API_BASE_URL}/api/dynamic-home/marquee`).catch(() => ({ data: { data: null } }))
      ]);

      if (hero.data.data) heroForm.setFieldsValue(hero.data.data);
      if (jewelry.data.data) jewelryForm.setFieldsValue(jewelry.data.data);
      if (marquee.data.data) marqueeForm.setFieldsValue(marquee.data.data);

      if (hero.data.data?.backgroundImage) {
        setHeroFileList([{
          uid: hero.data.data.backgroundImage,
          name: hero.data.data.backgroundImage.split('/').pop(),
          status: 'done',
          url: `${API_BASE_URL}${hero.data.data.backgroundImage}`
        }]);
      }

      if (jewelry.data.data?.backgroundImage) {
        setJewelryFileList([{
          uid: jewelry.data.data.backgroundImage,
          name: jewelry.data.data.backgroundImage.split('/').pop(),
          status: 'done',
          url: `${API_BASE_URL}${jewelry.data.data.backgroundImage}`
        }]);
      }

      if (slider.data.data?.images?.length > 0) {
        const files = slider.data.data.images.map(img => ({
          uid: img.url,
          name: img.alt,
          status: 'done',
          url: `${API_BASE_URL}${img.url}`
        }));
        setSliderFileList(files);
        sliderForm.setFieldsValue({ images: slider.data.data.images });
      }

    } catch (error) {
      message.error('Failed to fetch data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleSave = async (endpoint, values, fileList = [], fileField = 'backgroundImage') => {
    setSaving(true);
    try {
      const formData = new FormData();

      for (const key in values) {
        if (values[key] !== undefined && values[key] !== null) {
          if (typeof values[key] === 'object' && values[key] && 'toHexString' in values[key]) {
            formData.append(key, values[key].toHexString());
          } else if (key === 'images' && Array.isArray(values[key])) {
            values[key].forEach((item, index) => {
              formData.append(`images[${index}][alt]`, item.alt || `Image ${index + 1}`);
              formData.append(`images[${index}][order]`, item.order || index + 1);
              if (item.url && !item.url.startsWith('rc-upload-')) {
                formData.append(`images[${index}][url]`, item.url);
              }
            });
          } else {
            formData.append(key, values[key]);
          }
        }
      }

      fileList.forEach(file => {
        if (file.originFileObj) {
          formData.append(fileField, file.originFileObj);
        }
      });

      const response = await axios.put(`${API_BASE_URL}/api/dynamic-home/${endpoint}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      message.success(response.data.message || 'Updated successfully');
      await fetchAllData();
    } catch (error) {
      console.error('Save error:', error);
      message.error(error.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const validateUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('Only image files allowed!');
      return Upload.LIST_IGNORE;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must be smaller than 5MB!');
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const tabs = [
    {
      label: 'Hero Section',
      key: '1',
      children: (
        <Card title="Hero Section" extra={
          <Button type="primary" icon={<SaveOutlined />} loading={saving}
            onClick={() => heroForm.validateFields().then(v => handleSave('hero', v, heroFileList))}>
            Save
          </Button>
        }>
          <Form form={heroForm} layout="vertical">
            <Row gutter={16}>
              <Col xs={24} lg={12}>
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                  <Input placeholder="Discover Exquisite Jewelry" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item name="subtitle" label="Subtitle" rules={[{ required: true }]}>
                  <TextArea rows={3} placeholder="Premium jewelry..." />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item label="Background Image" help="Recommended: 1920x1080px, Max 5MB">
                  <Upload listType="picture-card" fileList={heroFileList} onPreview={handlePreview}
                    beforeUpload={validateUpload} onChange={({ fileList }) => setHeroFileList(fileList)} maxCount={1} accept="image/*">
                    {heroFileList.length < 1 && <div><PlusOutlined /><div style={{ marginTop: 8 }}>Upload</div></div>}
                  </Upload>
                </Form.Item>
              </Col>
              <Col xs={24} lg={6}>
                <Form.Item name="primaryButtonText" label="Primary Button">
                  <Input placeholder="Shop Now" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={6}>
                <Form.Item name="primaryButtonLink" label="Primary Link">
                  <Input placeholder="/shop" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={6}>
                <Form.Item name="secondaryButtonText" label="Secondary Button">
                  <Input placeholder="View Collections" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={6}>
                <Form.Item name="secondaryButtonLink" label="Secondary Link">
                  <Input placeholder="/collections" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      )
    },
    {
      label: 'Jewelry Banner',
      key: '2',
      children: (
        <Card title="Jewelry Banner" extra={
          <Button type="primary" icon={<SaveOutlined />} loading={saving}
            onClick={() => jewelryForm.validateFields().then(v => handleSave('jewelry', v, jewelryFileList))}>
            Save
          </Button>
        }>
          <Form form={jewelryForm} layout="vertical">
            <Row gutter={16}>
              <Col xs={24} lg={12}>
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                  <TextArea rows={2} placeholder="Join Our Jewellery Circle" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                  <TextArea rows={2} placeholder="Get 10% OFF..." />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item label="Background Image" help="Recommended: 1920x680px, Max 5MB">
                  <Upload listType="picture-card" fileList={jewelryFileList} onPreview={handlePreview}
                    beforeUpload={validateUpload} onChange={({ fileList }) => setJewelryFileList(fileList)} maxCount={1} accept="image/*">
                    {jewelryFileList.length < 1 && <div><PlusOutlined /><div style={{ marginTop: 8 }}>Upload</div></div>}
                  </Upload>
                </Form.Item>
              </Col>
              <Col xs={24} lg={6}>
                <Form.Item name="buttonText" label="Button Text">
                  <Input placeholder="Shop Now" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={6}>
                <Form.Item name="buttonLink" label="Button Link">
                  <Input placeholder="/shop" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      )
    },
    {
      label: 'Slider',
      key: '3',
      children: (
        <Card title="Image Slider" extra={
          <Button type="primary" icon={<SaveOutlined />} loading={saving}
            onClick={() => sliderForm.validateFields().then(v => handleSave('slider', v, sliderFileList, 'images'))}>
            Save
          </Button>
        }>
          <Form form={sliderForm} layout="vertical">
            <Form.Item label="Slider Images (Max 10)" help="Recommended: 800x1000px, Max 5MB each">
              <Upload listType="picture-card" fileList={sliderFileList} onPreview={handlePreview}
                beforeUpload={validateUpload} multiple maxCount={10} accept="image/*"
                onChange={({ fileList }) => {
                  if (fileList.length > 10) {
                    message.warning('Maximum 10 images allowed');
                    return;
                  }
                  setSliderFileList(fileList);
                  const imgs = fileList.map((f, i) => ({
                    url: f.url?.replace(API_BASE_URL, '') || f.uid,
                    alt: f.name?.split('.')[0] || `Slide ${i + 1}`,
                    order: i + 1
                  }));
                  sliderForm.setFieldsValue({ images: imgs });
                }}>
                {sliderFileList.length < 10 && <div><PlusOutlined /><div style={{ marginTop: 8 }}>Upload</div></div>}
              </Upload>
            </Form.Item>
            <Form.List name="images">
              {(fields) => (
                <>
                  {sliderFileList.map((file, index) => {
                    const field = fields[index];
                    if (!field) return null;
                    return (
                      <Card key={field.key} size="small" style={{ marginBottom: 16 }}>
                        <Row gutter={16} align="middle">
                          <Col span={12}>
                            <Form.Item {...field} name={[field.name, 'alt']} label="Alt Text" rules={[{ required: true }]}>
                              <Input placeholder="Description" />
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Form.Item {...field} name={[field.name, 'order']} label="Order">
                              <InputNumber min={1} style={{ width: '100%' }} />
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Button danger icon={<DeleteOutlined />} onClick={() => {
                              const newList = sliderFileList.filter((_, i) => i !== index);
                              setSliderFileList(newList);
                              const imgs = sliderForm.getFieldValue('images').filter((_, i) => i !== index);
                              sliderForm.setFieldsValue({ images: imgs });
                            }} style={{ marginTop: 30 }}>
                              Remove
                            </Button>
                          </Col>
                        </Row>
                      </Card>
                    );
                  })}
                </>
              )}
            </Form.List>
          </Form>
        </Card>
      )
    },
    {
      label: 'Promo Marquee',
      key: '4',
      children: (
        <Card title="Promo Marquee" extra={
          <Button type="primary" icon={<SaveOutlined />} loading={saving}
            onClick={() => marqueeForm.validateFields().then(v => handleSave('marquee', v, []))}>
            Save
          </Button>
        }>
          <Form form={marqueeForm} layout="vertical">
            <Row gutter={16}>
              <Col xs={24}>
                <Form.Item name="text" label="Marquee Text" rules={[{ required: true }]}>
                  <Input placeholder="4L+ Happy Customers | Gifts @ 50% OFF" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={8}>
                <Form.Item name="backgroundColor" label="Background"
                  getValueFromEvent={(c) => c?.toHexString()}
                  getValueProps={(v) => ({ value: v || '#0d4b4b' })}>
                  <ColorPicker showText />
                </Form.Item>
              </Col>
              <Col xs={24} lg={8}>
                <Form.Item name="textColor" label="Text Color"
                  getValueFromEvent={(c) => c?.toHexString()}
                  getValueProps={(v) => ({ value: v || '#ffffff' })}>
                  <ColorPicker showText />
                </Form.Item>
              </Col>
              <Col xs={24} lg={4}>
                <Form.Item name="speed" label="Speed">
                  <InputNumber min={1} max={20} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col xs={24} lg={4}>
                <Form.Item name="isActive" label="Active" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      )
    }
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <Card style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={2} style={{ margin: 0 }}>Homepage Manager</Title>
            <Button type="primary" onClick={fetchAllData} loading={loading}>Refresh</Button>
          </div>
        </Card>

        <Spin spinning={loading}>
          <Tabs items={tabs} />
        </Spin>

        <Modal open={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)} width="90%">
          <img alt="preview" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    </div>
  );
};

export default UnifiedHomePage;
