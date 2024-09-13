import React from 'react';
import AdminSidebar from '../../components/Admin/AdminSidebar/AdminSidebar';
import { Outlet } from 'react-router-dom';

function AdminPage() {
  return (
<div className="flex min-h-screen bg-dark-teal">
      
      {/* Sidebar */}
      <div className="md:w-64 w-full mt-2">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 flex justify-center ">
        <div className="w-full max-w-4xl p-6 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
