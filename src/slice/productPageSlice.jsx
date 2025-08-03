import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productPageService from '../service/productPageService';
import { HTTP_STATUS } from '../app/global';

const namespace = 'productPageSlice';

const initialState = {
  request: {
    productSize: 60,
    currentPage: 1,
    keySearch: '',

    latest: true,
    nameAsc: '',
    priceAsc: '',
    topsales: '',

    eCategories: [],
    eTopLengths: [],
    eCountries: [],
    eSeasons: [],
    eStyles: [],
    eShipsFroms: [],

    priceFrom: '',
    priceTo: '',
  },
  respond: {
    products: [],

    size: 10, // kích thước trang
    numberOfElements: 9, // số phần tử trên trang hiện tại
    totalElements: 200, //tổng phần tử
    offset: 21, // phần tử đầu tiên của trang là số 21
    pageNumber: 0, //trang số ~~ gần với trường "number"
    totalPages: 9, //tổng số trang
    last: false,
    first: true,
    empty: false,
  },
  noData: false,
  seemore: [],
  count: 2,
};

export const getProductPage = createAsyncThunk(`${namespace}/getProductPage`, async (obj, { rejectWithValue, getState, dispatch }) => {
  const { request } = getState().productPageSlice;

  let formData = new FormData();
  formData.set('productSize', request.productSize);
  formData.set('currentPage', request.currentPage);
  formData.set('keySearch', request.keySearch);

  const latest = request.latest == null ? '' : request.latest;
  const nameAsc = request.nameAsc == null ? '' : request.nameAsc;
  const priceAsc = request.priceAsc == null ? '' : request.priceAsc;
  const topsales = request.topsales == null ? '' : request.topsales;

  formData.set('latest', latest);
  formData.set('nameAsc', nameAsc);
  formData.set('priceAsc', priceAsc);
  formData.set('topsales', topsales);

  const eCategories = request.eCategories;
  eCategories.forEach((item, index) => {
    formData.append(`eCategories[${index}]`, item);
  });

  const eTopLengths = request.eTopLengths;
  eTopLengths.forEach((item, index) => {
    formData.append(`eTopLengths[${index}]`, item);
  });

  const eCountries = request.eCountries;
  eCountries.forEach((item, index) => {
    formData.append(`eCountries[${index}]`, item);
  });

  const eSeasons = request.eSeasons;
  eSeasons.forEach((item, index) => {
    formData.append(`eSeasons[${index}]`, item);
  });

  const eStyles = request.eStyles;
  eStyles.forEach((item, index) => {
    formData.append(`eStyles[${index}]`, item);
  });

  const eShipsFroms = request.eShipsFroms;
  eShipsFroms.forEach((item, index) => {
    formData.append(`eShipsFroms[${index}]`, item);
  });

  formData.set('priceFrom', request.priceFrom);
  formData.set('priceTo', request.priceTo);

  // const formDataObj = Object.fromEntries(formData.entries())
  // console.log(formDataObj)

  return await clothShopService
    .getProductPage(formData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return rejectWithValue(error);
    })
    .finally(() => {});
});

const productPageSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setProductSize: (state, action) => {
      state.request.productSize = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.request.currentPage = action.payload;
    },
    setKeySearch: (state, action) => {
      state.request.keySearch = action.payload;
    },
    setLatest: (state, action) => {
      state.request.latest = action.payload;
      state.request.nameAsc = null;
      state.request.priceAsc = null;
      state.request.topsales = null;
    },
    setNameAsc: (state, action) => {
      state.request.latest = null;
      state.request.nameAsc = action.payload;
      state.request.priceAsc = null;
      state.request.topsales = null;
    },
    setPriceAsc: (state, action) => {
      state.request.latest = null;
      state.request.nameAsc = null;
      state.request.priceAsc = action.payload;
      state.request.topsales = null;
    },
    setTopsales: (state, action) => {
      state.request.latest = null;
      state.request.nameAsc = null;
      state.request.priceAsc = null;
      state.request.topsales = action.payload;
    },
    setECategories: (state, action) => {
      state.request.eCategories = action.payload;
    },
    emptyECategories: (state) => {
      state.request.eCategories = [];
    },
    setETopLengths: (state, action) => {
      state.request.eTopLengths = action.payload;
    },
    setECountries: (state, action) => {
      state.request.eCountries = action.payload;
    },
    setESeasons: (state, action) => {
      state.request.eSeasons = action.payload;
    },
    setEStyles: (state, action) => {
      state.request.eStyles = action.payload;
    },
    setEShipsFroms: (state, action) => {
      state.request.eShipsFroms = action.payload;
    },
    setPriceFrom: (state, action) => {
      state.request.priceFrom = action.payload;
    },
    setPriceTo: (state, action) => {
      state.request.priceTo = action.payload;
    },
    setSize: (state, action) => {
      state.request.productSize = action.payload;
    },
    clearAllFilters: (state) => {
      state.request.latest = true;
      state.request.nameAsc = null;
      state.request.priceAsc = null;
      state.request.topsales = null;

      state.request.eCategories = [];
      state.request.eTopLengths = [];
      state.request.eCountries = [];
      state.request.eSeasons = [];
      state.request.eStyles = [];
      state.request.eShipsFroms = [];

      state.request.priceFrom = '';
      state.request.priceTo = '';
    },
    setSeeMore: (state) => {
      state.seemore = [...state.seemore, ...state.respond.products];
    },
    emptySeeMore: (state) => {
      state.seemore = [];
    },
    upCount: (state) => {
      state.count++;
    },
    resetCount: (state) => {
      state.count = 2;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProductPage.pending, (state) => {
        state.status = HTTP_STATUS.PENDING;
      })
      .addCase(getProductPage.fulfilled, (state, { payload }) => {
        state.status = HTTP_STATUS.FULFILLED;

        let dataRes = payload;
        if (dataRes) {
          state.respond.products = dataRes.content;
          state.respond.size = dataRes.size;
          state.respond.numberOfElements = dataRes.numberOfElements;
          state.respond.totalElements = dataRes.totalElements;
          state.respond.offset = dataRes.pageable.offset;
          state.respond.pageNumber = dataRes.pageable.pageNumber;
          state.respond.totalPages = dataRes.totalPages;
          state.respond.last = dataRes.last;
          state.respond.first = dataRes.first;
          state.respond.empty = dataRes.empty;
          state.noData = false;
        } else {
          state.respond.products = [];
          state.seemore = [];
          state.noData = true;
        }
      })
      .addCase(getProductPage.rejected, (state, { payload }) => {
        state.status = HTTP_STATUS.REJECTED;

        if (payload && payload.response) {
          state.errorMessage = payload.response.statusText;
          state.errorStatus = payload.response.status;
        }
      });
  },
});

const { reducer, actions } = productPageSlice;

/* prettier-ignore */
export const { 
  emptyECategories, 
  upCount, 
  resetCount, 
  setSeeMore, 
  emptySeeMore, 
  setProductSize, 
  setCurrentPage, 
  setKeySearch, 
  setLatest, 
  setNameAsc, 
  setPriceAsc, 
  setTopsales, 
  setECategories, 
  setETopLengths, 
  setECountries, 
  setESeasons, 
  setEStyles, 
  setEShipsFroms, 
  setPriceFrom, 
  setPriceTo, 
  setSize, 
  clearAllFilters 
} = actions

export default reducer;
