import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="text-white w-full md:w-64 bg-gray-900 h-auto md:h-screen p-6 shadow-lg flex flex-col items-start md:fixed">
      <nav className="w-full">
        <ul className="space-y-6">
          <li>
            <Link
              to="/admin/manage-beats"
              className="block text-lg font-semibold text-gray-300 bg-gray-800 rounded-lg px-6 py-3 hover:bg-gray-700 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Beats
            </Link>
          </li>
          <li>
            <Link
              to="/admin/manage-tags"
              className="block text-lg font-semibold text-gray-300 bg-gray-800 rounded-lg px-6 py-3 hover:bg-gray-700 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Tags
            </Link>
          </li>
          <li>
            <Link
              to="/admin/manage-users"
              className="block text-lg font-semibold text-gray-300 bg-gray-800 rounded-lg px-6 py-3 hover:bg-gray-700 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/manage-payments"
              className="block text-lg font-semibold text-gray-300 bg-gray-800 rounded-lg px-6 py-3 hover:bg-gray-700 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
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
