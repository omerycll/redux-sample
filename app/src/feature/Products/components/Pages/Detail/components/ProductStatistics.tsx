import React from 'react';
import {Row, Col, Card, Statistic} from 'antd';
import {type Product} from '~/src/feature/Products/store/products';

interface ProductStatisticsProps {
  product: Product;
}

export const ProductStatistics: React.FC<ProductStatisticsProps> = ({
  product,
}) => {
  return (
    <Row gutter={[24, 24]} style={{marginTop: '2rem'}}>
      <Col xs={24} sm={12} md={6}>
        <Card size='small'>
          <Statistic
            title='Total Revenue'
            value={product.price * (product.totalSold || 0)}
            precision={2}
            prefix='$'
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card size='small'>
          <Statistic title='Units Sold' value={product.totalSold || 0} />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card size='small'>
          <Statistic title='Current Stock' value={product.stock} />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Card size='small'>
          <Statistic
            title='Stock Value'
            value={product.price * product.stock}
            precision={2}
            prefix='$'
          />
        </Card>
      </Col>
    </Row>
  );
};
