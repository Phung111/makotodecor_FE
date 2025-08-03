import { configureStore } from '@reduxjs/toolkit';

import loadingMiddleware from './loadingMiddleware';

import productPageSlice from '../slice/productPageSlice';
import modalSlice from '../slice/modalSlice';

const store = configureStore({
  reducer: {
    productPageSlice: productPageSlice,
    modalSlice: modalSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loadingMiddleware),
});

export default store;
