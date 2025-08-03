import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
      <h2 className="mb-6 text-3xl font-semibold">Trang không tìm thấy</h2>
      <p className="mb-8 text-gray-600">Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
      <Link to="/" className="btn-primary inline-block">
        Quay về trang chủ
      </Link>
    </div>
  )
}

export default NotFound
