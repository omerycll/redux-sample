import {Link} from 'react-router';
import type {Route} from './+types/home';
import {Layout, Menu, Card, Typography, Row, Col} from 'antd';
import {UserOutlined, ShoppingOutlined, HomeOutlined} from '@ant-design/icons';

const {Header, Content} = Layout;
const {Title} = Typography;

export function meta({}: Route.MetaArgs) {
  return [{title: 'Admin'}, {name: 'description', content: 'Admin'}];
}

export default function Home() {
  return (
    <Layout>
      <Header style={{background: '#fff', padding: 0}}>
        <Menu mode='horizontal' defaultSelectedKeys={['home']}>
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
        <Title level={2}>Hoş Geldiniz</Title>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Card
              title={
                <span>
                  <UserOutlined style={{marginRight: 8}} />
                  Customers
                </span>
              }
              hoverable
            >
              <p>Customer information and management.</p>
              <Link to='/customers'>
                <Card.Meta description='Go to Customers →' />
              </Link>
            </Card>
          </Col>

          <Col xs={24} sm={12}>
            <Card
              title={
                <span>
                  <ShoppingOutlined style={{marginRight: 8}} />
                  Products
                </span>
              }
              hoverable
            >
              <p>Product catalog and management.</p>
              <Link to='/products'>
                <Card.Meta description='Go to Products →' />
              </Link>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
