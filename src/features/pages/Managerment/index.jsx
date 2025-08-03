import { useState } from 'react';

const mockData = [
  {
    name: 'ALL (system)',
    status: 'Hoạt động',
    desc: 'Tất cả user. Đây là tệp default không được chỉnh sửa',
    type: 'Tập xác định',
    scope: ['Vay tiền mặt', 'Thẻ tín dụng'],
    updated: '09/12/2025 09:30',
  },
  {
    name: 'Face_blacklist (system)',
    status: 'Hoạt động',
    desc: 'Nguyễn Văn B',
    type: 'Tập xác định',
    scope: ['Vay tiền mặt', 'Thêm dịch vụ quản lý'],
    updated: '09/12/2025 09:30',
  },
  ...Array(8)
    .fill()
    .map((_, i) => ({
      name: '12r4t45y68',
      status: 'Hoạt động',
      desc: i % 2 === 0 ? 'Nguyễn Văn A' : 'Nguyễn Văn B',
      type: 'Tập xác định',
      scope: ['Vay tiền mặt', 'Thẻ tín dụng'],
      updated: '09/12/2025 09:30',
    })),
];

function Sidebar({ collapsed, onToggle }) {
  return (
    <div
      className={`bg-white h-full transition-all duration-300 border-r
        ${collapsed ? 'w-[60px]' : 'w-[250px]'}
        flex flex-col`}
    >
      <button className='p-2 self-end' onClick={onToggle} title={collapsed ? 'Mở rộng' : 'Thu gọn'}>
        <i className={`fa-solid fa-angle-${collapsed ? 'right' : 'left'}`}></i>
      </button>
      <div className='flex-1 overflow-y-auto'>
        <div className='px-3 py-2 font-bold text-black/80 text-sm'>Quản trị người dùng</div>
        <ul className='space-y-1 px-2'>
          <li className='text-black/70 text-sm py-1 pl-2'>Vận hành viên</li>
          <li className='text-black/70 text-sm py-1 pl-2'>Khách hàng</li>
          <li className='text-red-500 font-semibold bg-red-50 rounded py-1 pl-2'>Phân tập khách hàng</li>
        </ul>
        <div className='px-3 py-2 font-bold text-black/80 text-sm mt-4'>Quản trị hệ thống</div>
      </div>
    </div>
  );
}

function Topbar() {
  return (
    <div className='flex items-center justify-between px-6 py-3 bg-white shadow-sm border-b w-full'>
      <div className='flex items-center gap-4'>
        <img src='https://res.cloudinary.com/cloudinarymen/image/upload/v1711612347/makotodecor/logo_hd_saison.png' alt='logo' className='h-8' />
        <nav className='flex items-center gap-2 text-sm text-black/70'>
          <span className='font-semibold text-black'>Quản trị sản phẩm</span>
          <span>&gt;</span>
          <span>Cấu hình sản phẩm vay/thẻ</span>
          <span>&gt;</span>
          <span className='text-black'>Danh sách nhóm sản phẩm</span>
        </nav>
      </div>
      <div className='flex items-center gap-4'>
        <button className='border px-2 py-1 rounded text-sm flex items-center gap-1'>
          <span role='img' aria-label='vn-flag'>
            🇻🇳
          </span>
        </button>
        <div className='flex items-center gap-2'>
          <span className='text-sm text-black/70'>buiminhan@gmail.com</span>
          <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center'>
            <i className='fa fa-user text-black/50'></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Managerment() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [scope, setScope] = useState('');

  return (
    <div className='bg-[#E6F0FA] min-h-screen w-full'>
      <Topbar />
      <div className='flex w-full min-h-[calc(100vh-56px)]'>
        {' '}
        {/* 56px là chiều cao Topbar */}
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((v) => !v)} />
        <div className='flex-1 flex flex-col min-h-full'>
          <div className='flex-1 p-6'>
            <div className='bg-white rounded-lg shadow px-6 py-4'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-xl font-bold'>Danh sách tập khách hàng</h2>
                <button className='bg-primary text-white px-5 py-2 rounded hover:bg-primary-dark font-semibold text-base'>+ Tạo mới</button>
              </div>
              <div className='flex flex-wrap gap-3 mb-4'>
                <input
                  className='border rounded px-3 py-2 min-w-[200px]'
                  placeholder='Tên tập khách hàng'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <select className='border rounded px-3 py-2' value={type} onChange={(e) => setType(e.target.value)}>
                  <option value=''>Loại tập khách hàng</option>
                  <option value='Tập xác định'>Tập xác định</option>
                  <option value='Theo tiêu chí'>Theo tiêu chí</option>
                </select>
                <select className='border rounded px-3 py-2' value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value=''>Trạng thái</option>
                  <option value='Hoạt động'>Hoạt động</option>
                  <option value='Ngừng hoạt động'>Ngừng hoạt động</option>
                </select>
                <select className='border rounded px-3 py-2' value={scope} onChange={(e) => setScope(e.target.value)}>
                  <option value=''>Phạm vi áp dụng</option>
                  <option value='Vay tiền mặt'>Vay tiền mặt</option>
                  <option value='Thẻ tín dụng'>Thẻ tín dụng</option>
                  <option value='Thông báo'>Thông báo</option>
                </select>
                <button className='bg-primary text-white px-4 py-2 rounded'>
                  <i className='fa fa-search'></i>
                </button>
              </div>
              <div className='overflow-x-auto'>
                <table className='min-w-full bg-white'>
                  <thead>
                    <tr className='border-b'>
                      <th className='p-2'>
                        <input type='checkbox' />
                      </th>
                      <th className='p-2 text-left'>Tệp khách hàng</th>
                      <th className='p-2 text-left'>Trạng thái</th>
                      <th className='p-2 text-left'>Mô tả</th>
                      <th className='p-2 text-left'>Loại tập khách hàng</th>
                      <th className='p-2 text-left'>Phạm vi sử dụng</th>
                      <th className='p-2 text-left'>Ngày cập nhật cuối</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockData.map((row, idx) => (
                      <tr key={idx} className='border-b hover:bg-gray-50'>
                        <td className='p-2'>
                          <input type='checkbox' />
                        </td>
                        <td className='p-2 font-semibold'>{row.name}</td>
                        <td className='p-2'>
                          <span className='bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-semibold'>{row.status}</span>
                        </td>
                        <td className='p-2'>{row.desc}</td>
                        <td className='p-2'>{row.type}</td>
                        <td className='p-2 flex flex-wrap gap-1'>
                          {row.scope.map((s, i) => (
                            <span key={i} className='bg-gray-100 px-2 py-1 rounded text-xs'>
                              {s}
                            </span>
                          ))}
                        </td>
                        <td className='p-2'>{row.updated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className='flex justify-between items-center mt-4'>
                <span className='text-sm text-gray-500'>Hiển thị dòng mỗi trang: 10</span>
                <div className='flex gap-1'>
                  <button className='px-2 py-1 rounded bg-gray-100'>1</button>
                  <button className='px-2 py-1 rounded bg-gray-100'>2</button>
                  <span className='px-2 py-1'>...</span>
                  <button className='px-2 py-1 rounded bg-gray-100'>16</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
