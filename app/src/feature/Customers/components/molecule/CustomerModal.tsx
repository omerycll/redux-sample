import {Modal, Form, Input, Button, Select} from 'antd';
import {useState, useEffect} from 'react';
import {useAppDispatch} from '../../hooks';
import {updateCustomer, type Customer} from '../../store/customer';
import {addNewCustomer} from '../../store/customers';

export const CustomerModal = ({
  isOpen,
  onClose,
  selectedCustomer,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedCustomer: Customer | null;
}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  // Reset form when selectedCustomer changes
  useEffect(() => {
    if (selectedCustomer) {
      form.setFieldsValue(selectedCustomer);
    } else {
      form.resetFields();
    }
  }, [selectedCustomer, form]);

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
      if (selectedCustomer) {
        await dispatch(
          updateCustomer({
            ...values,
            id: selectedCustomer.id,
            updatedAt: new Date().toISOString(),
          })
        ).unwrap();
      } else {
        await dispatch(
          addNewCustomer({
            ...values,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })
        ).unwrap();
      }
      form.resetFields();
      setLoading(false);
      onClose();
    } catch (error) {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title='Customer Edit'
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText='Save'
      cancelText='Cancel'
      destroyOnClose
    >
      <Form
        form={form}
        layout='vertical'
        initialValues={selectedCustomer || {}}
      >
        <Form.Item
          label='Name'
          name='name'
          rules={[{required: true, message: 'Please enter name'}]}
        >
          <Input placeholder='Customer name' />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please enter valid email',
            },
          ]}
        >
          <Input placeholder='Email address' />
        </Form.Item>
        <Form.Item label='Phone' name='phone'>
          <Input placeholder='Phone number (optional)' />
        </Form.Item>
        <Form.Item label='Gender' name='gender'>
          <Select
            options={[
              {label: 'Male', value: 'male'},
              {label: 'Female', value: 'female'},
              {label: 'Other', value: 'other'},
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
