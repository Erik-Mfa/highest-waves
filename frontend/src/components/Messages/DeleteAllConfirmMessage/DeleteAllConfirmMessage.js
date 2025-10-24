import React from 'react'
import { FaTrash } from 'react-icons/fa'

// eslint-disable-next-line react/prop-types
const DeleteAllConfirmMessage = ({ 
  itemType = "items", 
  itemCount = 0, 
  onConfirm, 
  onCancel, 
  isDeleting = false 
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-6 text-white shadow-lg">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-400 mb-4">
            Delete All {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
          </h2>
          <p className="text-white mb-2">
            Are you absolutely sure you want to delete <strong>ALL {itemCount} {itemType}</strong>?
          </p>
          <p className="text-sm text-red-400 mb-6">
            This action cannot be undone and will permanently remove all related information and data.
          </p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="rounded-md bg-gray-500 px-4 py-2 text-white transition duration-200 hover:bg-gray-600 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-md bg-red-600 px-4 py-2 text-white transition duration-200 hover:bg-red-700 disabled:opacity-50 flex items-center space-x-2"
          >
            {isDeleting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <FaTrash className="w-4 h-4" />
                <span>Delete All</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAllConfirmMessage
