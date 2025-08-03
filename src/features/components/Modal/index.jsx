import { useSelector, useDispatch } from 'react-redux';
import { setModalSearchProduct, setModalHeaderNav, setModalUserInfo } from '@/slice/modalSlice';
import BaseModal from './BaseModal';
import ModalSearchProduct from './ModalSearchProduct';
import ModalHeaderNav from './ModalHeaderNav';
import ModaUserInfo from './ModaUserInfo';

export default function Modal() {
  const dispatch = useDispatch();

  /* prettier-ignore */
  const { 
    modalSearchProduct, 
    modalHeaderNav, 
    modalUserInfo,
  } = useSelector((state) => state.modalSlice);

  const handleCloseSearchProduct = () => {
    dispatch(setModalSearchProduct(false));
  };

  const handleCloseHeaderNav = () => {
    dispatch(setModalHeaderNav(false));
  };

  const handleCloseModaUserInfo = () => {
    dispatch(setModalUserInfo(false));
  };

  return (
    <>
      {modalSearchProduct && (
        <BaseModal onClose={handleCloseSearchProduct} id='modal_search_product'>
          <ModalSearchProduct />
        </BaseModal>
      )}

      {modalHeaderNav && (
        <BaseModal onClose={handleCloseHeaderNav} id='modal_header_nav'>
          <ModalHeaderNav />
        </BaseModal>
      )}

      {/* {modalUserInfo && (
        <BaseModal onClose={handleCloseModaUserInfo} id='modal_user_info'>
          <ModaUserInfo />
        </BaseModal>
      )}
      <BaseModal onClose={handleCloseModaUserInfo} id='modal_user_info'>
        <ModaUserInfo />
      </BaseModal> */}
    </>
  );
}
