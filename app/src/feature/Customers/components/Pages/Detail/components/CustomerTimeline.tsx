import React from 'react';
import {Card, Space, Typography, Divider} from 'antd';
import {CalendarOutlined} from '@ant-design/icons';
import type {Customer} from '~/src/feature/Customers/store/customer';

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

interface CustomerTimelineProps {
  customer: Customer;
}

export const CustomerTimeline: React.FC<CustomerTimelineProps> = ({
  customer,
}) => (
  <Card title='Timeline' size='small' style={{marginTop: 24}}>
    <Space direction='vertical' style={{width: '100%'}}>
      <div>
        <Text type='secondary'>Created</Text>
        <br />
        <Text strong>
          <CalendarOutlined style={{marginRight: '0.5rem'}} />
          {formatDate(customer.createdAt)}
        </Text>
      </div>
      <Divider style={{margin: '0.5rem 0'}} />
      <div>
        <Text type='secondary'>Last Updated</Text>
        <br />
        <Text strong>
          <CalendarOutlined style={{marginRight: '0.5rem'}} />
          {formatDate(customer.updatedAt)}
        </Text>
      </div>
    </Space>
  </Card>
);
