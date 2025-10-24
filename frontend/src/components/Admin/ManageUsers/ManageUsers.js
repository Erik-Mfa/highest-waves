import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { getUsers, deleteUser } from '../../../services/api/users'
import ConfirmMessage from '../../Messages/ConfirmMessage/ConfirmMessage'
import CreateUserForm from './CreateUserForm/CreateUserForm'

const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [formOpen, setFormOpen] = useState([false])
  const [userToDelete, setUserToDelete] = useState(null) // State for selected user to delete

  const fetchUsers = async () => {
    try {
      const userData = await getUsers()
      setUsers(userData)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const handleDeleteUser = async (userId) => {
    try {
      const response = await deleteUser(userId)
      if (response.success) {
        setUsers(users.filter((user) => user.id !== userId))
        fetchUsers()
      } else {
        console.error('Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const confirmDeleteUser = (user) => {
    setUserToDelete(user)
  }

  const cancelDelete = () => {
    setUserToDelete(null)
  }

  const confirmDelete = async () => {
    if (userToDelete) {
      await handleDeleteUser(userToDelete.id)
      setUserToDelete(null)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const toggleForm = () => {
    setFormOpen((prev) => !prev)
  }

  return (
    <div className="m-4 md:m-10 rounded-xl bg-white shadow-xl">
      {/* Confirm delete message */}
      {userToDelete && (
        <ConfirmMessage
          message={`Are you sure that you want to delete ${userToDelete.username}? All the information related will also be deleted.`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      {/* Header Section */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-blue-dark rounded-t-xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Manage Users</h1>
            <p className="text-brand-gray-light opacity-90">Create and manage user accounts ({users.length} users)</p>
          </div>
          <button
            onClick={toggleForm}
            className="bg-white text-brand-blue px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30"
          >
            + Create User
          </button>
        </div>
      </div>

      {/* Create User Form Section */}
      <div className="px-8 pt-4">
        <CreateUserForm formOpen={formOpen} />
      </div>

      <div className="p-8">
        {users.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 text-brand-gray">👥</div>
            <h3 className="text-xl font-semibold text-brand-blue mb-2">No users yet</h3>
            <p className="text-brand-gray">Create your first user to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="group bg-white border border-brand-gray-light rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/${user.image}`}
                      alt="User Avatar"
                      className="w-16 h-16 rounded-full border-2 border-brand-blue object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-brand-blue-dark group-hover:text-brand-blue transition-colors duration-300">
                        {user.username}
                      </h3>
                      <p className="text-sm text-brand-gray mt-1">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      user.role === 'admin' 
                        ? 'bg-brand-blue text-white' 
                        : 'bg-brand-gray-light text-brand-blue-dark'
                    }`}>
                      {user.role}
                    </span>
                    
                    <button
                      onClick={() => confirmDeleteUser(user)}
                      className="bg-red-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-500/30"
                      aria-label={`Delete user ${user.username}`}
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageUsers
