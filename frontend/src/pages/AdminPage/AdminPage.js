import React from 'react';
import AdminSidebar from '../../components/Admin/AdminSidebar/AdminSidebar';
import { Outlet } from 'react-router-dom';

function AdminPage() {
  return (
    <div className="flex h-screen bg-gray-900">
      <AdminSidebar />
      <div className="flex-1 ml-64 p-6 bg-gray-800">
        <div className="mx-auto w-full max-w-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
