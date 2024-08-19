import React from 'react';
import AdminDashboard from '../../components/Admin/AdminDashboard/AdminDashboard';
import { Outlet } from "react-router-dom";


function AdminPage() {
  
  return (
    <div>
      <AdminDashboard/>
      <Outlet />
    </div>
  );
}

export default AdminPage;
