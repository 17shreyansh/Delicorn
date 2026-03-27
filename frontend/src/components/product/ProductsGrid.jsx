import React, { useState, useEffect } from 'react';
import { Row, Col, Select, Typography, Input, Space, Spin, Empty, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import apiService from '../../services/api';

const { Title } = Typography;
const { Option } = Select;

const ProductsGrid = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterBrand, setFilterBrand] = useState('all');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);

  // Parse URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search') || '';
    const category = params.get('category') || 'all';
    const brand = params.get('brand') || 'all';
    const sort = params.get('sort') || 'name';
    
    setSearchTerm(search);
    setFilterCategory(category);
    setFilterBrand(brand);
    setSortBy(sort);
  }, [location.search]);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesData, brandsData] = await Promise.all([
          apiService.getCategories(),
          apiService.getBrands()
        ]);
        setCategories(categoriesData.data || []);
        setBrands(brandsData.data || []);
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
        setCategories([]);
        setBrands([]);
      }
    };
    fetchInitialData();
  }, []);

  // Fetch products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const filters = {};
        if (searchTerm) filters.search = searchTerm;
        if (filterCategory !== 'all') filters.category = filterCategory;
        if (filterBrand !== 'all') filters.brand = filterBrand;
        if (sortBy) filters.sortBy = sortBy;
        
        const response = await apiService.getProducts(filters);
        const fetchedProducts = response.data || [];
        setProducts(fetchedProducts);
        setTotalProducts(fetchedProducts.length);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
        setTotalProducts(0);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchTerm, filterCategory, filterBrand, sortBy]);

  // Update URL when filters change
  const updateURL = (newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.category && newFilters.category !== 'all') params.set('category', newFilters.category);
    if (newFilters.brand && newFilters.brand !== 'all') params.set('brand', newFilters.brand);
    if (newFilters.sort && newFilters.sort !== 'name') params.set('sort', newFilters.sort);
    
    const newURL = params.toString() ? `${location.pathname}?${params.toString()}` : location.pathname;
    navigate(newURL, { replace: true });
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    updateURL({ search: value, category: filterCategory, brand: filterBrand, sort: sortBy });
  };

  const handleCategoryChange = (value) => {
    setFilterCategory(value);
    updateURL({ search: searchTerm, category: value, brand: filterBrand, sort: sortBy });
  };

  const handleBrandChange = (value) => {
    setFilterBrand(value);
    updateURL({ search: searchTerm, category: filterCategory, brand: value, sort: sortBy });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    updateURL({ search: searchTerm, category: filterCategory, brand: filterBrand, sort: value });
  };

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f8f9fa' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
          {searchTerm ? `Search Results for "${searchTerm}"` : 'All Products'}
        </Title>
        
        {totalProducts > 0 && (
          <div style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>
            Showing {products.length} of {totalProducts} products
          </div>
        )}
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <Input
            placeholder="Search products, categories, brands..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
          
          <Space wrap>
            <Select
              value={filterCategory}
              onChange={handleCategoryChange}
              style={{ width: 150 }}
              placeholder="Category"
            >
              <Option value="all">All Categories</Option>
              {categories.map(category => (
                <Option key={category._id || category.id} value={category.slug || category.name.toLowerCase()}>
                  {category.name}
                </Option>
              ))}
            </Select>
            
            <Select
              value={filterBrand}
              onChange={handleBrandChange}
              style={{ width: 150 }}
              placeholder="Brand"
            >
              <Option value="all">All Brands</Option>
              {brands.map(brand => (
                <Option key={brand._id || brand.id} value={brand.slug || brand.name.toLowerCase()}>
                  {brand.name}
                </Option>
              ))}
            </Select>
            
            <Select
              value={sortBy}
              onChange={handleSortChange}
              style={{ width: 150 }}
            >
              <Option value="name">Name A-Z</Option>
              <Option value="price-low">Price: Low to High</Option>
              <Option value="price-high">Price: High to Low</Option>
              <Option value="rating">Highest Rated</Option>
              <Option value="newest">Newest First</Option>
            </Select>
          </Space>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {products.map(product => (
              <Col xs={24} sm={12} md={8} lg={6} key={product.id || product._id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}

        {!loading && products.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <Empty
              description={
                searchTerm 
                  ? `No products found for "${searchTerm}"` 
                  : 'No products found matching your criteria'
              }
            >
              {searchTerm && (
                <p style={{ color: '#999', marginTop: '10px', marginBottom: '20px' }}>
                  Try adjusting your search terms or filters
                </p>
              )}
              <Button 
                type="primary" 
                onClick={() => {
                  setSearchTerm('');
                  setFilterCategory('all');
                  setFilterBrand('all');
                  updateURL({ search: '', category: 'all', brand: 'all', sort: sortBy });
                }}
                style={{
                  background: '#114D4D',
                  borderColor: '#114D4D'
                }}
              >
                Clear Filters
              </Button>
            </Empty>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsGrid;