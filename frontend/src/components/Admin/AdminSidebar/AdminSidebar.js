import React from 'react'
import { Link } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    <div className="flex w-full justify-center">
      <nav className="w-full">
        <ul className="mb-8 mt-12 flex justify-center space-x-6">
          <li 
            className="rounded-full px-8 py-2 text-lg text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
            style={{
              backgroundColor: 'var(--brand-light)',
              boxShadow: 'none'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--brand-medium)'
              e.target.style.boxShadow = '0 10px 25px -5px rgba(56, 118, 174, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--brand-light)'
              e.target.style.boxShadow = 'none'
            }}
          >
            <Link to="/admin/manage-beats">Beats</Link>
          </li>
          <li 
            className="rounded-full px-8 py-2 text-lg text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
            style={{
              backgroundColor: 'var(--brand-light)',
              boxShadow: 'none'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--brand-medium)'
              e.target.style.boxShadow = '0 10px 25px -5px rgba(56, 118, 174, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--brand-light)'
              e.target.style.boxShadow = 'none'
            }}
          >
            <Link to="/admin/manage-users">Users</Link>
          </li>
          <li 
            className="rounded-full px-8 py-2 text-lg text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
            style={{
              backgroundColor: 'var(--brand-light)',
              boxShadow: 'none'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--brand-medium)'
              e.target.style.boxShadow = '0 10px 25px -5px rgba(56, 118, 174, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--brand-light)'
              e.target.style.boxShadow = 'none'
            }}
          >
            <Link to="/admin/manage-tags">Tags</Link>
          </li>
          <li 
            className="rounded-full px-8 py-2 text-lg text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
            style={{
              backgroundColor: 'var(--brand-light)',
              boxShadow: 'none'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--brand-medium)'
              e.target.style.boxShadow = '0 10px 25px -5px rgba(56, 118, 174, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--brand-light)'
              e.target.style.boxShadow = 'none'
            }}
          >
            <Link to="/admin/manage-payments">Payments</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default AdminSidebar
