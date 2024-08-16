// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { isAdmin } from '../../services/auth'; 

const AdminDashboard = () => {
  const [isAdminUser, setIsAdminUser] = useState(false);

  //CHECK ADMIN useEffect
  useEffect(() => {
    const checkAdmin = async () => {
      const result = await isAdmin();
      setIsAdminUser(result);
    };
    checkAdmin();
  }, []);

  if (!isAdminUser) {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  );
};

export default AdminDashboard;
