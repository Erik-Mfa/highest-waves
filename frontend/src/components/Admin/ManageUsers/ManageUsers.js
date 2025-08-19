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
    <div className="m-10 rounded-lg border border-gray-700 bg-gray-800 p-10 shadow-lg">
      {/* Confirm delete message */}
      {userToDelete && (
        <ConfirmMessage
          message={`Are you sure that you want to delete ${userToDelete.username}? All the information related will also be deleted.`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      <div className="mx-10 mb-4 flex justify-center">
        <button
          onClick={toggleForm}
                      className="rounded-lg bg-brand-blue-dark px-8 py-2 text-lg text-white transition-all duration-300 hover:scale-110 hover:bg-brand-blue hover:shadow-lg hover:shadow-brand-blue/50"
        >
          Create User
        </button>
      </div>

      <CreateUserForm formOpen={formOpen} />

      <div className=" mx-auto max-w-3xl rounded-lg p-6 text-white shadow-lg">
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id} // Assuming each user has a unique 'id'
              className="mb-4 flex items-center justify-between rounded-lg border border-gray-600 bg-gray-800 p-4 transition-colors duration-300 ease-in-out hover:bg-gray-700"
            >
              <img
                // eslint-disable-next-line no-undef
                src={`${process.env.REACT_APP_BACKEND_URL}/${user.image}`}
                alt="User Avatar"
                className="mr-4 size-20 rounded-full border-2 border-cyan-600 object-cover" // Adding a border around the image
              />
              <div className="grow">
                <h3 className="text-md font-semibold text-white">
                  {user.username}
                </h3>
                <p className="text-sm text-gray-400">Email: {user.email}</p>
                <p className="text-sm text-gray-400">Role: {user.role}</p>
              </div>

              <button
                onClick={() => confirmDeleteUser(user)}
                className="flex items-center justify-center rounded-full bg-red-600 p-2 text-white transition-all duration-300 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label={`Delete user ${user.username}`}
              >
                <FaTrash className="text-lg" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ManageUsers
