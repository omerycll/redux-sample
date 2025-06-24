import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {customerApi} from '../adapters';

// Customer type definition
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

interface CustomerState {
  customer: Customer | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CustomerState = {
  customer: null,
  status: 'idle',
  error: null,
};

// Async thunk: müşteri listesini getir
export const fetchCustomerById = createAsyncThunk(
  'customers/fetchCustomerById',
  async (customer_id: string) => {
    const response = await customerApi.get(`/customers/${customer_id}`);
    return response.data;
  }
);

export const updateCustomer = createAsyncThunk(
  'customers/updateCustomer',
  async (customer: Customer) => {
    const response = await customerApi.put(
      `/customers/${customer.id}`,
      customer
    );
    return response.data;
  }
);

export const deleteCustomer = createAsyncThunk(
  'customers/deleteCustomer',
  async (customer_id: string) => {
    await customerApi.delete(`/customers/${customer_id}`);
    return customer_id;
  }
);

// Slice
export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    customerAdded: (state, action: PayloadAction<Customer>) => {
      state.customer = action.payload;
    },
    customerUpdated: (
      state,
      action: PayloadAction<Partial<Customer> & {id: string}>
    ) => {
      if (state.customer && state.customer.id === action.payload.id) {
        Object.assign(state.customer, action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customer = action.payload;
      })
      .addCase(fetchCustomerById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch customer';
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        if (state.customer && state.customer.id === action.payload.id) {
          Object.assign(state.customer, action.payload);
        }
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update customer';
      })
      .addCase(deleteCustomer.fulfilled, (state) => {
        state.customer = null;
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete customer';
      });
  },
});

export const {customerAdded, customerUpdated} = customerSlice.actions;

export default customerSlice.reducer;

export const getCustomer = (state: {customer: CustomerState}) =>
  state.customer.customer;
