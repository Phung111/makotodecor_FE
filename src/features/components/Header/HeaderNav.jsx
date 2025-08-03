import { AlignJustify } from 'lucide-react';

export default function HeaderNav() {
  const navItemClass = 'relative group w-full border-b-1 border-white/70';
  const navLinkClass = 'text-[16px] transition-colors duration-300 hover:text-primary block py-2 whitespace-nowrap flex justify-center';
  const underlineClass = 'absolute bottom-0 left-0 w-0 h-[2.5px] bg-primary transition-all duration-300 group-hover:w-full';

  return (
    <>
      <nav id='header__nav' className='w-full'>
        <ul className='not-md:flex-col flex gap-4 items-center h-full w-full'>
          <li className={navItemClass}>
            <a className={navLinkClass} href=''>
              Trang chủ
            </a>
            <div className={underlineClass}></div>
          </li>
          <li className={navItemClass}>
            <a className={navLinkClass} href=''>
              Sản phẩm
            </a>
            <div className={underlineClass}></div>
          </li>
          <li className={navItemClass}>
            <a className={navLinkClass} href=''>
              Landing Page
            </a>
            <div className={underlineClass}></div>
          </li>
        </ul>
      </nav>
    </>
  );
}
