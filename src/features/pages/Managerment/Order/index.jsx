import { Table, Tag, Input, Select, message } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import vi from '../../../../json/translaiton/vi.json';
import { getOrders, setPagination, setFilters, clearMessage, updateOrderStatus } from '../../../../slice/managementOrderSlice';

const { Search } = Input;
const { Option } = Select;

const getStatusColor = (status) => {
  switch (status) {
    case 'Đã giao':
      return 'green';
    case 'Đang xử lý':
      return 'orange';
    case 'Đã hủy':
      return 'red';
    default:
      return 'blue';
  }
};

const columns = [
  { title: 'Mã đơn hàng', dataIndex: 'id', key: 'id' },
  { title: 'Khách hàng', dataIndex: 'customer', key: 'customer' },
  { title: 'Tổng tiền', dataIndex: 'total', key: 'total' },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
  },
  { title: 'Ngày cập nhật cuối', dataIndex: 'updated', key: 'updated' },
];

export default function Order() {
  const dispatch = useDispatch();
  const { Menu: menuTranslations } = vi;

  const { orders, loading, pagination, filters, message: storeMessage } = useSelector((state) => state.managementOrderSlice);

  useEffect(() => {
    dispatch(getOrders());
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
      getOrders({
        page: paginationConfig.current,
        pageSize: paginationConfig.pageSize,
      })
    );
  };

  const handleSearch = (value) => {
    dispatch(setFilters({ search: value }));
    dispatch(setPagination({ current: 1 }));
    dispatch(getOrders({ page: 1, search: value }));
  };

  const handleStatusFilter = (value) => {
    dispatch(setFilters({ status: value }));
    dispatch(setPagination({ current: 1 }));
    dispatch(getOrders({ page: 1, status: value }));
  };

  return (
    <div className='bg-white rounded-lg shadow px-6 py-4'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-bold'>{menuTranslations.order}</h2>
      </div>

      <div className='flex gap-4 mb-4'>
        <Search
          placeholder='Tìm kiếm theo mã đơn hàng hoặc tên khách hàng'
          allowClear
          style={{ width: 350 }}
          onSearch={handleSearch}
          loading={loading}
        />
        <Select placeholder='Lọc theo trạng thái' style={{ width: 200 }} allowClear onChange={handleStatusFilter} value={filters.status}>
          <Option value='Đang xử lý'>Đang xử lý</Option>
          <Option value='Đã giao'>Đã giao</Option>
          <Option value='Đã hủy'>Đã hủy</Option>
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={orders}
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
