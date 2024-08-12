// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { isAdmin } from '../../services/auth'; // Adjust import based on your file structure

const AdminDashboard = () => {
  const [isAdminUser, setIsAdminUser] = useState(false);

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
      {/* Admin functionalities such as uploading beats and managing profiles */}
    </div>
  );
};

export default AdminDashboard;
