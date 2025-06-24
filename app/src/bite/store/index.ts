import {configureStore} from '@reduxjs/toolkit';
import {customerSlice} from '~/src/feature/Customers/store/customer';
import {customersSlice} from '~/src/feature/Customers/store/customers';
import productsReducer from '~/src/feature/Products/store/products';
import productReducer from '~/src/feature/Products/store/product';

export const store = configureStore({
  reducer: {
    customers: customersSlice.reducer,
    customer: customerSlice.reducer,
    products: productsReducer,
    product: productReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
