import {ProductsList} from '~/src/feature/Products/components/Pages';
import {Link} from 'react-router';
import type {Route} from './+types/home';
import {Layout, Menu} from 'antd';
import {UserOutlined, ShoppingOutlined, HomeOutlined} from '@ant-design/icons';

const {Header, Content} = Layout;

export function meta({}: Route.MetaArgs) {
  return [{title: 'Products'}, {name: 'description', content: 'Products'}];
}

export default function Home() {
  return (
    <Layout>
      <Header style={{background: '#fff', padding: 0}}>
        <Menu mode='horizontal' defaultSelectedKeys={['products']}>
          <Menu.Item key='home' icon={<HomeOutlined />}>
            <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item key='customers' icon={<UserOutlined />}>
            <Link to='/customers'>Customers</Link>
          </Menu.Item>
          <Menu.Item key='products' icon={<ShoppingOutlined />}>
            <Link to='/products'>Products</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        style={{
          padding: '24px',
          minHeight: 'calc(100vh - 64px)',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <ProductsList />
      </Content>
    </Layout>
  );
}
