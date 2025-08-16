import { configureStore } from '@reduxjs/toolkit';

import loadingMiddleware from './loadingMiddleware';

import productPageSlice from '../slice/productPageSlice';
import modalSlice from '../slice/modalSlice';
import managementProductSlice from '../slice/managementProductSlice';
import managementOrderSlice from '../slice/managementOrderSlice';
import managementUserSlice from '../slice/managementUserSlice';

const store = configureStore({
  reducer: {
    productPageSlice: productPageSlice,
    modalSlice: modalSlice,
    managementProductSlice: managementProductSlice,
    managementOrderSlice: managementOrderSlice,
    managementUserSlice: managementUserSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loadingMiddleware),
});

export default store;
