import {type RouteConfig, index, route} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('customers', 'routes/customers.tsx'),
  route('customer/:id', 'routes/customer_detail.tsx'),
  route('products', 'routes/products.tsx'),
  route('product/:id', 'routes/product_detail.tsx'),
] satisfies RouteConfig;
