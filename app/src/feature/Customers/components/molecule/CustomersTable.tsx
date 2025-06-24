import React, {useMemo} from 'react';
import {Table, Space, Button, Popconfirm} from 'antd';
import {Link} from 'react-router';
import type {Customer} from '~/src/feature/Customers/store/customers';

interface CustomersTableProps {
  customers: Customer[];
  onSelect: (customer: Customer) => void;
  onDelete: (customer_id: string) => void;
}

// Table columns configuration
const getTableColumns = (
  onSelect: (customer: Customer) => void,
  onDelete: (customer_id: string) => void
) => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: Customer, b: Customer) => a.name.localeCompare(b.name),
    render: (text: string, record: Customer) => (
      <Link
        to={`/customer/${record.id}`}
        style={{fontWeight: 500, color: '#1890ff'}}
      >
        {text}
      </Link>
    ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (email: string) => (
      <a href={`mailto:${email}`} style={{color: '#1890ff'}}>
        {email}
      </a>
    ),
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    render: (phone: string) => phone || '-',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    render: (gender: string) => gender || '-',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (record: Customer) => (
      <Space>
        <Button type='link' size='small'>
          <Link to={`/customer/${record.id}`}>View</Link>
        </Button>
        <Button type='link' size='small' onClick={() => onSelect(record)}>
          Edit
        </Button>
        <Popconfirm
          title='Are you sure you want to delete this customer?'
          onConfirm={() => onDelete(record.id)}
          okText='Yes'
          cancelText='No'
        >
          <Button type='link' size='small' danger>
            Delete
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
];

export const CustomersTable: React.FC<CustomersTableProps> = ({
  customers,
  onSelect,
  onDelete,
}) => {
  const columns = useMemo(
    () => getTableColumns(onSelect, onDelete),
    [onSelect, onDelete]
  );

  return (
    <Table
      columns={columns}
      dataSource={customers}
      rowKey='id'
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} customers`,
      }}
      style={{marginTop: '1rem'}}
    />
  );
};
