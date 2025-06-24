import React, {useEffect, useState} from 'react';
import {Modal, Form, Input, Button, Select, InputNumber} from 'antd';
import {useAppDispatch} from '~/src/feature/Products/hooks';
import {
  addNewProduct,
  updateProduct,
  type Product,
} from '~/src/feature/Products/store/products';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: Product | null;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  selectedProduct,
}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  // Reset form when selectedProduct changes
  useEffect(() => {
    if (selectedProduct) {
      form.setFieldsValue(selectedProduct);
    } else {
      form.resetFields();
    }
  }, [selectedProduct, form]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      form.resetFields();
    }
  }, [isOpen, form]);

  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      if (selectedProduct) {
        await dispatch(
          updateProduct({
            ...values,
            id: selectedProduct.id,
            totalSold: selectedProduct.totalSold,
            createdAt: selectedProduct.createdAt,
            updatedAt: new Date().toISOString(),
          })
        ).unwrap();
      } else {
        const now = new Date().toISOString();
        await dispatch(
          addNewProduct({
            ...values,
            totalSold: 0,
            createdAt: now,
            updatedAt: now,
          })
        ).unwrap();
      }
      form.resetFields();
      setLoading(false);
      onClose();
    } catch (error) {
      setLoading(false);
      console.error('Failed to save product:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={selectedProduct ? 'Edit Product' : 'Add New Product'}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText='Save'
      cancelText='Cancel'
      destroyOnClose
    >
      <Form form={form} layout='vertical' initialValues={selectedProduct || {}}>
        <Form.Item
          label='Name'
          name='name'
          rules={[{required: true, message: 'Please enter product name'}]}
        >
          <Input placeholder='Product name' />
        </Form.Item>

        <Form.Item label='Description' name='description'>
          <Input.TextArea placeholder='Product description' />
        </Form.Item>

        <Form.Item
          label='Price'
          name='price'
          rules={[
            {required: true, message: 'Please enter price'},
            {type: 'number', min: 0, message: 'Price must be positive'},
          ]}
        >
          <InputNumber
            placeholder='Price'
            style={{width: '100%'}}
            min={0}
            step={0.01}
          />
        </Form.Item>

        <Form.Item
          label='Category'
          name='category'
          rules={[{required: true, message: 'Please select a category'}]}
        >
          <Select
            placeholder='Select a category'
            options={[
              {label: 'Electronics', value: 'electronics'},
              {label: 'Clothing', value: 'clothing'},
              {label: 'Books', value: 'books'},
              {label: 'Home & Garden', value: 'home'},
            ]}
          />
        </Form.Item>

        <Form.Item
          label='Stock'
          name='stock'
          rules={[
            {required: true, message: 'Please enter stock quantity'},
            {type: 'number', min: 0, message: 'Stock must be positive'},
          ]}
        >
          <InputNumber
            placeholder='Stock quantity'
            style={{width: '100%'}}
            min={0}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
