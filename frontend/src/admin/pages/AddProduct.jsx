import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Upload,
  Switch,
  Row,
  Col,
  Card,
  message,
  Space,
  Tabs,
  Divider,
} from 'antd';
import {
  SaveOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  InfoCircleOutlined,
  BulbOutlined,
  PictureOutlined,
} from '@ant-design/icons';
import apiService from '../../services/api';

const { TextArea } = Input;
const { Option } = Select;

const AddProduct = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productType = searchParams.get('type') || 'ashta-dhatu';
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [galleryFileList, setGalleryFileList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    form.setFieldsValue({
      productType: productType,
      isActive: true,
      isFeatured: false,
    });
    fetchCategories();
  }, [productType, form]);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await apiService.getCategories();
      const allCategories = response.data || [];
      
      // Filter categories by current product type
      const filteredCategories = allCategories.filter(
        cat => cat.productType === productType
      );
      
      setCategories(filteredCategories);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      message.error('Failed to load categories');
    } finally {
      setLoadingCategories(false);
    }
  };

  const onFinish = async (values) => {
    setSaving(true);
    try {
      let mainImageUrl = null;
      if (fileList.length > 0) {
        const mainFile = fileList[0];
        if (mainFile.response?.url) {
          mainImageUrl = mainFile.response.url;
        }
      }

      const galleryImageUrls = galleryFileList
        .filter(file => file.response?.url)
        .map(file => file.response.url);

      const productData = {
        ...values,
        mainImage: mainImageUrl,
        image: mainImageUrl,
        galleryImages: galleryImageUrls,
      };

      await apiService.createProduct(productData);
      message.success('Product created successfully!');
      
      if (productType === 'ashta-dhatu') {
        navigate('/admin/ashta-dhatu-products');
      } else {
        navigate('/admin/fashion-jewelry-products');
      }
    } catch (error) {
      message.error('Failed to create product');
    } finally {
      setSaving(false);
    }
  };

  const customRequest = async (options) => {
    const { file, onSuccess, onError } = options;
    try {
      const response = await apiService.uploadImage(file);
      // Ensure response has the correct structure
      const result = response.data ? response : { url: response.url };
      onSuccess(result, file);
      message.success(`${file.name} uploaded successfully!`);
    } catch (error) {
      onError(error);
      message.error(`${file.name} upload failed`);
    }
  };

  const handleMainImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleGalleryImageChange = ({ fileList: newFileList }) => {
    setGalleryFileList(newFileList);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    const previewUrl = file.url || file.preview;
    if (previewUrl) {
      window.open(previewUrl, '_blank');
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const getBackPath = () => {
    return productType === 'ashta-dhatu' ? '/admin/ashta-dhatu-products' : '/admin/fashion-jewelry-products';
  };

  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Card>
        <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate(getBackPath())}
          >
            Back to Products
          </Button>
          <h2 style={{ margin: 0 }}>
            Add New {productType === 'ashta-dhatu' ? 'Ashta Dhatu' : 'Fashion Jewelry'} Product
          </h2>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          size="large"
          initialValues={{
            productType: productType,
            isActive: true,
            isFeatured: false,
          }}
        >
          <Tabs defaultActiveKey="1" items={[
            {
              key: '1',
              label: (<span><InfoCircleOutlined /> Basic Info</span>),
              children: (
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      label="Product Name"
                      name="name"
                      rules={[{ required: true, message: 'Please enter product name' }]}
                    >
                      <Input placeholder="e.g., Gold Plated Ring" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Product Slug"
                      name="slug"
                      rules={[{ pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, message: 'Slug must be lowercase alphanumeric with hyphens'}]}
                    >
                      <Input placeholder="e.g., gold-plated-ring (auto-generated if empty)" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Description" name="description">
                      <TextArea rows={4} placeholder="Detailed description of the product..." />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Price (₹)"
                      name="price"
                      rules={[{ required: true, message: 'Please enter price' }]}
                    >
                      <InputNumber min={0} step={0.01} style={{ width: '100%' }} placeholder="e.g., 99.99" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Original Price (₹)"
                      name="originalPrice"
                    >
                      <InputNumber min={0} step={0.01} style={{ width: '100%' }} placeholder="e.g., 149.99" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Category"
                      name="categories"
                      rules={[{ required: true, message: 'Please select at least one category' }]}
                    >
                      <Select 
                        mode="multiple"
                        placeholder="Select categories"
                        loading={loadingCategories}
                        showSearch
                        filterOption={(input, option) =>
                          option.children.toLowerCase().includes(input.toLowerCase())
                        }
                      >
                        {categories.map(cat => (
                          <Option key={cat._id} value={cat._id}>
                            {cat.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Product Type"
                      name="productType"
                      rules={[{ required: true, message: 'Please select product type' }]}
                    >
                      <Select placeholder="Select product type" disabled>
                        <Option value="ashta-dhatu">Ashta Dhatu</Option>
                        <Option value="fashion-jewelry">Fashion Jewelry</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              ),
            },
            {
              key: '2',
              label: (<span><BulbOutlined /> Attributes & Stock</span>),
              children: (
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item label="Material" name="material">
                      <TextArea rows={2} placeholder={productType === 'ashta-dhatu' ? 'e.g., Gold, Silver, Ashta Dhatu' : 'e.g., Sterling Silver, Stainless Steel, Alloy'} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Available Colors" name="availableColors">
                      <TextArea rows={2} placeholder="e.g., Gold, Silver, Rose Gold, Black" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Metal Details" name="metalDetails">
                      <TextArea rows={3} placeholder="Add metal details (one per line or comma separated)" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Benefits" name="benefits">
                      <TextArea rows={3} placeholder="Add product benefits (one per line or comma separated)" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Spiritual Benefits" name="spiritualBenefits">
                      <TextArea rows={3} placeholder="Add spiritual benefits (one per line or comma separated)" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Divider orientation="left">Size Variants</Divider>
                    <Form.List name="sizeVariants">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <Row key={key} gutter={16} align="middle" style={{ marginBottom: 8 }}>
                              <Col xs={24} sm={10}>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'size']}
                                  label="Size"
                                  rules={[{ required: true, message: 'Size required' }]}
                                >
                                  <Input placeholder="e.g., Small, 7, One Size" style={{ width: '100%' }} />
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={10}>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'stock']}
                                  label="Stock"
                                  rules={[{ required: true, message: 'Stock required' }]}
                                >
                                  <InputNumber min={0} placeholder="Stock" style={{ width: '100%' }} />
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={4}>
                                <Button
                                  type="text"
                                  danger
                                  icon={<MinusCircleOutlined />}
                                  onClick={() => remove(name)}
                                  style={{ marginTop: 30 }}
                                />
                              </Col>
                            </Row>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Add Size Variant
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Featured Product" name="isFeatured" valuePropName="checked">
                      <Switch checkedChildren="Yes" unCheckedChildren="No" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Product Active" name="isActive" valuePropName="checked">
                      <Switch checkedChildren="Yes" unCheckedChildren="No" />
                    </Form.Item>
                  </Col>
                </Row>
              ),
            },
            {
              key: '3',
              label: (<span><PictureOutlined /> Images</span>),
              children: (
                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      label="Main Product Image"
                      extra="Upload the main product image. Only one image is allowed."
                    >
                      <Upload
                        name="image"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleMainImageChange}
                        onPreview={handlePreview}
                        customRequest={customRequest}
                        maxCount={1}
                        accept=".png,.jpeg,.jpg,.gif"
                      >
                        {fileList.length < 1 && (
                          <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload Main</div>
                          </div>
                        )}
                      </Upload>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Gallery Images"
                      extra="Upload multiple gallery images. Maximum 5 images."
                    >
                      <Upload
                        name="image"
                        listType="picture-card"
                        fileList={galleryFileList}
                        onChange={handleGalleryImageChange}
                        onPreview={handlePreview}
                        customRequest={customRequest}
                        maxCount={5}
                        multiple
                        accept=".png,.jpeg,.jpg,.gif"
                      >
                        {galleryFileList.length < 5 && (
                          <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload Gallery</div>
                          </div>
                        )}
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>
              ),
            },
          ]} />
          
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Space>
              <Button onClick={() => navigate(getBackPath())}>
                Cancel
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={saving}
                icon={<SaveOutlined />}
                size="large"
              >
                {saving ? 'Creating...' : 'Create Product'}
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AddProduct;