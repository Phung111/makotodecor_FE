import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useRef } from 'react';

export default function SwiperCategory() {
  const categories = [
    { name: 'Rèm Noren', icon: '🥦' },
    { name: 'Cờ gỗ', icon: '🥖' },
    { name: 'Daruma', icon: '🥤' },
    { name: 'Thẻ gỗ', icon: '🍷' },
    { name: 'Gối ôm', icon: '🍗' },
    { name: 'Dairy & Eggs', icon: '🥛' },
    { name: 'Rèm Noren', icon: '🥦' },
    { name: 'Cờ gỗ', icon: '🥖' },
    { name: 'Daruma', icon: '🥤' },
    { name: 'Thẻ gỗ', icon: '🍷' },
    { name: 'Gối ôm', icon: '🍗' },
    { name: 'Dairy & Eggs', icon: '🥛' },
  ];

  return (
    <div className='relative'>
      <div className='absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none'></div>
      <div className='absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none'></div>
      <Swiper
        modules={[Autoplay, Navigation]}
        navigation={{
          nextEl: '.button_next',
        }}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        slidesPerView={4}
        spaceBetween={20}
        speed={10000}
        breakpoints={{
          0: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 40,
          },
        }}
        className='h-full w-full !p-5'
        style={{
          '--swiper-wrapper-transition-timing-function': 'linear',
        }}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index} className='group'>
            <div className='bg-white aspect-square rounded-2xl p-6 text-center shadow-custom-light hover:shadow-custom-medium transition-all cursor-pointer duration-500 transform hover:-translate-y-3 border border-[#FBFBFB] flex flex-col items-center justify-center'>
              <div className='relative w-full h-full flex justify-center items-center flex-col'>
                <div className='absolute aspect-square rounded-full h-full bg-gray-3'></div>
                <img src='https://res.cloudinary.com/cloudinarymen/image/upload/v1750352608/makotodecor/backgrounds/Pngtree_mascot_japan_red_daruma_6600704_kfew8w.png' alt='next3' className='object-contain h-full w-full transition-all duration-500 hover:-translate-y-6 z-1' />
                <h3 className='font-semibold text-gray-800 group-hover:text-yellow-600 transition-colors z-1 text-nowrap'>{category.name}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
