import React from 'react';
import AdminSidebar from '../../components/Admin/AdminSidebar/AdminSidebar';
import { Outlet } from 'react-router-dom';

function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen bg-dark-teal">
      <AdminSidebar />

      <div className="flex-1 w-full flex justify-center">
        <div className="w-full max-w-6xl ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
