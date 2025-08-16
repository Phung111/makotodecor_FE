import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import RootLayout from './RootLayout';
import MainLayout from './MainLayout';

import ProductLayout from './ProductLayout';
import AuthLayout from './AuthLayout';
import ManagermentLayout from './ManagermentLayout';
import FormLayout from './FormLayout';

import Home from '../pages/Home';
import ProductDetail from '../pages/ProductDetail';
import Login from '../others/Login';
import Register from '../others/Register';
import NotFound from '../others/NotFound';
import Managerment from '../pages/Managerment';
import ProductForm from '../pages/Managerment/Product/ProductForm';
import Product from '../pages/Managerment/Product';
import Order from '../pages/Managerment/Order';
import User from '../pages/Managerment/User';
import UnicornLogin from '../components/UnicornLogin';

const router = createBrowserRouter([
  {
    path: '/unicorn-login',
    element: <UnicornLogin />,
  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [{ index: true, element: <Home /> }],
      },
      {
        path: '/product/:id',
        element: <ProductLayout />,
        children: [{ index: true, element: <ProductDetail /> }],
      },
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
        ],
      },
      {
        path: '/managerment',
        element: <ManagermentLayout />,
        children: [
          { index: true, element: <Managerment /> },
          { path: 'product', element: <Product /> },
          { path: 'order', element: <Order /> },
          { path: 'user', element: <User /> },
          {
            path: 'product/create',
            element: <FormLayout title='Tạo sản phẩm' />,
            children: [{ index: true, element: <ProductForm mode='create' /> }],
          },
          {
            path: 'product/edit/:id',
            element: <FormLayout title='Chỉnh sửa sản phẩm' />,
            children: [{ index: true, element: <ProductForm mode='edit' /> }],
          },
          {
            path: 'product/view/:id',
            element: <FormLayout title='Chi tiết sản phẩm' />,
            children: [{ index: true, element: <ProductForm mode='view' /> }],
          },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
