import React from 'react';
import AdminSidebar from '../../components/Admin/AdminSidebar/AdminSidebar';
import { Outlet } from 'react-router-dom';

function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white"> {/* Dark gradient background */}
      <AdminSidebar />

      <div className="flex-1 w-full flex justify-center p-10">
        <div className="w-full max-w-6xl p-6 rounded-lg bg-gray-800 shadow-md shadow-teal-800/50 border border-gray-700"> {/* Neon glow around content */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
