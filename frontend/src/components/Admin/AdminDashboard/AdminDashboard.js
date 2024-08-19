import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {

  return (
    <div className="fixed w-64 h-screen max-w-xs mx-auto p-4 border border-gray-300 rounded shadow-md">
      <nav className="flex justify-center items-center">

      <ul>
        <li className="mb-2">
          <Link to="/admin/create" className="text-indigo-600 hover:text-indigo-900">Add beat</Link>
        </li>
        <li className="mb-2">
          <Link to="/" className="text-indigo-600 hover:text-indigo-900">Add tags</Link>
        </li>
        <li className="mb-2">
          <Link to="/" className="text-indigo-600 hover:text-indigo-900">Users</Link>
        </li>
        <li className="mb-2">
          <Link to="/" className="text-indigo-600 hover:text-indigo-900">Pagamentos</Link>
        </li>
      </ul>
    </nav>
  </div>
  );
};

export default AdminDashboard;