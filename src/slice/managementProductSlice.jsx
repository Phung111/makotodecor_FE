import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const namespace = 'managementProductSlice';

// Mock API function - sẽ thay thế bằng API thật sau này
const mockProductAPI = {
  getProducts: async (params) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockData = [
      {
        id: 'SP001',
        code: 'SP001',
        name: 'Vay tiêu dùng',
        status: 'Đang bán',
        type: 'Tín chấp',
        updated: '09/12/2025 09:30',
      },
      {
        id: 'SP002',
        code: 'SP002',
        name: 'Vay mua xe',
        status: 'Ngừng bán',
        type: 'Thế chấp',
        updated: '08/12/2025 10:00',
      },
      ...Array(20)
        .fill()
        .map((_, i) => ({
          id: `SP00${i + 3}`,
          code: `SP00${i + 3}`,
          name: `Sản phẩm ${i + 3}`,
          status: i % 2 === 0 ? 'Đang bán' : 'Ngừng bán',
          type: i % 2 === 0 ? 'Tín chấp' : 'Thế chấp',
          updated: '07/12/2025 09:00',
        })),
    ];

    const { page = 1, pageSize = 10, search = '' } = params;

    // Filter by search
    let filteredData = mockData;
    if (search) {
      filteredData = mockData.filter(
        (item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.code.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total: filteredData.length,
      page,
      pageSize,
    };
  },

  createProduct: async (productData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id: `SP${Date.now()}`,
      ...productData,
      updated: new Date().toLocaleString('vi-VN'),
    };
  },

  updateProduct: async (id, productData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id,
      ...productData,
      updated: new Date().toLocaleString('vi-VN'),
    };
  },

  deleteProduct: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { id };
  },

  getProductById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id,
      code: id,
      name: `Sản phẩm ${id}`,
      status: 'Đang bán',
      type: 'Tín chấp',
      updated: '09/12/2025 09:30',
    };
  },
};

const initialState = {
  loading: false,
  products: [],
  currentProduct: null,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  filters: {
    search: '',
    status: '',
    type: '',
  },
  message: null,
};

// Async thunks
export const getProducts = createAsyncThunk(`${namespace}/getProducts`, async (params, { rejectWithValue, getState }) => {
  const paramsToUse = params || {};
  try {
    const { managementProductSlice } = getState();
    const finalParams = {
      page: managementProductSlice.pagination.current,
      pageSize: managementProductSlice.pagination.pageSize,
      search: managementProductSlice.filters.search,
      ...paramsToUse,
    };

    const response = await mockProductAPI.getProducts(finalParams);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Có lỗi xảy ra khi tải danh sách sản phẩm');
  }
});

export const createProduct = createAsyncThunk(`${namespace}/createProduct`, async (productData, { rejectWithValue }) => {
  try {
    const response = await mockProductAPI.createProduct(productData);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Có lỗi xảy ra khi tạo sản phẩm');
  }
});

export const updateProduct = createAsyncThunk(`${namespace}/updateProduct`, async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await mockProductAPI.updateProduct(id, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Có lỗi xảy ra khi cập nhật sản phẩm');
  }
});

export const deleteProduct = createAsyncThunk(`${namespace}/deleteProduct`, async (id, { rejectWithValue }) => {
  try {
    await mockProductAPI.deleteProduct(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.message || 'Có lỗi xảy ra khi xóa sản phẩm');
  }
});

export const getProductById = createAsyncThunk(`${namespace}/getProductById`, async (id, { rejectWithValue }) => {
  try {
    const response = await mockProductAPI.getProductById(id);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Có lỗi xảy ra khi tải thông tin sản phẩm');
  }
});

const managementProductSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearMessage: (state) => {
      state.message = null;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.pagination.total = action.payload.total;
        state.pagination.current = action.payload.page;
        state.pagination.pageSize = action.payload.pageSize;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.message = { type: 'error', text: action.payload };
      })

      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.message = { type: 'success', text: 'Tạo sản phẩm thành công' };
        // Refresh products list
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.message = { type: 'error', text: action.payload };
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.message = { type: 'success', text: 'Cập nhật sản phẩm thành công' };
        // Update product in list
        const index = state.products.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.message = { type: 'error', text: action.payload };
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.message = { type: 'success', text: 'Xóa sản phẩm thành công' };
        // Remove product from list
        state.products = state.products.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.message = { type: 'error', text: action.payload };
      })

      // Get Product By ID
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.message = { type: 'error', text: action.payload };
      });
  },
});

export const { setPagination, setFilters, clearMessage, clearCurrentProduct } = managementProductSlice.actions;

export default managementProductSlice.reducer;
