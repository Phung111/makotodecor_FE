const SERVER_API = import.meta.env.VITE_REACT_APP_API_URL + '/api';
export const SOCKET_SERVER = import.meta.env.VITE_REACT_APP_SOCKET_SERVER;
const CLOUDINARY_URL = import.meta.env.VITE_REACT_APP_CLOUDINARY_URL;

export const HTTP_STATUS = Object.freeze({
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
});

export const ROLES = Object.freeze({
  ADMIN: 'ADMIN',
  USER: 'USER',
  GUESS: 'GUESS',
});

export const CLOUDINARY = {
  url: CLOUDINARY_URL,
  SCALE_IMAGE_560_170: 'c_limit,w_560,h_170,q_100',
  SCALE_IMAGE_450_450: 'c_limit,w_450,h_450,q_100',
  SCALE_IMAGE_300_300: 'c_limit,w_300,h_300,q_100',
  SCALE_IMAGE_200_200: 'c_limit,w_200,h_200,q_100',
  SCALE_IMAGE_100_100: 'c_limit,w_100,h_100,q_100',
};

const CLOTHSHOP_URL = `${SERVER_API}/clothshop`;
const PRODUCT_URL = `${SERVER_API}/product`;
const AUTH_URL = `${SERVER_API}/auth`;
const CART_URL = `${SERVER_API}/cart`;
const ORDER_URL = `${SERVER_API}/order`;
const ADDRESS_URL = `${SERVER_API}/address`;
const VOUCHER_URL = `${SERVER_API}/voucher`;
const DISCOUNT_URL = `${SERVER_API}/discount`;
const BANNER_URL = `${SERVER_API}/banner`;

export const CLOTHSHOP_API_URL = {
  CLOTHSHOP_GET_ALL: `${SERVER_API}/clothshop`,

  CLOTHSHOP: {
    GET_HOME: `${CLOTHSHOP_URL}/get-home`,
    GET_COLLECTION: `${CLOTHSHOP_URL}/get-collection`,
    GET_PRONVICE: `${CLOTHSHOP_URL}/getPronvice`,
    GET_GENDER: `${CLOTHSHOP_URL}/getGender`,
  },

  PRODUCT: {
    GET_ALL: `${PRODUCT_URL}/get-all`,
    GET_PAGE: `${PRODUCT_URL}/get-product-page`,
    GET_DETAIL: `${PRODUCT_URL}`,
    CREATE: `${PRODUCT_URL}/create`,
    UPDATE: `${PRODUCT_URL}/update`,
    DELETE: `${PRODUCT_URL}/delete`,
  },
  AUTH: {
    GET_ALL: `${AUTH_URL}/get-all`,
    REGISTER: `${AUTH_URL}/register`,
    LOGIN: `${AUTH_URL}/login`,
    LOGOUT: `${AUTH_URL}/logout`,
  },
  CART: {
    GET_CART: `${CART_URL}`,
    ADD_CART_ITEM: `${CART_URL}/addCartItem`,
    INCREASE_CART_ITEM: `${CART_URL}/increaseCartItem`,
    DECREASE_CART_ITEM: `${CART_URL}/decreaseCartItem`,
    CHANGE_QUANTITY_CART_ITEM: `${CART_URL}/changeQuantityCartItem`,
    DELETE_CART_ITEM: `${CART_URL}/deleteCartItem`,
    CHECKOUT: `${CART_URL}/checkout`,
  },
  ORDER: {
    PLACE_ORDER: `${ORDER_URL}/placeOrder`,
    GET_ORDER: `${ORDER_URL}/get-order`,
    GET_ORDER_BY_CUSTOMER: `${ORDER_URL}/get-order-by-customer`,
    GET_ORDER_BY_ID: `${ORDER_URL}/get-order`,
  },
  ADDRESS: {
    GET_ALL: `${ADDRESS_URL}`,
    CREATE: `${ADDRESS_URL}/create`,
    DEFAULT: `${ADDRESS_URL}/default`,
    UPDATE: `${ADDRESS_URL}/update`,
    DELETE: `${ADDRESS_URL}/delete`,
    CHANGE: `${ADDRESS_URL}/change`,
  },
  VOUCHER: {
    GET_ALL: `${VOUCHER_URL}`,
    GET_PAGE: `${VOUCHER_URL}/get-voucher-page`,
    GET_PAGE_VALID: `${VOUCHER_URL}/get-voucher-page-valid`,
    CREATE: `${VOUCHER_URL}/create`,
    CHOSE: `${VOUCHER_URL}/chose`,
  },
  DISCOUNT: {
    CREATE: `${DISCOUNT_URL}/create`,
    CHECK_DATE: `${DISCOUNT_URL}/checkDate`,
  },
  BANNER: {
    GET_ALL: `${BANNER_URL}`,
    GET_PAGE: `${BANNER_URL}/get-banner-page`,
    CREATE: `${BANNER_URL}/create`,
    DELETE: `${BANNER_URL}/delete`,
    DELETES: `${BANNER_URL}/deletes`,
  },
};
