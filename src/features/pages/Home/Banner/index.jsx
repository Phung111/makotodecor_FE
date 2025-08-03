import Introduce from './Introduce';
import BestSeller from './BestSeller';
import Discount from './Discount';

export default function Banner() {
  return (
    <>
      <section id='banner'>
        <div className='grid grid-cols-2 md:grid-cols-12 grid-rows-2 gap_global md:h-[580px]'>
          <div className='bg-gradient-to-r from-orange-100 to-orange-50 col-span-2 md:col-span-7 row-span-2 rounded-lg'>
            <Introduce />
          </div>
          <div className='bg-gradient-to-r from-green-100 to-green-50 col-span-2 md:col-span-5 row-span-1 rounded-lg'>
            <BestSeller />
          </div>
          <div className='bg-gradient-to-r from-blue-100 to-blue-50 col-span-2 md:col-span-5 row-span-1 rounded-lg'>
            <Discount />
          </div>
        </div>
      </section>
    </>
  );
}
