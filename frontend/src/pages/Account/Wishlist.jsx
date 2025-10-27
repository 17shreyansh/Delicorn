import React from 'react';
import { Row, Col, Typography, Empty } from 'antd';
import AccountLayout from '../../components/AccountLayout';
import AccountContent from '../../components/AccountContent';
import ProductCard from '../../components/ProductCard';
import { useUser } from '../../context/UserContext';
import { HeartOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Wishlist = () => {
  const { wishlist } = useUser();

  return (
    <AccountLayout title={`My Wishlist (${wishlist.length} items)`}>
      <AccountContent>
        {wishlist.length === 0 ? (
          <Empty
            image={<HeartOutlined style={{ fontSize: '64px', color: '#114D4D' }} />}
            description="No items in your wishlist"
          />
        ) : (
          <Row gutter={[16, 24]}>
            {wishlist.map(product => (
              <Col xs={24} sm={12} lg={8} xl={6} key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </AccountContent>
    </AccountLayout>
  );
};

export default Wishlist;
