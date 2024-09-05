import React, { useState, useEffect } from 'react';
import { createTag, getTags, deleteTag } from '../../../services/api/tags'; // Import your tag creation and fetching services
import { FaTrash } from 'react-icons/fa';

const ManageTags = () => {
  const [tagDetails, setTagDetails] = useState({ name: '' });
  const [tags, setTags] = useState([]);

  // Fetch tags on component load
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getTags();
        setTags(tags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    fetchTags();
  }, []);

  // Create new tag
  const handleCreateTag = async () => {
    try {
      const response = await createTag(tagDetails);
      if (response.success) {
        setTags([...tags, response.data]); // Add the newly created tag to the list
        setTagDetails({ name: '' }); // Clear input field
        alert("Tag created successfully");
      } else {
        console.error("Failed to create tag");
      }
    } catch (error) {
      console.error("Error creating tag:", error);
    }
  };

  const handleDeleteTag = async (tagId) => {
    try {
      const response = await deleteTag(tagId);
      if (response.success) {
        setTags(tags.filter((tag) => tag.id !== tagId)); 
       
      } else {
        console.error('Failed to delete Tag');
      }
    } catch (error) {
      console.error('Error deleting Tag:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-white mb-6">Add a new tag</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter tag name"
            value={tagDetails.name}
            onChange={(e) => setTagDetails({ ...tagDetails, name: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-white rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
          />
        </div>

        <button
          type="button"
          onClick={handleCreateTag}
          className="w-full py-2 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          Create Tag
        </button>
      </form>

      {/* Display Tags Underneath the Form */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-white mb-4">Existing Tags:</h3>
        <ul className="space-y-2">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <li key={tag.id} className="flex items-center justify-between bg-gray-700 text-white text-sm py-1 px-2 rounded-md">
                {tag.name}
                <button
                  onClick={() => handleDeleteTag(tag.id)}
                  className="bg-red-600 text-white hover:bg-red-700 transition-all duration-300 ease-in-out p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
                >
                  <FaTrash className="text-xs" />
                </button>
              </li>
            ))
          ) : (
            <li className="text-white text-sm">No tags available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ManageTags;
