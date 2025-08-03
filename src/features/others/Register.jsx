import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Thực hiện đăng ký người dùng ở đây (gọi API, lưu dữ liệu, v.v.)
    // Giả lập thành công và chuyển hướng đến trang đăng nhập
    navigate('/login')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Đăng Ký</h1>
      <form onSubmit={handleSubmit} className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4">
          <label className="mb-2 block text-gray-700" htmlFor="name">
            Họ và tên
          </label>
          <input type="text" id="name" className="w-full rounded border border-gray-300 px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
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
        <div className="mb-6">
          <label className="mb-2 block text-gray-700" htmlFor="confirmPassword">
            Xác nhận mật khẩu
          </label>
          <input type="password" id="confirmPassword" className="w-full rounded border border-gray-300 px-3 py-2" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button type="submit" className="w-full rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700">
          Đăng Ký
        </button>
        <p className="mt-4 text-center text-gray-600">
          Đã có tài khoản?{' '}
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            Đăng nhập ngay
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register
