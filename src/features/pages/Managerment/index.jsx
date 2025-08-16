import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, ShoppingOutlined, AppstoreOutlined, PictureOutlined } from '@ant-design/icons';

export default function Managerment() {
  return (
    <div className='space-y-6'>
      <div className='bg-white rounded-lg shadow px-6 py-4'>
        <h2 className='text-2xl font-bold mb-6'>Dashboard Quản lý</h2>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic title='Tổng sản phẩm' value={150} prefix={<AppstoreOutlined />} valueStyle={{ color: '#3f8600' }} />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic title='Đơn hàng mới' value={23} prefix={<ShoppingOutlined />} valueStyle={{ color: '#cf1322' }} />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic title='Người dùng' value={89} prefix={<UserOutlined />} valueStyle={{ color: '#1890ff' }} />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic title='Hình ảnh' value={45} prefix={<PictureOutlined />} valueStyle={{ color: '#722ed1' }} />
            </Card>
          </Col>
        </Row>
      </div>

      <div className='bg-white rounded-lg shadow px-6 py-4'>
        <h3 className='text-lg font-semibold mb-4'>Hoạt động gần đây</h3>
        <div className='space-y-3'>
          <div className='flex items-center justify-between py-2 border-b'>
            <span>Sản phẩm "Sofa Gỗ Sồi" được tạo mới</span>
            <span className='text-gray-500 text-sm'>2 phút trước</span>
          </div>
          <div className='flex items-center justify-between py-2 border-b'>
            <span>Đơn hàng DH001 được cập nhật trạng thái</span>
            <span className='text-gray-500 text-sm'>5 phút trước</span>
          </div>
          <div className='flex items-center justify-between py-2 border-b'>
            <span>Người dùng mới đăng ký: nguyenvana@example.com</span>
            <span className='text-gray-500 text-sm'>10 phút trước</span>
          </div>
        </div>
      </div>
    </div>
  );
}
