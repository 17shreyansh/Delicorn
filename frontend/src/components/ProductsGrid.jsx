import React, { useState } from 'react';
import { Row, Col, Select, Typography, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ProductCard from './ProductCard';
import { allProducts } from '../data/products';

const { Title } = Typography;
const { Option } = Select;

const ProductsGrid = () => {
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f8f9fa' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
          All Products
        </Title>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <Input
            placeholder="Search products..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 300 }}
          />
          
          <Space>
            <Select
              value={filterCategory}
              onChange={setFilterCategory}
              style={{ width: 150 }}
            >
              <Option value="all">All Categories</Option>
              <Option value="ashta-dhatu">Ashta Dhatu</Option>
              <Option value="fashion-jewelry">Fashion Jewelry</Option>
            </Select>
            
            <Select
              value={sortBy}
              onChange={setSortBy}
              style={{ width: 150 }}
            >
              <Option value="name">Name</Option>
              <Option value="price-low">Price: Low to High</Option>
              <Option value="price-high">Price: High to Low</Option>
              <Option value="rating">Rating</Option>
            </Select>
          </Space>
        </div>

        <Row gutter={[24, 24]}>
          {sortedProducts.map(product => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>

        {sortedProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <Title level={4} type="secondary">
              No products found matching your criteria
            </Title>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsGrid;