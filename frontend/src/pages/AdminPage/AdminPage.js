import React from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar/AdminSidebar'
import { Outlet } from 'react-router-dom'

function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-black via-gray-900 to-gray-900 text-white">
      {' '}
      {/* Dark gradient background */}
      <AdminSidebar />
      <div className="flex w-full flex-1 justify-center p-10 ">
        <div className="w-full max-w-6xl rounded-lg bg-cyan-950 p-6 shadow-neon-glow ">
          {' '}
          {/* Neon glow around content */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminPage
