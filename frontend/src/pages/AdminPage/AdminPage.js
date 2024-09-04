import React from 'react';
import AdminSidebar from '../../components/Admin/AdminSidebar/AdminSidebar';
import { Outlet } from 'react-router-dom';

function AdminPage() {
  return (
    <div className="flex flex-col md:flex-row">
      <AdminSidebar className="hidden md:w-64 w-full" />
      <div className="flex-1 p-6  overflow-y-auto">
        <div className="mx-auto w-full max-w-4xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;