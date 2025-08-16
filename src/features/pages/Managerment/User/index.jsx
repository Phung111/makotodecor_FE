import { Table, Tag, Input, Select, message } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import vi from '../../../../json/translaiton/vi.json';
import { getUsers, setPagination, setFilters, clearMessage } from '../../../../slice/managementUserSlice';

const { Search } = Input;
const { Option } = Select;

const getRoleColor = (role) => {
  switch (role) {
    case 'Admin':
      return 'purple';
    case 'Moderator':
      return 'orange';
    case 'User':
      return 'blue';
    default:
      return 'blue';
  }
};

const getStatusColor = (status) => {
  return status === 'Active' ? 'green' : 'red';
};

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
  { title: 'Họ và tên', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  {
    title: 'Vai trò',
    dataIndex: 'role',
    key: 'role',
    render: (role) => <Tag color={getRoleColor(role)}>{role}</Tag>,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
  },
  { title: 'Ngày cập nhật cuối', dataIndex: 'updated', key: 'updated' },
];

export default function User() {
  const dispatch = useDispatch();
  const { Menu: menuTranslations } = vi;

  const { users, loading, pagination, filters, message: storeMessage } = useSelector((state) => state.managementUserSlice);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (storeMessage) {
      if (storeMessage.type === 'success') {
        message.success(storeMessage.text);
      } else if (storeMessage.type === 'error') {
        message.error(storeMessage.text);
      }
      dispatch(clearMessage());
    }
  }, [storeMessage, dispatch]);

  const handleTableChange = (paginationConfig) => {
    const newPagination = {
      current: paginationConfig.current,
      pageSize: paginationConfig.pageSize,
    };
    dispatch(setPagination(newPagination));
    dispatch(
      getUsers({
        page: paginationConfig.current,
        pageSize: paginationConfig.pageSize,
      })
    );
  };

  const handleSearch = (value) => {
    dispatch(setFilters({ search: value }));
    dispatch(setPagination({ current: 1 }));
    dispatch(getUsers({ page: 1, search: value }));
  };

  const handleRoleFilter = (value) => {
    dispatch(setFilters({ role: value }));
    dispatch(setPagination({ current: 1 }));
    dispatch(getUsers({ page: 1, role: value }));
  };

  const handleStatusFilter = (value) => {
    dispatch(setFilters({ status: value }));
    dispatch(setPagination({ current: 1 }));
    dispatch(getUsers({ page: 1, status: value }));
  };

  return (
    <div className='bg-white rounded-lg shadow px-6 py-4'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-bold'>{menuTranslations.user}</h2>
      </div>

      <div className='flex gap-4 mb-4'>
        <Search placeholder='Tìm kiếm theo tên hoặc email' allowClear style={{ width: 300 }} onSearch={handleSearch} loading={loading} />
        <Select placeholder='Lọc theo vai trò' style={{ width: 150 }} allowClear onChange={handleRoleFilter} value={filters.role}>
          <Option value='Admin'>Admin</Option>
          <Option value='Moderator'>Moderator</Option>
          <Option value='User'>User</Option>
        </Select>
        <Select placeholder='Lọc theo trạng thái' style={{ width: 150 }} allowClear onChange={handleStatusFilter} value={filters.status}>
          <Option value='Active'>Active</Option>
          <Option value='Inactive'>Inactive</Option>
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `Hiển thị ${range[0]}-${range[1]} của ${total} mục`,
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
        onChange={handleTableChange}
        className='custom-ant-table'
        rowKey='id'
      />
    </div>
  );
}
