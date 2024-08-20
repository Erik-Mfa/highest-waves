import React from 'react';
import AdminDashboard from '../../components/Admin/AdminDashboard/AdminDashboard';
import { Outlet } from "react-router-dom";


function AdminPage() {
  
  return (
    <div>
      <AdminDashboard/>
      <main className='pt-12'>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPage;
