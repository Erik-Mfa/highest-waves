import React from 'react'
import { Link } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    <div className="bg-white shadow-lg border-b border-brand-gray-light">
      <div className="flex w-full justify-center">
        <nav className="w-full max-w-7xl px-4 md:px-8">
          <ul className="flex justify-center space-x-2 md:space-x-6 py-6">
            <li>
              <Link 
                to="/admin/manage-beats"
                className="block px-4 md:px-6 py-3 rounded-lg bg-brand-blue text-white font-semibold transition-all duration-300 hover:bg-brand-blue-dark hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-blue/30"
              >
                Beats
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/manage-users"
                className="block px-4 md:px-6 py-3 rounded-lg bg-brand-blue text-white font-semibold transition-all duration-300 hover:bg-brand-blue-dark hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-blue/30"
              >
                Users
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/manage-tags"
                className="block px-4 md:px-6 py-3 rounded-lg bg-brand-blue text-white font-semibold transition-all duration-300 hover:bg-brand-blue-dark hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-blue/30"
              >
                Tags
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/manage-payments"
                className="block px-4 md:px-6 py-3 rounded-lg bg-brand-blue text-white font-semibold transition-all duration-300 hover:bg-brand-blue-dark hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-blue/30"
              >
                Payments
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default AdminSidebar
