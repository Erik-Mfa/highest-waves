import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="bg-gray-900 text-white p-4 w-48 h-screen fixed flex flex-col">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link to="/admin/create" className="block text-sm text-gray-300 hover:text-white transition">
              Add Beat
            </Link>
          </li>
          <li>
            <Link to="/" className="block text-sm text-gray-300 hover:text-white transition">
              Add Tags
            </Link>
          </li>
          <li>
            <Link to="/" className="block text-sm text-gray-300 hover:text-white transition">
              Users
            </Link>
          </li>
          <li>
            <Link to="/" className="block text-sm text-gray-300 hover:text-white transition">
              Payments
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard;
