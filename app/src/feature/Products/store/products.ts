import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {productApi} from '../adapters';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '~/src/bite/store';

// Product type definition
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  totalSold: number;
  createdAt: string;
  updatedAt: string;
}

interface ProductFiltersState {
  search: string;
  category: string;
}

interface ProductState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filters: ProductFiltersState;
}

const initialFilterState: ProductFiltersState = {
  search: '',
  category: '',
};

const initialState: ProductState = {
  products: [],
  status: 'idle',
  error: null,
  filters: initialFilterState,
};

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters: ProductFiltersState) => {
    const filteredParams = Object.fromEntries(
      Object.entries(filters)
        .filter(([, v]) => v !== null && v !== undefined && v !== '')
        .map(([k, v]) => {
          if (k === 'name') {
            return [`name[like]`, v];
          }
          return [k, v];
        })
    );

    const response = await productApi.get('/products', {
      params: filteredParams,
    });
    return response.data;
  }
);

export const addNewProduct = createAsyncThunk(
  'products/addNewProduct',
  async (initialProduct: Omit<Product, 'id'>) => {
    const response = await productApi.post('/products', initialProduct);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (product: Product) => {
    const response = await productApi.put(`/products/${product.id}`, product);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (product_id: string) => {
    await productApi.delete(`/products/${product_id}`);
    return product_id;
  }
);

// Slice
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    productAdded: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    productUpdated: (
      state,
      action: PayloadAction<Partial<Product> & {id: string}>
    ) => {
      const {id, ...updateData} = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === id
      );
      if (existingProduct) {
        Object.assign(existingProduct, updateData);
      }
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialFilterState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched products to the array
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to add product';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const {id, ...updateData} = action.payload;
        const existingProduct = state.products.find(
          (product) => product.id === id
        );
        if (existingProduct) {
          Object.assign(existingProduct, updateData);
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update product';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete product';
      });
  },
});

export const {
  productAdded,
  productUpdated,
  setSearch,
  setCategory,
  resetFilters,
} = productsSlice.actions;

export default productsSlice.reducer;

export const selectAllProducts = (state: RootState) => state.products.products;

export const selectProductById = (state: RootState, productId: string) =>
  state.products.products.find((product) => product.id === productId);

export const selectProductFilters = (state: RootState) =>
  state.products.filters;
