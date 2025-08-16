import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const namespace = 'managementUserSlice';

// Mock API function - sẽ thay thế bằng API thật sau này
const mockUserAPI = {
  getUsers: async (params) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 700));

    const mockData = [
      {
        id: 1,
        name: 'Bùi Minh Ân',
        email: 'buiminhan@gmail.com',
        role: 'Admin',
        status: 'Active',
        updated: '10/12/2025 10:30',
        phone: '0123456789',
        address: 'Hà Nội',
      },
      {
        id: 2,
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        role: 'User',
        status: 'Active',
        updated: '11/12/2025 11:00',
        phone: '0987654321',
        address: 'TP.HCM',
      },
      ...Array(18)
        .fill()
        .map((_, i) => ({
          id: i + 3,
          name: `Người dùng ${i + 3}`,
          email: `user${i + 3}@example.com`,
          role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'User' : 'Moderator',
          status: i % 4 === 0 ? 'Inactive' : 'Active',
          updated: '09/12/2025 09:00',
          phone: `012345678${i}`,
          address: `Địa chỉ ${i + 3}`,
        })),
    ];

    const { page = 1, pageSize = 10, search = '', role = '', status = '' } = params;

    // Filter by search, role and status
    let filteredData = mockData;
    if (search) {
      filteredData = filteredData.filter(
        (item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (role) {
      filteredData = filteredData.filter((item) => item.role === role);
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

  createUser: async (userData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id: Date.now(),
      ...userData,
      status: 'Active',
      updated: new Date().toLocaleString('vi-VN'),
    };
  },

  updateUser: async (id, userData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id,
      ...userData,
      updated: new Date().toLocaleString('vi-VN'),
    };
  },

  deleteUser: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { id };
  },

  getUserById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id,
      name: `Người dùng ${id}`,
      email: `user${id}@example.com`,
      role: 'User',
      status: 'Active',
      updated: '10/12/2025 10:30',
      phone: '0123456789',
      address: 'Hà Nội',
    };
  },

  updateUserStatus: async (id, status) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id,
      status,
      updated: new Date().toLocaleString('vi-VN'),
    };
  },

  getUserStats: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      total: 89,
      active: 75,
      inactive: 14,
      admin: 5,
      user: 70,
      moderator: 14,
    };
  },
};

const initialState = {
  loading: false,
  users: [],
  currentUser: null,
  stats: {
    total: 0,
    active: 0,
    inactive: 0,
    admin: 0,
    user: 0,
    moderator: 0,
  },
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  filters: {
    search: '',
    role: '',
    status: '',
  },
  message: null,
};

// Async thunks
export const getUsers = createAsyncThunk(`${namespace}/getUsers`, async (params, { rejectWithValue, getState }) => {
  const paramsToUse = params || {};
  try {
    const { managementUserSlice } = getState();
    const finalParams = {
      page: managementUserSlice.pagination.current,
      pageSize: managementUserSlice.pagination.pageSize,
      search: managementUserSlice.filters.search,
      role: managementUserSlice.filters.role,
      status: managementUserSlice.filters.status,
      ...paramsToUse,
    };

    const response = await mockUserAPI.getUsers(finalParams);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Có lỗi xảy ra khi tải danh sách người dùng');
  }
});

export const createUser = createAsyncThunk(`${namespace}/createUser`, async (userData, { rejectWithValue }) => {
  try {
    const response = await mockUserAPI.createUser(userData);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Có lỗi xảy ra khi tạo người dùng');
  }
});

export const updateUser = createAsyncThunk(`${namespace}/updateUser`, async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await mockUserAPI.updateUser(id, data);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Có lỗi xảy ra khi cập nhật người dùng');
  }
});

export const deleteUser = createAsyncThunk(`${namespace}/deleteUser`, async (id, { rejectWithValue }) => {
  try {
    await mockUserAPI.deleteUser(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.message || 'Có lỗi xảy ra khi xóa người dùng');
  }
});

export const getUserById = createAsyncThunk(`${namespace}/getUserById`, async (id, { rejectWithValue }) => {
  try {
    const response = await mockUserAPI.getUserById(id);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Có lỗi xảy ra khi tải thông tin người dùng');
  }
});

export const updateUserStatus = createAsyncThunk(`${namespace}/updateUserStatus`, async ({ id, status }, { rejectWithValue }) => {
  try {
    const response = await mockUserAPI.updateUserStatus(id, status);
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Có lỗi xảy ra khi cập nhật trạng thái người dùng');
  }
});

export const getUserStats = createAsyncThunk(`${namespace}/getUserStats`, async (_, { rejectWithValue }) => {
  try {
    const response = await mockUserAPI.getUserStats();
    return response;
  } catch (error) {
    return rejectWithValue(error.message || 'Có lỗi xảy ra khi tải thống kê người dùng');
  }
});

const managementUserSlice = createSlice({
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
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Users
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.pagination.total = action.payload.total;
        state.pagination.current = action.payload.page;
        state.pagination.pageSize = action.payload.pageSize;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.message = { type: 'error', text: action.payload };
      })

      // Create User
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = { type: 'success', text: 'Tạo người dùng thành công' };
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.message = { type: 'error', text: action.payload };
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = { type: 'success', text: 'Cập nhật người dùng thành công' };
        // Update user in list
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.message = { type: 'error', text: action.payload };
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = { type: 'success', text: 'Xóa người dùng thành công' };
        // Remove user from list
        state.users = state.users.filter((u) => u.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.message = { type: 'error', text: action.payload };
      })

      // Get User By ID
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.message = { type: 'error', text: action.payload };
      })

      // Update User Status
      .addCase(updateUserStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.message = { type: 'success', text: 'Cập nhật trạng thái người dùng thành công' };
        // Update user status in list
        const index = state.users.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index].status = action.payload.status;
          state.users[index].updated = action.payload.updated;
        }
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.message = { type: 'error', text: action.payload };
      })

      // Get User Stats
      .addCase(getUserStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getUserStats.rejected, (state, action) => {
        state.loading = false;
        state.message = { type: 'error', text: action.payload };
      });
  },
});

export const { setPagination, setFilters, clearMessage, clearCurrentUser } = managementUserSlice.actions;

export default managementUserSlice.reducer;
