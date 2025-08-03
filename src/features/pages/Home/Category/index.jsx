import SwiperCategory from './SwiperCategory';

export default function Category() {
  const categories = [
    { name: 'Rèm Noren', icon: '🥦' },
    { name: 'Cờ gỗ', icon: '🥖' },
    { name: 'Daruma', icon: '🥤' },
    { name: 'Thẻ gỗ', icon: '🍷' },
    { name: 'Gối ôm', icon: '🍗' },
    { name: 'Dairy & Eggs', icon: '🥛' },
  ];

  return (
    <>
      <section id='category' className='py_global'>
        <h2 className='text-3xl font-bold text-gray-800'>Danh mục</h2>
        <div className='br_line my_global' />
        <SwiperCategory />
      </section>
    </>
  );
}
