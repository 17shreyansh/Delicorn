import React from 'react';
import { Layout, Row, Col, Typography, Empty } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import Sidebar from '../../components/Sidebar';
import ProductCard from '../../components/ProductCard';
import { useUser } from '../../context/UserContext';

const { Content } = Layout;
const { Title } = Typography;

const Wishlist = () => {
  const { wishlist } = useUser();

  return (
    <Layout style={{ marginTop: '64px' }}>
      <Content style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Title level={2} style={{ marginBottom: '30px' }}>My Wishlist</Title>
          
          <Row gutter={[32, 32]}>
            <Col xs={24} md={6}>
              <Sidebar />
            </Col>
            
            <Col xs={24} md={18}>
              {wishlist.length === 0 ? (
                <Empty
                  image={<HeartOutlined style={{ fontSize: '64px', color: '#ccc' }} />}
                  description="Your wishlist is empty"
                />
              ) : (
                <Row gutter={[24, 24]}>
                  {wishlist.map(product => (
                    <Col xs={24} sm={12} lg={8} key={product.id}>
                      <ProductCard product={product} />
                    </Col>
                  ))}
                </Row>
              )}
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Wishlist;