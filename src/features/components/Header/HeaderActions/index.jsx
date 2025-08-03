import { MessageCircleMore, CircleUserRound, ShoppingCart, Search, AlignJustify } from 'lucide-react';
import { setModalSearchProduct, setModalHeaderNav, setModalUserInfo } from '../../../../slice/modalSlice';
import { useDispatch } from 'react-redux';
import UserDropdown from './UserDropdown';

export default function HeaderActions() {
  const dispatch = useDispatch();

  const iconClass = `relative hover:text-white hover:bg-primary text-gray-7 cursor-pointer transition-all duration-400 bg-gray-2 rounded-full w-8 md:w-10 aspect-square flex items-center justify-center`;

  const handleOpenModalSearchProduct = () => {
    dispatch(setModalSearchProduct(true));
  };

  const handleOpenModalHeaderNav = () => {
    dispatch(setModalHeaderNav(true));
  };

  const handleOpenModalUserInfo = () => {
    dispatch(setModalUserInfo(true));
  };

  return (
    <>
      <div id='header__action' className='flex gap-2 items-center h-full'>
        <div onClick={handleOpenModalSearchProduct} className={`${iconClass} lg:hidden flex`}>
          <Search />
        </div>
        <div className={iconClass}>
          <ShoppingCart />
          <span className='absolute -top-[2.5px] -right-[2.5px] bg-yellow-5 text-white rounded-full text-xs w-5 aspect-square flex items-center justify-center'>
            99
          </span>
        </div>
        <a href='https://www.facebook.com/messages/t/184831344724221' target='_blank' rel='noopener noreferrer' className={iconClass}>
          <MessageCircleMore />
        </a>
        <UserDropdown iconClass={iconClass} />
        <div onClick={handleOpenModalHeaderNav} className={`${iconClass} lg:hidden flex`}>
          <AlignJustify />
        </div>
      </div>
    </>
  );
}
