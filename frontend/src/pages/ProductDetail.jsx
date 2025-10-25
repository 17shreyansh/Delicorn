import React, { useState } from 'react';
import { Layout, Row, Col, Typography, Button, Rate, Breadcrumb, InputNumber, Space, Divider, Card } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getRelatedProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import ProductCard from '../components/ProductCard';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useUser();
  
  const product = getProductById(id);
  const relatedProducts = getRelatedProducts(id, product?.category);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Layout style={{ marginTop: '64px' }}>
      <Content style={{ padding: '20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Breadcrumb style={{ marginBottom: '20px' }}>
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={`/${product.category}`}>
                {product.category === 'ashta-dhatu' ? 'Ashta Dhatu' : 'Fashion Jewelry'}
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
          </Breadcrumb>

          <Row gutter={[40, 40]}>
            <Col xs={24} md={12}>
              <div style={{ position: 'sticky', top: '100px' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ 
                    width: '100%', 
                    height: '500px', 
                    objectFit: 'cover',
                    borderRadius: '12px'
                  }}
                />
              </div>
            </Col>
            
            <Col xs={24} md={12}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <Title level={1}>{product.name}</Title>
                  <Space>
                    <Rate disabled value={product.rating} />
                    <Text type="secondary">({product.reviews} reviews)</Text>
                  </Space>
                </div>

                <div>
                  <Space align="baseline">
                    <Title level={2} style={{ color: '#667eea', margin: 0 }}>
                      ₹{product.price.toLocaleString()}
                    </Title>
                    {product.originalPrice && (
                      <Text delete type="secondary" style={{ fontSize: '18px' }}>
                        ₹{product.originalPrice.toLocaleString()}
                      </Text>
                    )}
                  </Space>
                </div>

                <Paragraph style={{ fontSize: '16px' }}>
                  {product.description}
                </Paragraph>

                <div>
                  <Text strong>Quantity:</Text>
                  <InputNumber
                    min={1}
                    max={10}
                    value={quantity}
                    onChange={setQuantity}
                    style={{ marginLeft: '12px' }}
                  />
                </div>

                <Space size="middle">
                  <Button
                    type="primary"
                    size="large"
                    icon={<ShoppingCartOutlined />}
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                  <Button
                    size="large"
                    icon={<HeartOutlined />}
                    onClick={handleWishlist}
                    style={{ 
                      color: isInWishlist(product.id) ? '#ff4d4f' : undefined,
                      borderColor: isInWishlist(product.id) ? '#ff4d4f' : undefined
                    }}
                  >
                    {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </Button>
                </Space>

                <Divider />

                <div>
                  <Title level={4}>Product Details</Title>
                  <ul style={{ paddingLeft: '20px' }}>
                    <li>Premium quality materials</li>
                    <li>Handcrafted with care</li>
                    <li>30-day return policy</li>
                    <li>Free shipping on orders above ₹1000</li>
                  </ul>
                </div>
              </Space>
            </Col>
          </Row>

          {relatedProducts.length > 0 && (
            <div style={{ marginTop: '80px' }}>
              <Title level={2}>Related Products</Title>
              <Row gutter={[24, 24]}>
                {relatedProducts.map(product => (
                  <Col xs={24} sm={12} md={6} key={product.id}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default ProductDetail;