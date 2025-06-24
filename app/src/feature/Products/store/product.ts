import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {productApi} from '../adapters';
import type {Product} from './products';
import type {RootState} from '~/src/bite/store';

interface ProductState {
  product: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  product: null,
  status: 'idle',
  error: null,
};

export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (product_id: string) => {
    const response = await productApi.get(`/products/${product_id}`);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (product: Product) => {
    const response = await productApi.put(`/products/${product.id}`, product);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (product_id: string) => {
    await productApi.delete(`/products/${product_id}`);
    return product_id;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productAdded: (state, action) => {
      state.product = action.payload;
    },
    productUpdated: (state, action) => {
      state.product = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product';
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update product';
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.status = 'succeeded';
        state.product = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete product';
      });
  },
});

export const {productAdded, productUpdated} = productSlice.actions;

export default productSlice.reducer;

export const getProduct = (state: RootState) => state.product.product;
