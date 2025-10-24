import React from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar/AdminSidebar'
import { Outlet } from 'react-router-dom'

function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-brand-gray-light via-white to-brand-gray-light">
      <AdminSidebar />
      <div className="flex w-full flex-1 justify-center p-4 md:p-8">
        <div className="w-full max-w-7xl">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminPage
