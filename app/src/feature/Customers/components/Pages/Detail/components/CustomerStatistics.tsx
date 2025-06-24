import React from 'react';
import {Row, Col, Card, Statistic, Tag} from 'antd';
import type {Customer} from '~/src/feature/Customers/store/customer';

interface CustomerStatisticsProps {
  customer: Customer;
}

export const CustomerStatistics: React.FC<CustomerStatisticsProps> = ({
  customer,
}) => {
  const daysSinceCreated = Math.floor(
    (Date.now() - new Date(customer.createdAt).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return (
    <Row gutter={[24, 24]} style={{marginTop: '2rem'}}>
      <Col xs={24} sm={8}>
        <Card size='small'>
          <Statistic
            title='Customer Status'
            value='Active'
            valueStyle={{color: '#3f8600'}}
            prefix={<Tag color='green'>Active</Tag>}
          />
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card size='small'>
          <Statistic
            title='Days Since Created'
            value={daysSinceCreated}
            suffix='days'
          />
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card size='small'>
          <Statistic
            title='Contact Info'
            value={customer.phone ? 'Complete' : 'Incomplete'}
            valueStyle={{color: customer.phone ? '#3f8600' : '#cf1322'}}
            prefix={
              <Tag color={customer.phone ? 'green' : 'red'}>
                {customer.phone ? 'Complete' : 'Incomplete'}
              </Tag>
            }
          />
        </Card>
      </Col>
    </Row>
  );
};
