import { FC } from 'react';
import { Layout } from 'antd';

import AsideMenu from './AsideMenu';

const { Header, Content, Footer } = Layout;

const BasicLayout: FC = () => {
  return (
    <Layout>
      <AsideMenu />
      <Layout>
        <Header>header</Header>
        <Content>main content</Content>
        <Footer>footer</Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
