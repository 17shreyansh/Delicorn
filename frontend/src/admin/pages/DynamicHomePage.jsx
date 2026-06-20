import React, { useState, useEffect } from 'react';
import {
  Card, Form, Input, Button, Space, Typography, Row, Col, message,
  Tabs, ColorPicker, Spin, Upload, Modal, InputNumber, Switch
} from 'antd';
import {
  SaveOutlined, PlusOutlined, DeleteOutlined, EyeOutlined, UpOutlined, DownOutlined
} from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;
const { TextArea } = Input;

axios.defaults.withCredentials = true;
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const DynamicHomePage = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const [heroForm] = Form.useForm();
  const [jewelryForm] = Form.useForm();
  const [sliderForm] = Form.useForm();
  const [marqueeForm] = Form.useForm();
  const [ctaForm] = Form.useForm();
  const [jewelrySaleForm] = Form.useForm();

  const [heroFileList, setHeroFileList] = useState([]);
  const [jewelryFileList, setJewelryFileList] = useState([]);
  const [sliderFileList, setSliderFileList] = useState([]);
  const [ctaFile1List, setCtaFile1List] = useState([]);
  const [ctaFile2List, setCtaFile2List] = useState([]);
  const [jewelrySaleFile1List, setJewelrySaleFile1List] = useState([]);
  const [jewelrySaleFile2List, setJewelrySaleFile2List] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [hero, jewelry, slider, marquee, cta, jewelrySale] = await Promise.all([
        axios.get(`${API_BASE}/dynamic-home/hero`),
        axios.get(`${API_BASE}/dynamic-home/jewelry`),
        axios.get(`${API_BASE}/dynamic-home/slider`),
        axios.get(`${API_BASE}/dynamic-home/marquee`),
        axios.get(`${API_BASE}/dynamic-home/cta`),
        axios.get(`${API_BASE}/dynamic-home/jewelry-sale`)
      ]);

      heroForm.setFieldsValue(hero.data.data);
      jewelryForm.setFieldsValue(jewelry.data.data);
      ctaForm.setFieldsValue(cta.data.data);
      jewelrySaleForm.setFieldsValue(jewelrySale.data.data);
      
      const mData = marquee.data.data;
      marqueeForm.setFieldsValue({
        upperText: mData.upperMarquee?.text,
        upperBgColor: mData.upperMarquee?.backgroundColor,
        upperTextColor: mData.upperMarquee?.textColor,
        upperSpeed: mData.upperMarquee?.speed,
        upperActive: mData.upperMarquee?.isActive,
        lowerText: mData.lowerMarquee?.text,
        lowerBgColor: mData.lowerMarquee?.backgroundColor,
        lowerTextColor: mData.lowerMarquee?.textColor,
        lowerSpeed: mData.lowerMarquee?.speed,
        lowerActive: mData.lowerMarquee?.isActive
      });

      if (hero.data.data?.backgroundImage) {
        setHeroFileList([{
          uid: hero.data.data.backgroundImage,
          name: hero.data.data.backgroundImage.split('/').pop(),
          status: 'done',
          url: `${API_BASE.replace('/api', '')}${hero.data.data.backgroundImage}`
        }]);
      }

      if (jewelry.data.data?.backgroundImage) {
        setJewelryFileList([{
          uid: jewelry.data.data.backgroundImage,
          name: jewelry.data.data.backgroundImage.split('/').pop(),
          status: 'done',
          url: `${API_BASE.replace('/api', '')}${jewelry.data.data.backgroundImage}`
        }]);
      }

      if (slider.data.data?.images?.length > 0) {
        const files = slider.data.data.images.map(img => ({
          uid: img.url,
          name: img.alt,
          status: 'done',
          url: `${API_BASE.replace('/api', '')}${img.url}`,
          response: { url: img.url }
        }));
        setSliderFileList(files);
        sliderForm.setFieldsValue({ images: slider.data.data.images });
      }

      if (cta.data.data?.image1) {
        setCtaFile1List([{
          uid: cta.data.data.image1,
          name: cta.data.data.image1.split('/').pop(),
          status: 'done',
          url: `${API_BASE.replace('/api', '')}${cta.data.data.image1}`
        }]);
      }
      if (cta.data.data?.image2) {
        setCtaFile2List([{
          uid: cta.data.data.image2,
          name: cta.data.data.image2.split('/').pop(),
          status: 'done',
          url: `${API_BASE.replace('/api', '')}${cta.data.data.image2}`
        }]);
      }

      if (jewelrySale.data.data?.image1) {
        setJewelrySaleFile1List([{
          uid: jewelrySale.data.data.image1,
          name: jewelrySale.data.data.image1.split('/').pop(),
          status: 'done',
          url: `${API_BASE.replace('/api', '')}${jewelrySale.data.data.image1}`
        }]);
      }
      if (jewelrySale.data.data?.image2) {
        setJewelrySaleFile2List([{
          uid: jewelrySale.data.data.image2,
          name: jewelrySale.data.data.image2.split('/').pop(),
          status: 'done',
          url: `${API_BASE.replace('/api', '')}${jewelrySale.data.data.image2}`
        }]);
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
      console.log('Saving to endpoint:', endpoint);
      console.log('Values:', values);
      console.log('FileList:', fileList);
      
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
          } else if (key === 'isActive' && typeof values[key] === 'boolean') {
            formData.append(key, values[key]);
          } else {
            formData.append(key, values[key]);
          }
        }
      }

      let hasNewFile = false;
      if (Array.isArray(fileField)) {
        fileField.forEach(config => {
          config.list.forEach(file => {
            if (file.originFileObj) {
              formData.append(config.field, file.originFileObj);
              hasNewFile = true;
            }
          });
        });
      } else {
        fileList.forEach(file => {
          if (file.originFileObj) {
            formData.append(fileField, file.originFileObj);
            hasNewFile = true;
          }
        });
      }

      console.log('Has new file:', hasNewFile);
      console.log('FormData entries:');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }

      const response = await axios.put(`${API_BASE}/dynamic-home/${endpoint}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log('Response:', response.data);
      message.success(response.data.message || 'Updated successfully');
      await fetchAllData();
    } catch (error) {
      console.error('Save error:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Failed to save';
      message.error(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  const HeroEditor = () => (
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
              <Upload 
                listType="picture-card" 
                fileList={heroFileList} 
                onPreview={handlePreview}
                beforeUpload={(file) => {
                  const isImage = file.type.startsWith('image/');
                  if (!isImage) {
                    message.error('You can only upload image files!');
                    return Upload.LIST_IGNORE;
                  }
                  const isLt5M = file.size / 1024 / 1024 < 5;
                  if (!isLt5M) {
                    message.error('Image must be smaller than 5MB!');
                    return Upload.LIST_IGNORE;
                  }
                  return false;
                }}
                onChange={({ fileList }) => setHeroFileList(fileList)} 
                maxCount={1}
                accept="image/*">
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
  );

  const JewelryEditor = () => (
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
              <Upload 
                listType="picture-card" 
                fileList={jewelryFileList} 
                onPreview={handlePreview}
                beforeUpload={(file) => {
                  const isImage = file.type.startsWith('image/');
                  if (!isImage) {
                    message.error('You can only upload image files!');
                    return Upload.LIST_IGNORE;
                  }
                  const isLt5M = file.size / 1024 / 1024 < 5;
                  if (!isLt5M) {
                    message.error('Image must be smaller than 5MB!');
                    return Upload.LIST_IGNORE;
                  }
                  return false;
                }}
                onChange={({ fileList }) => setJewelryFileList(fileList)} 
                maxCount={1}
                accept="image/*">
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
  );

  const SliderEditor = () => (
    <Card title="Slider Section" extra={
      <Button type="primary" icon={<SaveOutlined />} loading={saving}
        onClick={() => sliderForm.validateFields().then(v => handleSave('slider', v, sliderFileList, 'images'))}>
        Save
      </Button>
    }>
      <Form form={sliderForm} layout="vertical">
        <Form.Item label="Slider Images (Max 10)" help="Recommended: 800x1000px, Max 5MB each">
          <Upload 
            listType="picture-card" 
            fileList={sliderFileList} 
            onPreview={handlePreview}
            beforeUpload={(file) => {
              const isImage = file.type.startsWith('image/');
              if (!isImage) {
                message.error('You can only upload image files!');
                return Upload.LIST_IGNORE;
              }
              const isLt5M = file.size / 1024 / 1024 < 5;
              if (!isLt5M) {
                message.error('Image must be smaller than 5MB!');
                return Upload.LIST_IGNORE;
              }
              return false;
            }}
            multiple 
            maxCount={10}
            accept="image/*"
            onChange={({ fileList }) => {
              if (fileList.length > 10) {
                message.warning('Maximum 10 images allowed');
                return;
              }
              setSliderFileList(fileList);
              const imgs = fileList.map((f, i) => ({
                url: f.url?.replace(API_BASE.replace('/api', ''), '') || f.uid,
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
  );

  const MarqueeEditor = () => (
    <Card title="Promo Marquees">
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        {/* Upper Marquee */}
        <Card type="inner" title="Upper Marquee (Before Hero)" extra={
          <Button type="primary" icon={<SaveOutlined />} loading={saving}
            onClick={() => {
              const values = marqueeForm.getFieldsValue();
              const upperData = {
                upperMarquee: {
                  text: values.upperText,
                  backgroundColor: values.upperBgColor,
                  textColor: values.upperTextColor,
                  speed: values.upperSpeed,
                  isActive: values.upperActive
                }
              };
              handleSave('marquee', upperData, []);
            }}>
            Save Upper
          </Button>
        }>
          <Form form={marqueeForm} layout="vertical">
            <Row gutter={16}>
              <Col xs={24}>
                <Form.Item name="upperText" label="Text" rules={[{ required: true }]}>
                  <Input placeholder="Free Shipping on Orders Above ₹999" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={8}>
                <Form.Item name="upperBgColor" label="Background"
                  getValueFromEvent={(c) => c?.toHexString()}
                  getValueProps={(v) => ({ value: v || '#0d4b4b' })}>
                  <ColorPicker showText />
                </Form.Item>
              </Col>
              <Col xs={24} lg={8}>
                <Form.Item name="upperTextColor" label="Text Color"
                  getValueFromEvent={(c) => c?.toHexString()}
                  getValueProps={(v) => ({ value: v || '#ffffff' })}>
                  <ColorPicker showText />
                </Form.Item>
              </Col>
              <Col xs={24} lg={4}>
                <Form.Item name="upperSpeed" label="Speed">
                  <InputNumber min={1} max={20} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col xs={24} lg={4}>
                <Form.Item name="upperActive" label="Active" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        {/* Lower Marquee */}
        <Card type="inner" title="Lower Marquee (After Hero)" extra={
          <Button type="primary" icon={<SaveOutlined />} loading={saving}
            onClick={() => {
              const values = marqueeForm.getFieldsValue();
              const lowerData = {
                lowerMarquee: {
                  text: values.lowerText,
                  backgroundColor: values.lowerBgColor,
                  textColor: values.lowerTextColor,
                  speed: values.lowerSpeed,
                  isActive: values.lowerActive
                }
              };
              handleSave('marquee', lowerData, []);
            }}>
            Save Lower
          </Button>
        }>
          <Form form={marqueeForm} layout="vertical">
            <Row gutter={16}>
              <Col xs={24}>
                <Form.Item name="lowerText" label="Text" rules={[{ required: true }]}>
                  <Input placeholder="4L+ Happy Customers | Gifts @ 50% OFF" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={8}>
                <Form.Item name="lowerBgColor" label="Background"
                  getValueFromEvent={(c) => c?.toHexString()}
                  getValueProps={(v) => ({ value: v || '#0d4b4b' })}>
                  <ColorPicker showText />
                </Form.Item>
              </Col>
              <Col xs={24} lg={8}>
                <Form.Item name="lowerTextColor" label="Text Color"
                  getValueFromEvent={(c) => c?.toHexString()}
                  getValueProps={(v) => ({ value: v || '#ffffff' })}>
                  <ColorPicker showText />
                </Form.Item>
              </Col>
              <Col xs={24} lg={4}>
                <Form.Item name="lowerSpeed" label="Speed">
                  <InputNumber min={1} max={20} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col xs={24} lg={4}>
                <Form.Item name="lowerActive" label="Active" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Space>
    </Card>
  );

  const CTAEditor = () => (
    <Card title="Adorn Yourself (CTA)" extra={
      <Button type="primary" icon={<SaveOutlined />} loading={saving}
        onClick={() => ctaForm.validateFields().then(v => handleSave('cta', v, null, [
          { list: ctaFile1List, field: 'image1' },
          { list: ctaFile2List, field: 'image2' }
        ]))}>
        Save
      </Button>
    }>
      <Form form={ctaForm} layout="vertical">
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input placeholder="Adorn Yourself with Timeless Beauty" />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item name="description1" label="Description 1" rules={[{ required: true }]}>
              <Input placeholder="Discover the perfect blend..." />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item name="description2" label="Description 2" rules={[{ required: true }]}>
              <Input placeholder="From sacred Ashta Dhatu..." />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item name="description3" label="Description 3" rules={[{ required: true }]}>
              <Input placeholder="Find pieces that reflect..." />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item label="Image 1 (Main)">
              <Upload listType="picture-card" fileList={ctaFile1List} onPreview={handlePreview}
                beforeUpload={(file) => { setCtaFile1List([file]); return false; }}
                onChange={({ fileList }) => setCtaFile1List(fileList)} maxCount={1}>
                {ctaFile1List.length < 1 && <div><PlusOutlined /><div>Upload</div></div>}
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item label="Image 2 (Overlay)">
              <Upload listType="picture-card" fileList={ctaFile2List} onPreview={handlePreview}
                beforeUpload={(file) => { setCtaFile2List([file]); return false; }}
                onChange={({ fileList }) => setCtaFile2List(fileList)} maxCount={1}>
                {ctaFile2List.length < 1 && <div><PlusOutlined /><div>Upload</div></div>}
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
              <Input placeholder="/products" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );

  const JewelrySaleEditor = () => (
    <Card title="Jewelry Sale" extra={
      <Button type="primary" icon={<SaveOutlined />} loading={saving}
        onClick={() => jewelrySaleForm.validateFields().then(v => handleSave('jewelry-sale', v, null, [
          { list: jewelrySaleFile1List, field: 'image1' },
          { list: jewelrySaleFile2List, field: 'image2' }
        ]))}>
        Save
      </Button>
    }>
      <Form form={jewelrySaleForm} layout="vertical">
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <Form.Item label="Banner Image (Left)">
              <Upload listType="picture-card" fileList={jewelrySaleFile1List} onPreview={handlePreview}
                beforeUpload={(file) => { setJewelrySaleFile1List([file]); return false; }}
                onChange={({ fileList }) => setJewelrySaleFile1List(fileList)} maxCount={1}>
                {jewelrySaleFile1List.length < 1 && <div><PlusOutlined /><div>Upload</div></div>}
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item label="Model Image (Right)">
              <Upload listType="picture-card" fileList={jewelrySaleFile2List} onPreview={handlePreview}
                beforeUpload={(file) => { setJewelrySaleFile2List([file]); return false; }}
                onChange={({ fileList }) => setJewelrySaleFile2List(fileList)} maxCount={1}>
                {jewelrySaleFile2List.length < 1 && <div><PlusOutlined /><div>Upload</div></div>}
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
              <Input placeholder="/products" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );

  const tabs = [
    { label: 'Hero Section', key: '1', children: <HeroEditor /> },
    { label: 'Jewelry Banner', key: '2', children: <JewelryEditor /> },
    { label: 'Slider', key: '3', children: <SliderEditor /> },
    { label: 'Promo Marquee', key: '4', children: <MarqueeEditor /> },
    { label: 'Adorn Yourself (CTA)', key: '5', children: <CTAEditor /> },
    { label: 'Jewelry Sale', key: '6', children: <JewelrySaleEditor /> }
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <Card style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={2} style={{ margin: 0 }}>Dynamic Home Page Editor</Title>
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

export default DynamicHomePage;
