import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import RootLayout from './RootLayout';
import MainLayout from './MainLayout';
import ProductLayout from './ProductLayout';
import AuthLayout from './AuthLayout';

import Home from '../pages/Home';
import ProductDetail from '../pages/ProductDetail';
import Login from '../others/Login';
import Register from '../others/Register';
import NotFound from '../others/NotFound';
import Managerment from '../pages/Managerment';

const router = createBrowserRouter([
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
        element: <MainLayout />,
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
        element: <MainLayout />,
        children: [{ index: true, element: <Managerment /> }],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
