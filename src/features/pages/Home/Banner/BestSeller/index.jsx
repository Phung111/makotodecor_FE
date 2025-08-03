import { ArrowRight } from 'lucide-react';

export default function BestSeller() {
  const handleClickBuyNow = () => {
    console.log('handleClickBuyNow');
  };

  return (
    <>
      <div className='relative flex overflow-hidden items-center w-full h-full'>
        <div className='relative z-1 flex flex-col h-full gap-2 md:gap-4 justify-center p-4'>
          <p className='text-2xl md:text-4xl font-garamond'>20% off</p>

          <p className='flex items-center gap-2'>
            <span className='br_line bg-black w-10'></span>
            <span className='text-[10px] leading-0'>SALE</span>
          </p>
          <h3 className='text-2xl md:text-4xl font-bold'>Bán chạy nhất</h3>
          <button onClick={handleClickBuyNow} className='flex items-center gap-2 cursor-pointer hover:text-primary w-[130px]'>
            Mua ngay <ArrowRight className='!w-[20px] !h-[20px]' />
          </button>
        </div>
        <div className='absolute w-full h-[150%] top-0 right-0 flex justify-end'>
          <img
            className='object-cover'
            src='https://res.cloudinary.com/cloudinarymen/image/upload/v1750352608/makotodecor/backgrounds/Pngtree_mascot_japan_red_daruma_6600704_kfew8w.png'
            alt='product best seller'
          />
        </div>
      </div>
    </>
  );
}
