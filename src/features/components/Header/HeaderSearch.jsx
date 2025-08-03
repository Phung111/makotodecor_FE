import CategoryDropdown from './CategoryDropdown';

export default function HeaderSearch({ className }) {
  return (
    <>
      <div id='header__search' className={`xl:w-[500px] h-full bg-gray-2 rounded-[12px] px-4 ${className}`}>
        <div className='flex w-full h-full items-center'>
          <div className='flex items-center w-[125px] xl:w-[150px] h-full shrink-0'>
            <CategoryDropdown />
          </div>
          <div className='flex w-full h-full items-center'>
            <div className='w-full pl-4 py-1'>
              <input className='text-gray-9' type='text' placeholder='Tìm kiếm sản phẩm...' />
            </div>
            <div className='text-[20px] px-2 text-gray-7 hover:text-primary cursor-pointer'>
              <i className='fa-solid fa-magnifying-glass' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
