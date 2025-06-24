import React, {useEffect, useState, useCallback} from 'react';
import {useParams, useNavigate} from 'react-router';
import {useSelector} from 'react-redux';
import {
  getProduct,
  fetchProductById,
  deleteProduct,
} from '~/src/feature/Products/store/product';
import type {RootState} from '~/src/bite/store';
import {useAppDispatch} from '~/src/feature/Products/hooks';
import {message} from 'antd';
import {ProductModal} from '~/src/feature/Products/components/molecule/ProductModal';
import {ProductInfo, ProductTimeline, ProductStatistics} from './components';
import {
  LoadingState,
  ErrorState,
  EmptyState,
  PageHeader,
} from '~/src/bite/components/atom';
import type {Product} from '~/src/feature/Products/store/products';

export const ProductDetail: React.FC = () => {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const product = useSelector(getProduct) as Product | undefined;
  const productStatus = useSelector((state: RootState) => state.product.status);
  const error = useSelector((state: RootState) => state.product.error);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  const handleEdit = useCallback(() => {
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  }, [product]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  const handleDelete = useCallback(async () => {
    if (product) {
      try {
        await dispatch(deleteProduct(product.id)).unwrap();
        message.success('Product deleted successfully');
        navigate('/products');
      } catch (error) {
        message.error('Failed to delete product');
      }
    }
  }, [product, dispatch, navigate]);

  const handleBack = useCallback(() => {
    navigate('/products');
  }, [navigate]);

  if (productStatus === 'loading' || productStatus === 'idle') {
    return (
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '2rem'}}>
        <LoadingState />
      </div>
    );
  }

  if (productStatus === 'failed') {
    return (
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '2rem'}}>
        <ErrorState error={error} />
      </div>
    );
  }

  if (!product) {
    return <EmptyState message='Product not found.' />;
  }

  return (
    <div style={{maxWidth: '1200px', margin: '0 auto', padding: '2rem'}}>
      <PageHeader
        isBack={() => {
          navigate('/products');
        }}
        title={product.name}
        buttons={[
          {
            text: 'Refresh',
            type: 'default',
            onClick: () => dispatch(fetchProductById(id!)),
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
      <ProductInfo product={product} />
      <ProductTimeline product={product} />
      <ProductStatistics product={product} />
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};
