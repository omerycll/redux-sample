import React from 'react';
import {Card, Space, Typography, Divider} from 'antd';
import {CalendarOutlined} from '@ant-design/icons';
import {type Product} from '~/src/feature/Products/store/products';

const {Text} = Typography;

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

interface ProductTimelineProps {
  product: Product;
}

export const ProductTimeline: React.FC<ProductTimelineProps> = ({product}) => (
  <Card title='Timeline' size='small' style={{marginTop: 24}}>
    <Space direction='vertical' style={{width: '100%'}}>
      <div>
        <Text type='secondary'>Created</Text>
        <br />
        <Text strong>
          <CalendarOutlined style={{marginRight: '0.5rem'}} />
          {formatDate(product.createdAt)}
        </Text>
      </div>
      <Divider style={{margin: '0.5rem 0'}} />
      <div>
        <Text type='secondary'>Last Updated</Text>
        <br />
        <Text strong>
          <CalendarOutlined style={{marginRight: '0.5rem'}} />
          {formatDate(product.updatedAt)}
        </Text>
      </div>
    </Space>
  </Card>
);
