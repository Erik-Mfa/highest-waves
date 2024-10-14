import React from 'react';
import AdminSidebar from '../../components/Admin/AdminSidebar/AdminSidebar';
import { Outlet } from 'react-router-dom';

function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-900 text-white"> {/* Dark gradient background */}
      <AdminSidebar />

      <div className="flex-1 w-full flex justify-center p-10 ">
        <div className="w-full max-w-6xl p-6 rounded-lg bg-cyan-950 shadow-neon-glow "> {/* Neon glow around content */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
