import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useSelector, useDispatch } from 'react-redux';

export default function ImageSlide() {
  const dispatch = useDispatch();

  const spaceBetween = 16; // Khoảng cách giữa các slide

  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [squareHeight, setSquareHeight] = useState(0);
  const [currentImage, setCurrentImage] = useState(
    'https://res.cloudinary.com/cloudinarymen/image/upload/v1750435557/makotodecor/temp/2732a928-b2d2-488c-ad52-ea5921d1526c_rw_1920_ckt7yw.png'
  );
  const squareDivRef = useRef(null);

  // Hàm tính toán chiều cao
  const calculateHeight = () => {
    if (squareDivRef.current) {
      const height = squareDivRef.current.offsetHeight;
      setSquareHeight(height);
      console.log('Chiều cao div aspect-square:', height + 'px');
    }
  };

  // Effect để tính toán khi component mount và khi resize
  useEffect(() => {
    calculateHeight();

    // Listener cho resize
    const handleResize = () => {
      calculateHeight();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Effect để tính lại khi component re-render
  useEffect(() => {
    const timer = setTimeout(() => {
      calculateHeight();
    }, 100); // Delay nhỏ để đảm bảo DOM đã render xong

    return () => clearTimeout(timer);
  });

  const handleProductDetailSlideClick = (imageUrl) => {
    setCurrentImage(imageUrl);
  };

  return (
    <>
      <div className='flex flex-col gap-4 h-full w-full'>
        <div ref={squareDivRef} className='w-full aspect-square bg-gray-4'>
          <img src={`${currentImage}`} className='aspect-square h-full w-full bg-gray object-contain' />
        </div>
        <div className='w-full relative flex items-center justify-center' style={{ height: `${(squareHeight - spaceBetween * 4) / 5}px` }}>
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: '.swiper-button-prev-product-detail',
              nextEl: '.swiper-button-next-product-detail',
            }}
            slidesPerView={5}
            spaceBetween={spaceBetween}
            onSlideChange={(swiper) => {
              setCanPrevious(swiper.activeIndex !== 0);
              setCanNext(swiper.isEnd ? false : true);
            }}
          >
            {[...Array(10)].map((_, index) => {
              const imageUrl1 =
                'https://res.cloudinary.com/cloudinarymen/image/upload/v1750435557/makotodecor/temp/2732a928-b2d2-488c-ad52-ea5921d1526c_rw_1920_ckt7yw.png';

              const imageUrl2 =
                'https://res.cloudinary.com/cloudinarymen/image/upload/v1750352608/makotodecor/backgrounds/Pngtree_mascot_japan_red_daruma_6600704_kfew8w.png';
              return (
                <>
                  <SwiperSlide onClick={() => handleProductDetailSlideClick(imageUrl1)}>
                    <div
                      className={`aspect-square cursor-pointer w-full h-full flex items-center justify-center transition-all duration-150
                        ${currentImage === imageUrl1 ? 'border-2 border-red-500' : 'border-2 border-transparent'}`}
                    >
                      <img
                        src={imageUrl1}
                        className='aspect-square w-full h-full object-contain bg-gray-4'
                        alt={`product detail slide ${index + 1}`}
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide onClick={() => handleProductDetailSlideClick(imageUrl2)}>
                    <div
                      className={`aspect-square cursor-pointer w-full h-full flex items-center justify-center transition-all duration-150
                        ${currentImage === imageUrl2 ? 'border-2 border-red-500' : 'border-2 border-transparent'}`}
                    >
                      <img
                        src={imageUrl2}
                        className='aspect-square w-full h-full object-contain bg-gray-4'
                        alt={`product detail slide ${index + 1}`}
                      />
                    </div>
                  </SwiperSlide>
                </>
              );
            })}
          </Swiper>
          <div className='absolute left-0 top-0 flex h-full w-full items-center'>
            <div className='flex w-full justify-between'>
              <button
                className={`swiper-button-prev-product-detail relative z-30 w-5 -translate-x-1/2 sm:w-10 cursor-pointer  ${
                  !canPrevious ? 'opacity-50' : 'opacity-100 hover:brightness-75'
                }`}
              >
                <img
                  src='https://res.cloudinary.com/cloudinarymen/image/upload/v1743358606/makotodecor/backgrounds/button_prev_kgqdqn.png'
                  alt='button_prev'
                  className='object-contain '
                />
              </button>
              <button
                className={`swiper-button-next-product-detail relative z-30 w-5 translate-x-1/2 sm:w-10 cursor-pointer ${
                  !canNext ? 'opacity-50' : 'opacity-100 hover:brightness-75'
                }`}
              >
                <img
                  src='https://res.cloudinary.com/cloudinarymen/image/upload/v1743358606/makotodecor/backgrounds/button_next_kovak2.png'
                  alt='button_next'
                  className='object-contain'
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
