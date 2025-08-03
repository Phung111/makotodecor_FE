import React from 'react';
import { Outlet } from 'react-router-dom';
import Modal from '../components/Modal';

const RootLayout = () => {
  return (
    <div className='flex flex-col relative'>
      <Outlet />
      <Modal />
    </div>
  );
};

export default RootLayout;
