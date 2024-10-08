import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="w-full flex justify-center">
      <nav className="w-full">
        <ul className="flex justify-center space-x-6 mb-8 mt-12">
          <li className="bg-teal-800 text-white text-lg px-8 py-2 rounded-full hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300 transform hover:scale-110">
            <Link
              to="/admin/manage-beats"
            >
              Beats
            </Link>
          </li>
          <li className="bg-teal-800 text-white text-lg px-8 py-2 rounded-full hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300 transform hover:scale-110">
            <Link
              to="/admin/manage-users"
            >
              Users
            </Link>
          </li>
          <li className="bg-teal-800 text-white text-lg px-8 py-2 rounded-full hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300 transform hover:scale-110">
            <Link
              to="/admin/manage-tags"
            >
              Tags
            </Link>
          </li>
          <li className="bg-teal-800 text-white text-lg px-8 py-2 rounded-full hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300 transform hover:scale-110">
            <Link
              to="/admin/manage-payments"
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
