import { Table, Tag, Button, Input, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import vi from '../../../../json/translaiton/vi.json';
import { getProducts, setPagination, setFilters, clearMessage } from '../../../../slice/managementProductSlice';

const { Search } = Input;
const { Option } = Select;

const columns = [
  {
    title: 'Mã sản phẩm',
    dataIndex: 'code',
    key: 'code',
    render: (text) => <span className='font-semibold'>{text}</span>,
  },
  { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name' },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status) => <Tag color={status === 'Đang bán' ? 'green' : 'red'}>{status}</Tag>,
  },
  { title: 'Loại sản phẩm', dataIndex: 'type', key: 'type' },
  { title: 'Ngày cập nhật cuối', dataIndex: 'updated', key: 'updated' },
];

export default function Product() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Menu: menuTranslations } = vi;

  const { products, loading, pagination, filters, message: storeMessage } = useSelector((state) => state.managementProductSlice);

  useEffect(() => {
    dispatch(getProducts());
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
      getProducts({
        page: paginationConfig.current,
        pageSize: paginationConfig.pageSize,
      })
    );
  };

  const handleSearch = (value) => {
    dispatch(setFilters({ search: value }));
    dispatch(setPagination({ current: 1 }));
    dispatch(getProducts({ page: 1, search: value }));
  };

  const handleStatusFilter = (value) => {
    dispatch(setFilters({ status: value }));
    dispatch(setPagination({ current: 1 }));
    dispatch(getProducts({ page: 1, status: value }));
  };

  return (
    <div className='bg-white rounded-lg shadow px-6 py-4'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-bold'>{menuTranslations.product}</h2>
        <Button type='primary' className='font-semibold text-base px-5 py-2 rounded' onClick={() => navigate('/managerment/product/create')}>
          + Tạo mới
        </Button>
      </div>

      <div className='flex gap-4 mb-4'>
        <Search placeholder='Tìm kiếm theo tên hoặc mã sản phẩm' allowClear style={{ width: 300 }} onSearch={handleSearch} loading={loading} />
        <Select placeholder='Lọc theo trạng thái' style={{ width: 200 }} allowClear onChange={handleStatusFilter} value={filters.status}>
          <Option value='Đang bán'>Đang bán</Option>
          <Option value='Ngừng bán'>Ngừng bán</Option>
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={products}
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
