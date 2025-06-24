import React, {useMemo} from 'react';
import {Table, Space, Button, Popconfirm} from 'antd';
import {Link} from 'react-router';
import type {Product} from '~/src/feature/Products/store/products';

interface ProductsTableProps {
  products: Product[];
  onSelect: (product: Product) => void;
  onDelete: (product_id: string) => void;
}

// Table columns configuration
const getTableColumns = (
  onSelect: (product: Product) => void,
  onDelete: (product_id: string) => void
) => [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
    render: (text: string, record: Product) => (
      <Link
        to={`/product/${record.id}`}
        style={{fontWeight: 500, color: '#1890ff'}}
      >
        {text}
      </Link>
    ),
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (record: Product) => (
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

export const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
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
      dataSource={products}
      rowKey='id'
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} products`,
      }}
      style={{marginTop: '1rem'}}
    />
  );
};
