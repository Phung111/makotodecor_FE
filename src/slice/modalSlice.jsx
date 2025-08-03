import { createSlice } from '@reduxjs/toolkit';

const namespace = 'modalSlice';

const initialState = {
  modalSearchProduct: false,
  modalHeaderNav: false,
  modalUserInfo: false,
};

const modalSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setModalSearchProduct: (state, action) => {
      state.modalSearchProduct = action.payload;
    },
    setModalHeaderNav: (state, action) => {
      state.modalHeaderNav = action.payload;
    },
    setModalUserInfo: (state, action) => {
      state.modalUserInfo = action.payload;
    },
  },
});

const { reducer, actions } = modalSlice;

/* prettier-ignore */
export const { 
  setModalSearchProduct,
  setModalHeaderNav,
  setModalUserInfo,
} = actions

export default reducer;
