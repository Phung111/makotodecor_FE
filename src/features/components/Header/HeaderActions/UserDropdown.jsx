import { CircleUserRound, User, Settings, LogOut, Heart, Package, LogIn } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setModalUserInfo } from '../../../../slice/modalSlice';

export default function UserDropdown({ iconClass }) {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userIconRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && userIconRef.current && !userIconRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleUserAction = (action) => {
    setIsDropdownOpen(false);

    switch (action) {
      case 'profile':
        dispatch(setModalUserInfo(true));
        break;
      case 'orders':
        // Navigate to orders page
        console.log('Navigate to orders');
        break;
      case 'wishlist':
        // Navigate to wishlist page
        console.log('Navigate to wishlist');
        break;
      case 'settings':
        // Navigate to settings page
        console.log('Navigate to settings');
        break;
      case 'logout':
        // Handle logout
        console.log('Logout user');
        break;
      default:
        break;
    }
  };

  return (
    <div className='relative'>
      <div ref={userIconRef} onClick={toggleDropdown} className={`${iconClass} ${isDropdownOpen ? 'bg-primary text-white' : ''}`}>
        <CircleUserRound />
      </div>

      {/* User Dropdown */}
      {isDropdownOpen && (
        <div ref={dropdownRef} className='absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50'>
          {/* User Info Header */}
          <div className='px-4 py-3 border-b border-gray-100 flex flex-col gap-1'>
            <p className='text-sm font-medium text-gray-900 truncate'>Nguyễn Văn A</p>
            <p className='text-xs text-gray-500'>user@example.com</p>
          </div>

          {/* Menu Items */}
          <div className='py-1'>
            <button
              onClick={() => handleUserAction('profile')}
              className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-primary hover:text-white cursor-pointer flex items-center gap-3'
            >
              <User />
              Thông tin cá nhân
            </button>

            <button
              onClick={() => handleUserAction('orders')}
              className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-primary hover:text-white cursor-pointer flex items-center gap-3'
            >
              <Package />
              Quản lý sản phẩm
            </button>

            <button
              onClick={() => handleUserAction('wishlist')}
              className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-primary hover:text-white cursor-pointer flex items-center gap-3'
            >
              <Heart />
              Sản phẩm yêu thích
            </button>

            <button
              onClick={() => handleUserAction('settings')}
              className='w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-primary hover:text-white cursor-pointer flex items-center gap-3'
            >
              <Settings />
              Cài đặt
            </button>
          </div>

          {/* Logout */}
          <div className='py-1 border-t border-gray-100'>
            <button
              onClick={() => handleUserAction('logout')}
              className='w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-primary hover:text-white cursor-pointer flex items-center gap-3'
            >
              <LogIn />
              Đăng nhập
            </button>
            <button
              onClick={() => handleUserAction('logout')}
              className='w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-primary hover:text-white cursor-pointer flex items-center gap-3'
            >
              <LogOut />
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
