import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white shadow-md">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                Makotodecor-2.0
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-grow items-center justify-center">
        <Outlet />
      </main>

      <footer className="bg-gray-800 py-6 text-white">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Makotodecor-2.0. Tất cả các quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  )
}

export default AuthLayout
