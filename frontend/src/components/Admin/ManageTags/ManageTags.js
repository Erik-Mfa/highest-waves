import React, { useState, useEffect } from 'react'
import { createTag, getTags, deleteTag } from '../../../services/api/tags' // Import your tag creation and fetching services
import { FaTrash } from 'react-icons/fa'

const ManageTags = () => {
  const [tagDetails, setTagDetails] = useState({ name: '' })
  const [loading, setLoading] = useState(false) // Add loading stat
  const [tags, setTags] = useState([])

  const fetchTags = async () => {
    try {
      const tags = await getTags()
      setTags(tags)
    } catch (error) {
      console.error('Error fetching tags:', error)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  const handleCreateTag = async () => {
    if (!tagDetails.name) {
      alert('Please provide a tag name')
      return
    }

    setLoading(true)

    try {
      const response = await createTag(tagDetails)
      if (response.success) {
        setTagDetails({ name: '' })
        alert('Tag created successfully')
        fetchTags()
      } else {
        console.error('Failed to create tag')
      }
    } catch (error) {
      console.error('Error creating tag:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTag = async (tagId) => {
    try {
      const response = await deleteTag(tagId)
      if (response.success) {
        setTags(tags.filter((tag) => tag.id !== tagId))
      } else {
        console.error('Failed to delete tag')
      }
    } catch (error) {
      console.error('Error deleting tag:', error)
    }
  }

  return (
    <div className="m-10 mx-auto max-w-md rounded-lg border border-gray-700 bg-gray-800 p-10 shadow-lg">
      {/* Title */}
      <h2 className="mb-6 text-center text-2xl font-bold text-white">
        Add a new tag
      </h2>

      {/* Form */}
      <form>
        <div className="mb-4">
          <input
            type="text"
            id="name"
            placeholder="Enter tag name"
            value={tagDetails.name}
            onChange={(e) =>
              setTagDetails({ ...tagDetails, name: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-white px-4 py-2 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
          />
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleCreateTag}
          className="w-full rounded-lg bg-teal-800 px-4 py-1 text-lg text-white transition-all duration-300 hover:scale-110 hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/50"
        >
          Create Tag
        </button>
      </form>

      {/* Display Tags Underneath the Form */}
      <div className="mt-8 rounded-lg bg-gray-900 p-6">
        <h3 className="mb-4 text-xl font-semibold text-white">
          Available Tags
        </h3>
        <ul className="space-y-2">
          {loading && <div className="text-white">Loading...</div>}

          {/* Tag List */}
          {tags.map((tag) => (
            <li
              key={tag.id || tag._id}
              className="flex items-center justify-between rounded-md bg-gray-800 px-4 py-2 text-sm text-white transition-colors duration-300 ease-in-out hover:bg-gray-700"
            >
              <span>{tag.name}</span>

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteTag(tag.id || tag._id)}
                className="flex items-center justify-center rounded-full bg-red-600 p-2 text-white transition-all duration-300 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <FaTrash className="text-xs" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ManageTags
