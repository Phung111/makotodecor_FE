import React, { useState, useMemo, useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  AppstoreOutlined,
  PictureOutlined,
  ShoppingOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import vi from '../../json/translaiton/vi.json'; // Import your translation file

const { Header, Sider, Content } = Layout;

const mockUser = {
  email: 'buiminhan@gmail.com',
};

export default function ManagermentLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { Menu: menuTranslations } = vi;

  // Lấy selectedKey từ URL hiện tại
  const getSelectedKeyFromPath = () => {
    const pathname = location.pathname;
    if (pathname === '/managerment') return 'dashboard';
    if (pathname.includes('/product')) return 'product';
    if (pathname.includes('/order')) return 'order';
    if (pathname.includes('/user')) return 'user';
    return 'dashboard'; // default
  };

  const [selectedKey, setSelectedKey] = useState(getSelectedKeyFromPath());

  // Cập nhật selectedKey khi URL thay đổi
  useEffect(() => {
    setSelectedKey(getSelectedKeyFromPath());
  }, [location.pathname]);

  const menuItems = useMemo(
    () => [
      {
        key: 'dashboard',
        icon: <HomeOutlined />,
        label: 'Dashboard',
      },
      {
        key: menuTranslations.productOperator,
        icon: <AppstoreOutlined />,
        label: menuTranslations.productOperator,
        children: [{ key: 'product', icon: <AppstoreOutlined />, label: menuTranslations.product }],
      },
      {
        key: menuTranslations.userOperator,
        icon: <UserOutlined />,
        label: menuTranslations.userOperator,
        children: [{ key: 'user', icon: <UserOutlined />, label: menuTranslations.user }],
      },
      {
        key: menuTranslations.orderOperator,
        icon: <ShoppingOutlined />,
        label: menuTranslations.orderOperator,
        children: [{ key: 'order', icon: <ShoppingOutlined />, label: menuTranslations.order }],
      },
      {
        key: menuTranslations.imageOperator,
        icon: <PictureOutlined />,
        label: menuTranslations.imageOperator,
        children: [
          { key: menuTranslations.imageBanner, icon: <PictureOutlined />, label: menuTranslations.imageBanner },
          { key: menuTranslations.imageAdvertise, icon: <PictureOutlined />, label: menuTranslations.imageAdvertise },
          { key: menuTranslations.imageProduct, icon: <PictureOutlined />, label: menuTranslations.imageProduct },
        ],
      },
      {
        key: menuTranslations.configOperator,
        icon: <ShoppingOutlined />,
        label: menuTranslations.configOperator,
        children: [{ key: 'configCategory', icon: <ShoppingOutlined />, label: menuTranslations.configCategory }],
      },
    ],
    [menuTranslations]
  );

  // Hàm lấy đường dẫn label cha/con cho breadcrumb
  function findLabelPath(key, items = menuItems, path = []) {
    for (const item of items) {
      if (item.key === key) {
        return [...path, item.label];
      }
      if (item.children) {
        const found = findLabelPath(key, item.children, [...path, item.label]);
        if (found.length) return found;
      }
    }
    return [];
  }

  const breadcrumb = findLabelPath(selectedKey);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: '#fff',
          padding: 0,
          borderBottom: '1px solid #f0f0f0',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100vw',
          zIndex: 100,
        }}
      >
        <div className='flex items-center gap-4 pl-6'>
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 20, marginLeft: 8 }}
          />
          <img
            src='https://res.cloudinary.com/cloudinarymen/image/upload/v1748196437/makotodecor/backgrounds/LOGO_lolbry.png'
            alt='Makoto Decor Logo'
            style={{ height: 32 }}
          />
          <nav className='flex items-center gap-2 text-sm text-black/70 ml-4'>
            {breadcrumb.map((item, idx) => (
              <React.Fragment key={`breadcrumb-${item}-${idx}`}>
                {idx > 0 && <span>&gt;</span>}
                <span className={idx === breadcrumb.length - 1 ? 'text-black font-semibold' : ''}>{item}</span>
              </React.Fragment>
            ))}
          </nav>
        </div>
        <div className='flex items-center gap-4 pr-6'>
          <Button className='border px-2 py-1 rounded text-sm flex items-center gap-1'>🇻🇳</Button>
          <div className='flex items-center gap-2'>
            <span className='text-sm text-black/70'>{mockUser.email}</span>
            <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center'>
              <UserOutlined className='text-black/50' />
            </div>
          </div>
        </div>
      </Header>
      <Layout style={{ marginTop: 64 }}>
        <Sider
          collapsible
          collapsed={collapsed}
          trigger={null}
          width={240}
          style={{
            background: '#fff',
            borderRight: '1px solid #f0f0f0',
            position: 'fixed',
            left: 0,
            top: 64,
            bottom: 0,
            zIndex: 20,
            height: 'calc(100vh - 64px)',
            overflow: 'auto',
            transition: 'all 0.25s',
          }}
        >
          <Menu
            mode='inline'
            selectedKeys={[selectedKey]}
            defaultOpenKeys={['productOperator', 'userOperator', 'orderOperator', 'imageOperator']}
            style={{ borderRight: 0, marginTop: 8 }}
            items={menuItems}
            onClick={({ key }) => {
              setSelectedKey(key);
              if (key === 'dashboard') {
                navigate('/managerment');
              } else {
                navigate(`/managerment/${key}`);
              }
            }}
          />
        </Sider>
        <Layout style={{ marginLeft: collapsed ? 80 : 240, transition: 'margin-left 0.2s' }}>
          <Content
            style={{
              padding: 24,
              background: '#E6F0FA',
              minHeight: 'calc(100vh - 64px)',
            }}
          >
            <Outlet context={{ selectedKey }} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
