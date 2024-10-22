import React from 'react'
import { Link } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    <div className="flex w-full justify-center">
      <nav className="w-full">
        <ul className="mb-8 mt-12 flex justify-center space-x-6">
          <li className="rounded-full bg-teal-800 px-8 py-2 text-lg text-white transition-all duration-300 hover:scale-110 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-500/50">
            <Link to="/admin/manage-beats">Beats</Link>
          </li>
          <li className="rounded-full bg-teal-800 px-8 py-2 text-lg text-white transition-all duration-300 hover:scale-110 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-500/50">
            <Link to="/admin/manage-users">Users</Link>
          </li>
          <li className="rounded-full bg-teal-800 px-8 py-2 text-lg text-white transition-all duration-300 hover:scale-110 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-500/50">
            <Link to="/admin/manage-tags">Tags</Link>
          </li>
          <li className="rounded-full bg-teal-800 px-8 py-2 text-lg text-white transition-all duration-300 hover:scale-110 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-500/50">
            <Link to="/admin/manage-payments">Payments</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default AdminSidebar
