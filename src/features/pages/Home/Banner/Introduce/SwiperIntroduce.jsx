import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useRef } from 'react';

export default function SwiperIntroduce() {
  const nextButtonRef = useRef(null);

  return (
    <>
      <Swiper
        modules={[Autoplay, Navigation]}
        navigation={{
          nextEl: '.button_next',
        }}
        // direction='vertical'
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        speed={3000}
        className='h-full w-full'
      >
        {/* <SwiperSlide><img src='https://res.cloudinary.com/cloudinarymen/image/upload/v1743358608/makotodecor/backgrounds/loading_akamr3.png' alt='next1' className='object-contain' /></SwiperSlide> */}
        <SwiperSlide></SwiperSlide>
        <SwiperSlide>
          <img src='https://res.cloudinary.com/cloudinarymen/image/upload/v1743358609/makotodecor/backgrounds/next2_i2c7nj.png' alt='next3' className='object-contain h-full w-full' />
        </SwiperSlide>
        <SwiperSlide>
          <img src='https://res.cloudinary.com/cloudinarymen/image/upload/v1743358611/makotodecor/backgrounds/next3_ubguni.png' alt='next2' className='object-contain h-full w-full' />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
