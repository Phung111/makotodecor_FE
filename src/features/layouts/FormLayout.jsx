import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Content } = Layout;

export default function FormLayout({ title = '' }) {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f7f7f7' }}>
      <Header
        style={{
          background: '#fff',
          borderBottom: '1px solid #eee',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          padding: '0 32px',
          fontSize: 24,
          fontWeight: 600,
        }}
      >
        {title}
      </Header>
      <Content
        style={{
          margin: '0 auto',
          padding: '32px 0',
          maxWidth: 1200,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: '100%' }}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}
