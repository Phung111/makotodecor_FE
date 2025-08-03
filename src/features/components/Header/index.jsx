import HeaderLogo from './HeaderLogo';
import HeaderNav from './HeaderNav';
import HeaderSearch from './HeaderSearch';
import HeaderActions from './HeaderActions';

export default function Header() {
  return (
    <>
      <header id='header'>
        <div className='container'>
          <div className='flex items-end h-[56px] md:h-[78px]'>
            <div className='flex w-full justify-between h-[36px] md:h-[48px] gap-10'>
              <div className='flex gap-5'>
                <HeaderLogo />
                <span className='hidden lg:block'>
                  <HeaderNav />
                </span>
              </div>
              <div className='flex gap-5'>
                <div className='hidden lg:block'>
                  <HeaderSearch />
                </div>
                <HeaderActions />
              </div>
            </div>
          </div>
          <div className='br_line my_global' />
        </div>
      </header>
    </>
  );
}
