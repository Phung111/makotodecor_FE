import Part from './Part';
import Size from './Size';
import Color from './Color';
import ButtonCustom from '../../../../components/buttons/ButtonCustom';

const mockSizes = [
  { size: 'S', price: 500000, priceFirst: 700000 },
  { size: 'M', price: 600000, priceFirst: 800000 },
  { size: 'L', price: 700000, priceFirst: 900000 },
];

const mockColors = [
  {
    color: 'red',
    img: 'https://res.cloudinary.com/cloudinarymen/image/upload/v1750435557/makotodecor/temp/red.png',
  },
  {
    color: 'blue',
    img: 'https://res.cloudinary.com/cloudinarymen/image/upload/v1750435557/makotodecor/temp/blue.png',
  },
  {
    color: 'yellow',
    img: 'https://res.cloudinary.com/cloudinarymen/image/upload/v1750435557/makotodecor/temp/yellow.png',
  },
];

const mockText = 'Đây là mô tả sản phẩm mẫu để test textarea, đủ 50 ký tự!';

export default function InfoDetail() {
  return (
    <>
      <div className='w-full h-full flex flex-col gap_global'>
        <h1 className='text-2xl font-bold capitalize sm:text-3xl'>daruma</h1>
        <div className='flex items-center gap-1'>
          <p className='text-sm font-semibold sm:text-base'>9999</p>
          <p className='text-black/70'>Sold</p>
        </div>
        <div className='flex h-[66px] items-center gap-2 bg-gray-3 px-5'>
          <p className='text-2xl uppercase text-primary sm:text-[30px]'>₫700000</p>
          <p className='text-sm text-black/50 line-through sm:text-base'>₫1000000</p>
          {/* {selectedPriceFirst && ( */}
          <p className='bg-primary px-1 text-[8px] font-bold uppercase text-white sm:py-0.5 sm:text-xs'>30% off</p>
          {/* )} */}
        </div>
        <Part title={'loại'}>búp bê</Part>
        <Size array={mockSizes} setSelectedSizeAndPrice={() => {}} />
        <Color array={mockColors} />
        <textarea className='w-full shrink-0 !resize-none bg-gray-3 p-2 text-black/50 outline-none' rows='6' value={mockText} readOnly></textarea>
        <div className='flex flex-col-reverse items-center justify-between gap-5 sm:flex-row md:flex-col-reverse lg:flex-row'>
          <a href='https://www.facebook.com/Makoto.decor' rel='noopener noreferrer' target='_blank' className='h-[48px] w-[180px] shrink-0'>
            <ButtonCustom type='solid'>liên hệ</ButtonCustom>
          </a>
          <div className='flex flex-col items-center gap-5 sm:flex-row'>
            <p className=''>Quà tặng</p>
            <div className='flex items-center gap-2 h-[120px]'>
              <img
                src='https://res.cloudinary.com/cloudinarymen/image/upload/v1743358655/makotodecor/backgrounds/gift1_poyffg.png'
                alt='gift'
                className='object-contain h-full aspect-square'
              />
              <i className='fa-solid fa-plus'></i>
              <img
                src='https://res.cloudinary.com/cloudinarymen/image/upload/v1743358655/makotodecor/backgrounds/gift2_s6iakj.png'
                alt='gift'
                className='object-contain h-full aspect-square'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
