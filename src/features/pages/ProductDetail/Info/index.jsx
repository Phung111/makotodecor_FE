import ImageSlide from './ImageSlide';
import InfoDetail from './InfoDetail';

export default function Info() {
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-12 gap_global'>
        <div className='md:col-span-6 lg:col-span-5'>
          <ImageSlide />
        </div>
        <div className='md:col-span-6 lg:col-span-7'>
          <InfoDetail />
        </div>
      </div>
    </>
  );
}
