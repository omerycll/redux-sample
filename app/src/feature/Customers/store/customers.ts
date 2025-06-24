import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {customerApi} from '../adapters';
import type {RootState} from '~/src/bite/store';

// Customer type definition
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

interface CustomerFiltersState {
  name: string;
  gender: string;
}

interface CustomerState {
  customers: Customer[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filters: CustomerFiltersState;
}

const initialState: CustomerState = {
  customers: [],
  status: 'idle',
  error: null,
  filters: {
    name: '',
    gender: '',
  },
};

// Async thunk: müşteri listesini getir
export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (
    filters: {name?: string; age?: number | null; gender?: string} = {}
  ) => {
    // Sadece null veya undefined olmayanları ekle ve name için [like] operatörü kullan
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
    const response = await customerApi.get('/customers', {
      params: filteredParams,
    });
    return response.data;
  }
);

export const addNewCustomer = createAsyncThunk(
  'customers/addNewCustomer',
  async (initialCustomer: Omit<Customer, 'id'>) => {
    const response = await customerApi.post('/customers', initialCustomer);
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
export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    customerAdded: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);
    },
    customerUpdated: (
      state,
      action: PayloadAction<Partial<Customer> & {id: string}>
    ) => {
      const {id, ...updateData} = action.payload;
      const existingCustomer = state.customers.find(
        (customer) => customer.id === id
      );
      if (existingCustomer) {
        Object.assign(existingCustomer, updateData);
      }
    },
    setName(state, action: PayloadAction<string>) {
      state.filters.name = action.payload;
    },
    setGender(state, action: PayloadAction<string>) {
      state.filters.gender = action.payload;
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched customers to the array
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch customers';
      })
      .addCase(addNewCustomer.fulfilled, (state, action) => {
        state.customers.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addNewCustomer.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to add customer';
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        const {id, ...updateData} = action.payload;
        const existingCustomer = state.customers.find(
          (customer) => customer.id === id
        );
        if (existingCustomer) {
          Object.assign(existingCustomer, updateData);
        }
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to update customer';
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter(
          (customer) => customer.id !== action.payload
        );
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to delete customer';
      });
  },
});

export const {
  customerAdded,
  customerUpdated,
  setName,
  setGender,
  resetFilters,
} = customersSlice.actions;

export default customersSlice.reducer;

export const selectAllCustomers = (state: RootState) =>
  state.customers.customers;

export const selectCustomerById = (
  state: {customers: CustomerState},
  customerId: string
) => state.customers.customers.find((customer) => customer.id === customerId);

export const selectCustomerFilters = (state: RootState) =>
  state.customers.filters;
