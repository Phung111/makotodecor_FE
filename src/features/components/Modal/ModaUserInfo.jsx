import { FolderKanban, KeyRound, LogOut } from 'lucide-react';
import ButtonCustom from '../buttons/ButtonCustom';

export default function ModaUserInfo() {
  const handleModaUserInfoManage = () => {
    console.log('Quản lý clicked');
    // Thêm logic xử lý quản lý
  };

  const handleModaUserInfoLogin = () => {
    console.log('Đăng nhập clicked');
    // Thêm logic xử lý đăng nhập
  };

  const handleModaUserInfoLogout = () => {
    console.log('Đăng xuất clicked');
    // Thêm logic xử lý đăng xuất
  };

  return (
    <>
      <div className='flex flex-col gap-4 items-center'>
        <div className='flex gap-2 items-center'>
          <p className=''>Xin chào!</p>
          {'-'}
          <p className=''>Men Phạm</p>
        </div>

        <MenuButton icon={FolderKanban} onClick={handleModaUserInfoManage}>
          Quản lý
        </MenuButton>

        <MenuButton icon={KeyRound} onClick={handleModaUserInfoLogin}>
          Đăng Nhập
        </MenuButton>

        <MenuButton icon={LogOut} onClick={handleModaUserInfoLogout}>
          Đăng Xuất
        </MenuButton>
      </div>
    </>
  );
}

function MenuButton({ children, icon: Icon, onClick }) {
  const iconSize = 24;
  const buttonClass = 'p-2 gap-10 !w-[180px] !justify-between';

  return (
    <div className='' onClick={onClick}>
      <ButtonCustom type='solid' className={buttonClass}>
        {children}
        <Icon style={{ width: iconSize, height: iconSize }} />
      </ButtonCustom>
    </div>
  );
}
