import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const namespace = 'managementOrderSlice';

// Mock API function - sẽ thay thế bằng API thật sau này
const mockOrderAPI = {
  getOrders: async (params) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockData = [
      {
        id: 'DH001',
        customer: 'Bùi Minh Ân',
        total: '2.500.000đ',
        status: 'Đã giao',
        updated: '10/12/2025 10:30',
        customerEmail: 'buiminhan@gmail.com',
        customerPhone: '0123456789',
      },
      {
        id: 'DH002',
        customer: 'Nguyễn Văn A',
        total: '1.800.000đ',
        status: 'Đang xử lý',
        updated: '11/12/2025 11:00',
        customerEmail: 'nguyenvana@gmail.com',
        customerPhone: '0987654321',
      },
      ...Array(25)
        .fill()
        .map((_, i) => ({
          id: `DH00${i + 3}`,
          customer: `Khách hàng ${i + 3}`,
          total: `${1500 + i * 300}.000đ`,
          status: i % 3 === 0 ? 'Đã giao' : i % 3 === 1 ? 'Đang xử lý' : 'Đã hủy',
          updated: '09/12/2025 09:00',
          customerEmail: `customer${i + 3}@gmail.com`,
          customerPhone: `012345678${i}`,
        })),
    ];

    const { page = 1, pageSize = 10, search = '', status = '' } = params;

    // Filter by search and status
    let filteredData = mockData;
    if (search) {
      filteredData = filteredData.filter(
        (item) => item.customer.toLowerCase().includes(search.toLowerCase()) || item.id.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (status) {
      filteredData = filteredData.filter((item) => item.status === status);
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

  updateOrderStatus: async (id, status) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id,
      status,
      updated: new Date().toLocaleString('vi-VN'),
    };
  },

  getOrderById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id,
      customer: `Khách hàng ${id}`,
      total: '2.500.000đ',
      status: 'Đang xử lý',
      updated: '10/12/2025 10:30',
      customerEmail: 'customer@gmail.com',
      customerPhone: '0123456789',
      items: [{ name: 'Sofa Gỗ Sồi', quantity: 1, price: '2.500.000đ' }],
    };
  },

  deleteOrder: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { id };
  },

  getOrderStats: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      total: 150,
      pending: 23,
      processing: 45,
      delivered: 82,
    };
  },
};

const initialState = {
  loading: false,
  orders: [],
  currentOrder: null,
  stats: {
    total: 0,
    pending: 0,
    processing: 0,
    delivered: 0,
  },
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  filters: {
    search: '',
    status: '',
    dateFrom: '',
    dateTo: '',
  },
  message: null,
};

// Async thunks
export const getOrders = createAsyncThunk(`${namespace}/getOrders`, async (params, { rejectWithValue, getState }) => {
  const paramsToUse = params || {};
  try {
    const { managementOrderSlice } = getState();
    const finalParams = {
      page: managementOrderSlice.pagination.current,
      pageSize: managementOrderSlice.pagination.pageSize,
      search: managementOrderSlice.filters.search,
      status: managementOrderSlice.filters.status,
      ...paramsToUse,
    };

    const response = await mockOrderAPI.getOrders(finalParams);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Có lỗi xảy ra khi tải danh sách đơn hàng');
  }
});

export const updateOrderStatus = createAsyncThunk(`${namespace}/updateOrderStatus`, async ({ id, status }, { rejectWithValue }) => {
  try {
    const response = await mockOrderAPI.updateOrderStatus(id, status);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Có lỗi xảy ra khi cập nhật trạng thái đơn hàng');
  }
});

export const getOrderById = createAsyncThunk(`${namespace}/getOrderById`, async (id, { rejectWithValue }) => {
  try {
    const response = await mockOrderAPI.getOrderById(id);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Có lỗi xảy ra khi tải thông tin đơn hàng');
  }
});

export const deleteOrder = createAsyncThunk(`${namespace}/deleteOrder`, async (id, { rejectWithValue }) => {
  try {
    await mockOrderAPI.deleteOrder(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.message || 'Có lỗi xảy ra khi xóa đơn hàng');
  }
});

export const getOrderStats = createAsyncThunk(`${namespace}/getOrderStats`, async (_, { rejectWithValue }) => {
  try {
    const response = await mockOrderAPI.getOrderStats();
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Có lỗi xảy ra khi tải thống kê đơn hàng');
  }
});

const managementOrderSlice = createSlice({
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
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Orders
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
        state.pagination.total = action.payload.total;
        state.pagination.current = action.payload.page;
        state.pagination.pageSize = action.payload.pageSize;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.message = { type: 'error', text: action.payload };
      })

      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.message = { type: 'success', text: 'Cập nhật trạng thái đơn hàng thành công' };
        // Update order in list
        const index = state.orders.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) {
          state.orders[index].status = action.payload.status;
          state.orders[index].updated = action.payload.updated;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.message = { type: 'error', text: action.payload };
      })

      // Get Order By ID
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.message = { type: 'error', text: action.payload };
      })

      // Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.message = { type: 'success', text: 'Xóa đơn hàng thành công' };
        // Remove order from list
        state.orders = state.orders.filter((o) => o.id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.message = { type: 'error', text: action.payload };
      })

      // Get Order Stats
      .addCase(getOrderStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getOrderStats.rejected, (state, action) => {
        state.loading = false;
        state.message = { type: 'error', text: action.payload };
      });
  },
});

export const { setPagination, setFilters, clearMessage, clearCurrentOrder } = managementOrderSlice.actions;

export default managementOrderSlice.reducer;
