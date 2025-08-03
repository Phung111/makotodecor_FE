import Product from './Product';
import PaginationProduct from '../../../components/Other/PaginationProduct';

export default function Products() {
  const products = [
    { id: 1, name: 'Sunstar Fresh Melon Juice', price: 18, rating: 4.5, unit: '1 Unit', image: '🍈', discount: 30 },
    { id: 2, name: 'Organic Bananas', price: 12, rating: 4.2, unit: '1 kg', image: '🍌' },
    { id: 3, name: 'Fresh Cucumber', price: 8, rating: 4.0, unit: '500g', image: '🥒' },
    { id: 4, name: 'Fresh Milk', price: 15, rating: 4.8, unit: '1L', image: '🥛' },
    { id: 5, name: 'Orange Juice', price: 18, rating: 4.3, unit: '1L', image: '🍊', discount: 15 },
    { id: 6, name: 'Fresh Raspberries', price: 25, rating: 4.6, unit: '250g', image: '🫐' },
  ];

  return (
    <>
      <section id='products' className='py_global'>
        <div className='flex flex-col gap_global'>
          <div className='flex justify-between gap-4'>
            <h2 className='text-3xl font-bold text-gray-800'>Sản phẩm</h2>
            <div className='flex gap-1 md:gap-3'>
              <div className='flex rounded-md border-primary border-2 h-10 px-2 items-center gap-2 text-primary hover:bg-primary hover:text-white cursor-pointer'>
                <span className=''>Tên</span>
                <span className='flex flex-col justify-center items-center bg-black/20 '>
                  <i className={`fa-solid fa-sort-up !leading-0 text-[16px]`} />
                  <i className={`fa-solid fa-sort-down !leading-0 text-[16px]`} />
                </span>
              </div>
              <div className='flex rounded-md border-primary border-2 h-10 px-2 items-center gap-2 text-primary hover:bg-primary hover:text-white cursor-pointer'>
                <span className=''>Giá</span>
                <span className='flex flex-col justify-center items-center bg-black/20 '>
                  <i className={`fa-solid fa-sort-up !leading-0 text-[16px]`} />
                  <i className={`fa-solid fa-sort-down !leading-0 text-[16px]`} />
                </span>
              </div>
              <div className='flex rounded-md border-primary border-2 h-10 px-2 items-center gap-2 text-primary hover:bg-primary hover:text-white cursor-pointer'>
                <span className='line-clamp-1'>Đã bán</span>
                <span className='flex flex-col justify-center items-center bg-black/20 '>
                  <i className={`fa-solid fa-sort-up !leading-0 text-[16px]`} />
                  <i className={`fa-solid fa-sort-down !leading-0 text-[16px]`} />
                </span>
              </div>
            </div>
          </div>

          <div className='br_line' />
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap_global py-4'>
            {products && products.map((item, index) => <Product key={index} product={item} />)}
          </div>
          <PaginationProduct />
        </div>
      </section>
    </>
  );
}
