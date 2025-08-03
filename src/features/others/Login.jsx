import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Thực hiện xác thực người dùng ở đây (gọi API, kiểm tra dữ liệu, v.v.)
    // Giả lập thành công và chuyển hướng đến trang chủ
    navigate('/')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Đăng Nhập</h1>
      <form onSubmit={handleSubmit} className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4">
          <label className="mb-2 block text-gray-700" htmlFor="email">
            Email
          </label>
          <input type="email" id="email" className="w-full rounded border border-gray-300 px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-gray-700" htmlFor="password">
            Mật khẩu
          </label>
          <input type="password" id="password" className="w-full rounded border border-gray-300 px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="w-full rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700">
          Đăng Nhập
        </button>
        <p className="mt-4 text-center text-gray-600">
          Chưa có tài khoản?{' '}
          <Link to="/auth/register" className="text-blue-600 hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login
