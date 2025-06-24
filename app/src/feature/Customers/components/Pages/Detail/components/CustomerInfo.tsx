import React from 'react';
import {Card, Descriptions, Typography} from 'antd';
import {UserOutlined, MailOutlined, PhoneOutlined} from '@ant-design/icons';
import type {Customer} from '~/src/feature/Customers/store/customer';

const {Text} = Typography;

interface CustomerInfoProps {
  customer: Customer;
}

export const CustomerInfo: React.FC<CustomerInfoProps> = ({customer}) => (
  <Card title='Customer Information' size='small' style={{marginTop: 24}}>
    <Descriptions column={1} bordered>
      <Descriptions.Item
        label={
          <span>
            <UserOutlined style={{marginRight: '0.5rem'}} />
            Full Name
          </span>
        }
      >
        <Text strong>{customer.name}</Text>
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <span>
            <MailOutlined style={{marginRight: '0.5rem'}} />
            Email Address
          </span>
        }
      >
        <a href={`mailto:${customer.email}`} style={{color: '#1890ff'}}>
          {customer.email}
        </a>
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <span>
            <PhoneOutlined style={{marginRight: '0.5rem'}} />
            Phone Number
          </span>
        }
      >
        {customer.phone ? (
          <a href={`tel:${customer.phone}`} style={{color: '#1890ff'}}>
            {customer.phone}
          </a>
        ) : (
          <Text type='secondary'>Not provided</Text>
        )}
      </Descriptions.Item>
    </Descriptions>
  </Card>
);
