import React, {useEffect, useMemo, useCallback, useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import {
  selectAllCustomers,
  fetchCustomers,
  type Customer,
  deleteCustomer,
  setName,
  setGender,
  resetFilters,
  selectCustomerFilters,
} from '~/src/feature/Customers/store/customers';
import type {RootState} from '~/src/bite/store';
import {useAppDispatch} from '~/src/feature/Customers/hooks';
import {Button, Card} from 'antd';
import {
  LoadingState,
  EmptyState,
  ErrorState,
  PageHeader,
  Filter,
} from '~/src/bite/components/atom';
import {CustomersTable} from '../../molecule/CustomersTable';
import {CustomerModal} from '../../molecule/CustomerModal';
import {useNavigate} from 'react-router';

export const CustomersList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const customers = useSelector(selectAllCustomers) as Customer[];
  const customerStatus = useSelector(
    (state: RootState) => state.customers.status
  );
  const error = useSelector((state: RootState) => state.customers.error);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterState = useSelector(selectCustomerFilters);

  const filters = [
    {
      name: 'İsim',
      type: 'text' as const,
      value: filterState.name,
      onChange: (val: string) => dispatch(setName(val)),
    },
    {
      name: 'Cinsiyet',
      type: 'select' as const,
      value: filterState.gender,
      onChange: (val: string) => dispatch(setGender(val)),
      options: [
        {label: 'Kadın', value: 'female'},
        {label: 'Erkek', value: 'male'},
      ],
    },
  ];

  console.log('customers', customers);
  // Fetch customers on component mount only once
  useEffect(() => {
    dispatch(fetchCustomers(filterState));
  }, [filterState, dispatch]); // Empty dependency array - only run on mount

  // Sort customers alphabetically
  const orderedCustomers = useMemo(() => {
    if (!customers || customers.length === 0) return [];
    // customer object check
    if (typeof customers !== 'object') {
      return [];
    }

    return customers;
  }, [customers]);

  // Handle refresh action
  const handleRefresh = useCallback(() => {
    dispatch(fetchCustomers(filterState));
  }, [dispatch, filterState]);

  // Handle add customer
  const handleAddCustomer = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  // Handle close modal
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleSelectCustomer = useCallback((customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  }, []);

  const handleDeleteCustomer = useCallback((customer_id: string) => {
    dispatch(deleteCustomer(customer_id)).unwrap();
  }, []);

  // Render content based on status
  const renderContent = useCallback(() => {
    // Show loading state when status is loading (regardless of existing customers)
    if (customerStatus === 'loading') {
      return <LoadingState />;
    }

    // Show error if failed
    if (customerStatus === 'failed') {
      return <ErrorState error={error} />;
    }

    // Show table if we have customers and status is succeeded
    if (customerStatus === 'succeeded' && orderedCustomers.length > 0) {
      return (
        <CustomersTable
          customers={orderedCustomers}
          onSelect={handleSelectCustomer}
          onDelete={handleDeleteCustomer}
        />
      );
    }

    // Show empty state if no customers and status is succeeded
    if (customerStatus === 'succeeded' && orderedCustomers.length === 0) {
      return <EmptyState />;
    }

    // Show loading as fallback for idle state (initial load)
    if (customerStatus === 'idle') {
      return <LoadingState />;
    }

    return null;
  }, [customerStatus, orderedCustomers, error]);

  return (
    <div style={{maxWidth: '1200px', margin: '0 auto', padding: '2rem'}}>
      <Filter
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        resetFilters={() => {
          dispatch(resetFilters());
          setIsFilterOpen(false);
        }}
      />
      <PageHeader
        isBack={() => {
          navigate('/');
        }}
        title='Customers'
        buttons={[
          {
            text: 'Refresh',
            onClick: handleRefresh,
          },
          {
            text: 'Add Customer',
            onClick: handleAddCustomer,
            type: 'primary',
          },
        ]}
      />
      <Card>
        <Button onClick={() => setIsFilterOpen(true)}>Filter</Button>
        <CustomerModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedCustomer={selectedCustomer}
        />
        {renderContent()}
      </Card>
    </div>
  );
};
