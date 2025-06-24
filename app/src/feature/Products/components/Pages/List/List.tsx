import React, {useEffect, useMemo, useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  selectAllProducts,
  fetchProducts,
  type Product,
  deleteProduct,
  setSearch,
  setCategory,
  resetFilters,
  selectProductFilters,
} from '~/src/feature/Products/store/products';
import type {RootState} from '~/src/bite/store';
import {useAppDispatch} from '~/src/feature/Products/hooks';
import {Button, Card} from 'antd';
import {
  LoadingState,
  EmptyState,
  ErrorState,
  PageHeader,
  Filter,
} from '~/src/bite/components/atom';
import {ProductsTable} from '../../molecule/ProductsTable';
import {ProductModal} from '../../molecule/ProductModal';
import {useNavigate} from 'react-router';

export const ProductsList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products = useSelector(selectAllProducts) as Product[];
  const productStatus = useSelector(
    (state: RootState) => state.products.status
  );
  const error = useSelector((state: RootState) => state.products.error);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterState = useSelector(selectProductFilters);

  const filters = [
    {
      name: 'Search',
      type: 'text' as const,
      value: filterState.search,
      onChange: (val: string) => dispatch(setSearch(val)),
    },
    {
      name: 'Category',
      type: 'select' as const,
      value: filterState.category,
      onChange: (val: string) => dispatch(setCategory(val)),
      options: [
        {label: 'All', value: ''},
        {label: 'Electronics', value: 'electronics'},
        {label: 'Clothing', value: 'clothing'},
        {label: 'Books', value: 'books'},
        {label: 'Home & Garden', value: 'home'},
      ],
    },
  ];

  // Fetch products on component mount only once
  useEffect(() => {
    dispatch(fetchProducts(filterState));
  }, [filterState, dispatch]);

  // Sort products alphabetically
  const orderedProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    return products
      .slice()
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  }, [products]);

  const handleRefresh = useCallback(() => {
    dispatch(fetchProducts(filterState));
  }, [dispatch, filterState]);

  const handleAdd = useCallback(() => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  }, []);

  const handleEdit = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  const handleDeleteProduct = useCallback((product_id: string) => {
    dispatch(deleteProduct(product_id)).unwrap();
  }, []);

  // Render content based on status
  const renderContent = useCallback(() => {
    // Show loading state when status is loading (regardless of existing products)
    if (productStatus === 'loading') {
      return <LoadingState />;
    }

    // Show error if failed
    if (productStatus === 'failed') {
      return <ErrorState error={error} />;
    }

    // Show table if we have products and status is succeeded
    if (productStatus === 'succeeded' && orderedProducts.length > 0) {
      return (
        <ProductsTable
          products={orderedProducts}
          onSelect={handleEdit}
          onDelete={handleDeleteProduct}
        />
      );
    }

    // Show empty state if no products and status is succeeded
    if (productStatus === 'succeeded' && orderedProducts.length === 0) {
      return <EmptyState />;
    }

    // Show loading as fallback for idle state (initial load)
    if (productStatus === 'idle') {
      return <LoadingState />;
    }

    return null;
  }, [productStatus, orderedProducts, error, handleEdit, handleDeleteProduct]);

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
        title='Products'
        buttons={[
          {
            text: 'Refresh',
            onClick: handleRefresh,
          },
          {
            text: 'Add Product',
            onClick: handleAdd,
            type: 'primary',
          },
        ]}
      />
      <Card>
        <Button onClick={() => setIsFilterOpen(true)}>Filter</Button>
        <ProductModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedProduct={selectedProduct}
        />
        {renderContent()}
      </Card>
    </div>
  );
};
