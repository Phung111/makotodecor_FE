import SwiperIntroduce from './SwiperIntroduce';
import Cat from '../../../../components/Other/Cat';

export default function Slide() {
  return (
    <>
      <div className='relative flex flex-col justify-center items-center w-full h-full p-6'>
        <div className='absolute w-full h-[80%] flex justify-center items-center'>
          <img
            className='w-full h-full object-contain brightness-0 invert'
            src='https://res.cloudinary.com/cloudinarymen/image/upload/v1743358608/makotodecor/backgrounds/loading_akamr3.png'
          />
        </div>
        <div className='flex w-full justify-center items-center h-full relative'>
          <SwiperIntroduce />
        </div>
        <div className='absolute bottom-0 right-[28%] z-2'>
          <Cat />
        </div>
      </div>
    </>
  );
}
