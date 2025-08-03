import React, { useState, useEffect, useRef } from 'react';
import { BadgeCheck, ShoppingCart } from 'lucide-react';
import ButtonCustom from '../../../components/buttons/ButtonCustom';
import QuantitySelector from './QuantitySelector';

const MasonryGrid = () => {
  const [items, setItems] = useState([]);
  const [columns, setColumns] = useState(4);
  const containerRef = useRef(null);

  // Tạo dữ liệu mẫu với chiều cao ngẫu nhiên
  const generateItems = (count) => {
    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      height: Math.floor(Math.random() * 200) + 250,
    }));
  };

  // Khởi tạo items
  useEffect(() => {
    setItems(generateItems(20));
  }, []);

  // Tính toán số cột dựa trên kích thước màn hình
  useEffect(() => {
    const updateColumns = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        if (width < 640) setColumns(2);
        else if (width < 768) setColumns(3);
        else if (width < 1024) setColumns(4);
        else if (width < 1280) setColumns(5);
        else setColumns(6);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Sắp xếp items theo thuật toán masonry
  const arrangeItems = () => {
    if (items.length === 0) return [];

    const columnHeights = new Array(columns).fill(0);
    const arrangedItems = [];

    items.forEach((item) => {
      // Tìm cột có chiều cao thấp nhất
      const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights));

      arrangedItems.push({
        ...item,
        column: minHeightIndex,
        top: columnHeights[minHeightIndex],
      });

      // Cập nhật chiều cao cột
      columnHeights[minHeightIndex] += item.height + 16; // +16 cho gap
    });

    return arrangedItems;
  };

  const arrangedItems = arrangeItems();
  const totalHeight = Math.max(
    ...Array.from({ length: columns }, (_, colIndex) => {
      const colItems = arrangedItems.filter((item) => item.column === colIndex);
      return colItems.reduce((height, item) => height + item.height + 16, 0);
    })
  );

  const addMoreItems = () => {
    const newItems = generateItems(10);
    const startId = items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
    const updatedNewItems = newItems.map((item, index) => ({
      ...item,
      id: startId + index,
    }));
    setItems((prev) => [...prev, ...updatedNewItems]);
  };

  const resetItems = () => {
    setItems(generateItems(20));
  };

  return (
    <div className='min-h-screen'>
      <h1 className='text-3xl font-bold text-center mb-6 text-gray-800'>Masonry Grid Layout</h1>

      <div className='flex gap-4 justify-center mb-6'>
        <button onClick={addMoreItems} className='px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'>
          Thêm Items
        </button>
        <button onClick={resetItems} className='px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'>
          Reset
        </button>
      </div>

      <div className='text-center mb-4 text-gray-600'>
        Tổng số items: {items.length} | Số cột: {columns}
      </div>

      <div ref={containerRef} className='relative w-full' style={{ height: `${totalHeight}px` }}>
        {arrangedItems.map((item) => (
          <div
            key={item.id}
            className='absolute rounded-2xl shadow-lg hover:shadow-2xl flex items-center justify-center font-bold text-xl transition-all duration-300 hover:scale-105 cursor-pointer'
            style={{
              backgroundColor: item.color,
              height: `${item.height}px`,
              width: `calc((100% - ${(columns - 1) * 16}px) / ${columns})`,
              left: `calc(${item.column} * ((100% - ${(columns - 1) * 16}px) / ${columns}) + ${item.column * 16}px)`,
              top: `${item.top}px`,
            }}
          >
            <div className='group rounded-2xl w-full h-full bg-white shadow-sm hover:shadow-lg transition-all duration-300 relative '>
              <div className='p-4 w-full h-full flex flex-col gap-2'>
                <span className='absolute top-4 left-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full'>-{20}%</span>

                <img id='1' className='w-full h-full flex-1 min-h-0 object-cover rounded-2xl' src='https://res.cloudinary.com/cloudinarymen/image/upload/v1750435557/makotodecor/temp/2732a928-b2d2-488c-ad52-ea5921d1526c_rw_1920_ckt7yw.png' />

                <div id='2' className='flex flex-col gap-2'>
                  <p className='font-semibold text-gray-800 group-hover:text-primary text-[18px] transition-colors truncate'>{'Sunstar Fresh Melon Juice'}</p>

                  <div className='flex items-center gap-2'>
                    <span className='text-sm text-gray-500'>{1234}</span>
                    <p className='text-black uppercase text-red-500 text-[16px]'>sold</p>
                    <BadgeCheck className='w-4 h-4 text-red-500' />
                  </div>

                  <div className='flex items-center gap-1'>
                    <p className=''>đ</p>
                    <span className='text-xl font-bold text-gray-800'>
                      {'400.000'}
                      <sup className='text-sm'>đ</sup>
                    </span>
                  </div>

                  <div className='flex justify-between'>
                    <QuantitySelector
                      initialQuantity={1}
                      onQuantityChange={(newQuantity) => {
                        console.log('Quantity changed:', newQuantity);
                      }}
                      min={1}
                      max={20}
                    />
                    <div className='w-[56px] h-[40px]'>
                      <ButtonCustom type='solid'>
                        <ShoppingCart />
                      </ButtonCustom>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-8 p-4 bg-white rounded-lg shadow-sm'>
        <h3 className='font-semibold mb-2'>Cách hoạt động:</h3>
        <ul className='text-sm text-gray-600 space-y-1'>
          <li>• Items được sắp xếp theo chiều ngang từ trái sang phải</li>
          <li>• Mỗi item mới sẽ được đặt vào cột có chiều cao thấp nhất</li>
          <li>• Layout tự động responsive theo kích thước màn hình</li>
          <li>• Hover vào item để xem hiệu ứng scale</li>
        </ul>
      </div>
    </div>
  );
};

export default MasonryGrid;
