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
    <div className="m-4 md:m-10 rounded-xl bg-white shadow-xl">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-blue-dark rounded-t-xl p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Manage Tags</h1>
          <p className="text-brand-gray-light opacity-90">Create and organize beat tags ({tags.length} tags)</p>
        </div>
      </div>
      
      <div className="p-8">

        {/* Create Tag Form */}
        <div className="max-w-md mx-auto mb-8">
          <h2 className="text-xl font-bold text-brand-black mb-4 text-center">Add New Tag</h2>
          <form className="space-y-4">
            <div>
              <input
                type="text"
                id="name"
                placeholder="Enter tag name"
                value={tagDetails.name}
                onChange={(e) =>
                  setTagDetails({ ...tagDetails, name: e.target.value })
                }
                className="w-full px-4 py-3 border border-brand-gray-light rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:border-brand-blue focus:ring-brand-blue/20 bg-white text-brand-black placeholder-brand-gray"
              />
            </div>

            <button
              type="button"
              onClick={handleCreateTag}
              disabled={loading}
              className="w-full bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-blue/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Tag'}
            </button>
          </form>
        </div>

        {/* Tags List */}
        <div>
          <h3 className="text-xl font-bold text-brand-black mb-6 text-center">
            Available Tags
          </h3>
          
          {tags.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4 text-brand-gray">🏷️</div>
              <h3 className="text-xl font-semibold text-brand-black mb-2">No tags yet</h3>
              <p className="text-brand-gray">Create your first tag to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tags.map((tag) => (
                <div
                  key={tag.id || tag._id}
                  className="group bg-white border border-brand-gray-light rounded-lg p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-brand-black font-medium group-hover:text-brand-blue transition-colors duration-300">
                      {tag.name}
                    </span>
                    <button
                      onClick={() => handleDeleteTag(tag.id || tag._id)}
                      className="bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-500/30"
                    >
                      <FaTrash className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ManageTags
