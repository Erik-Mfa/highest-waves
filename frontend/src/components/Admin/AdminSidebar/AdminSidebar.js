import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="text-white p-6 w-64 h-screen fixed flex flex-col shadow-lg">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin/manage-beats"
              className="block text-lg font-semibold text-gray-300 bg-gray-800 rounded-lg px-4 py-3 hover:bg-gray-700 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Beats
            </Link>
          </li>
          <li>
            <Link
              to="/admin/manage-tags"
              className="block text-lg font-semibold text-gray-300 bg-gray-800 rounded-lg px-4 py-3 hover:bg-gray-700 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Tags
            </Link>
          </li>
          <li>
            <Link
              to="/admin/manage-users"
              className="block text-lg font-semibold text-gray-300 bg-gray-800 rounded-lg px-4 py-3 hover:bg-gray-700 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="block text-lg font-semibold text-gray-300 bg-gray-800 rounded-lg px-4 py-3 hover:bg-gray-700 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Payments
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
