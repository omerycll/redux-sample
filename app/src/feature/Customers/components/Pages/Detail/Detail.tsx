import React, {useEffect, useState, useCallback} from 'react';
import {useParams, useNavigate} from 'react-router';
import {useSelector} from 'react-redux';
import {
  fetchCustomerById,
  deleteCustomer,
  type Customer,
  getCustomer,
} from '~/src/feature/Customers/store/customer';
import type {RootState} from '~/src/bite/store';
import {useAppDispatch} from '~/src/feature/Customers/hooks';
import {message} from 'antd';
import {CustomerModal} from '~/src/feature/Customers/components/molecule/CustomerModal';
import {CustomerInfo, CustomerTimeline, CustomerStatistics} from './components';
import {
  LoadingState,
  ErrorState,
  EmptyState,
  PageHeader,
} from '~/src/bite/components/atom';

export const CustomerDetail: React.FC = () => {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const customer = useSelector(getCustomer) as Customer | undefined;
  const customerStatus = useSelector(
    (state: RootState) => state.customer.status
  );
  const error = useSelector((state: RootState) => state.customer.error);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchCustomerById(id));
    }
  }, [dispatch, id]);

  const handleEdit = useCallback(() => {
    if (customer) {
      setSelectedCustomer(customer);
      setIsModalOpen(true);
    }
  }, [customer]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  }, []);

  const handleDelete = useCallback(async () => {
    if (customer) {
      try {
        await dispatch(deleteCustomer(customer.id)).unwrap();
        message.success('Customer deleted successfully');
        navigate('/customers');
      } catch (error) {
        message.error('Failed to delete customer');
      }
    }
  }, [customer, dispatch, navigate]);

  const handleBack = useCallback(() => {
    navigate('/customers');
  }, [navigate]);

  if (customerStatus === 'loading' || customerStatus === 'idle') {
    return (
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '2rem'}}>
        <LoadingState />
      </div>
    );
  }

  if (customerStatus === 'failed') {
    return (
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '2rem'}}>
        <ErrorState error={error} />
      </div>
    );
  }

  if (!customer) {
    return <EmptyState message='Customer not found.' />;
  }

  return (
    <div style={{maxWidth: '1200px', margin: '0 auto', padding: '2rem'}}>
      <PageHeader
        isBack={() => {
          navigate('/customers');
        }}
        title={customer.name}
        buttons={[
          {
            text: 'Refresh',
            type: 'default',
            onClick: () => dispatch(fetchCustomerById(id!)),
          },
          {
            text: 'Delete',
            type: 'default',
            danger: true,
            onClick: handleDelete,
          },
          {
            text: 'Edit',
            type: 'primary',
            onClick: handleEdit,
          },
        ]}
      />
      <CustomerInfo customer={customer} />
      <CustomerTimeline customer={customer} />
      <CustomerStatistics customer={customer} />
      <CustomerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedCustomer={selectedCustomer}
      />
    </div>
  );
};
