import React from 'react';
import {Card, Descriptions, Typography} from 'antd';
import {
  ShoppingOutlined,
  FileTextOutlined,
  TagOutlined,
  DollarOutlined,
  InboxOutlined,
  ClockCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import {type Product} from '~/src/feature/Products/store/products';

const {Text} = Typography;

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({product}) => {
  return (
    <Card title='Product Information' size='small' style={{marginTop: 24}}>
      <Descriptions column={1} bordered>
        <Descriptions.Item
          label={
            <span>
              <ShoppingOutlined style={{marginRight: '0.5rem'}} />
              Name
            </span>
          }
        >
          <Text strong>{product.name}</Text>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              <FileTextOutlined style={{marginRight: '0.5rem'}} />
              Description
            </span>
          }
        >
          <Text>{product.description || '-'}</Text>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              <TagOutlined style={{marginRight: '0.5rem'}} />
              Category
            </span>
          }
        >
          <Text>{product.category}</Text>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              <DollarOutlined style={{marginRight: '0.5rem'}} />
              Price
            </span>
          }
        >
          <Text>${product.price.toFixed(2)}</Text>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              <InboxOutlined style={{marginRight: '0.5rem'}} />
              Stock
            </span>
          }
        >
          <Text>{product.stock}</Text>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              <ClockCircleOutlined style={{marginRight: '0.5rem'}} />
              Created At
            </span>
          }
        >
          <Text>{new Date(product.createdAt).toLocaleDateString()}</Text>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              <SyncOutlined style={{marginRight: '0.5rem'}} />
              Last Updated
            </span>
          }
        >
          <Text>{new Date(product.updatedAt).toLocaleDateString()}</Text>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
