import React, { useState, useEffect, useRef } from 'react';
import { BadgeCheck, ShoppingCart } from 'lucide-react';
import ButtonCustom from '../../../components/buttons/ButtonCustom';
import QuantitySelector from './QuantitySelector';

export default function Product({ product }) {
  return (
    <>
      <div className='group rounded-2xl w-full h-full bg-white shadow-lg hover:shadow-custom-neumorphic-active transition-all duration-300 hover:scale-105 relative cursor-pointer'>
        <div className='p-4 w-full h-full flex flex-col gap-2'>
          <span className='absolute top-6 left-6 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold'>-{20}%</span>

          <img
            id='1'
            className='w-full h-full flex-1 min-h-0 object-cover rounded-2xl'
            src='https://res.cloudinary.com/cloudinarymen/image/upload/v1750435557/makotodecor/temp/2732a928-b2d2-488c-ad52-ea5921d1526c_rw_1920_ckt7yw.png'
          />

          <div id='2' className='flex flex-col gap-2'>
            <p className='font-semibold text-gray-800 group-hover:text-primary text-[18px] transition-colors truncate'>
              {'Sunstar Fresh Melon Juice'}
            </p>

            <div className='flex items-center gap-2'>
              <span className='text-sm text-gray-500'>{1234}</span>
              <p className='text-black uppercase text-red-500 text-[16px]'>sold</p>
              <BadgeCheck size={0} width={2} height={2} className=' text-red-500' />
            </div>

            <div className='flex items-center gap-1'>
              <p className=''>đ</p>
              <span className='text-xl font-bold text-gray-800'>
                {'400.000'}
                {/* <sup className='text-sm'>đ</sup> */}
              </span>
            </div>

            <div className='flex justify-between'>
              <QuantitySelector
                initialQuantity={1}
                onQuantityChange={(newQuantity) => {
                  console.log('Quantity changed:', newQuantity);
                }}
                min={1}
                max={10}
              />
              <div className='w-[48px] h-[36px]'>
                <ButtonCustom className='transition-all hover:scale-120 ' type='solid'>
                  <ShoppingCart />
                </ButtonCustom>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
