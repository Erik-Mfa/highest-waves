import React, { useState, useEffect } from 'react';
import { createTag, getTags, deleteTag } from '../../../services/api/tags'; // Import your tag creation and fetching services
import Loading from '../../Loading/Loading'; // Import the Loading component
import { FaTrash } from 'react-icons/fa';

const ManageTags = () => {
  const [tagDetails, setTagDetails] = useState({ name: '' });
  const [loading, setLoading] = useState(false); // Add loading stat
  const [tags, setTags] = useState([]);


  const fetchTags = async () => {
    try {
      const tags = await getTags();
      setTags(tags);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleCreateTag = async () => {
    if (!tagDetails.name) {
      alert("Please provide a tag name");
      return;
    }

    setLoading(true);

    try {
      const response = await createTag(tagDetails);
      if (response.success) {
        setTagDetails({ name: '' }); 
        alert("Tag created successfully");
        fetchTags();
      } else {
        console.error("Failed to create tag");
      }
    } catch (error) {
      console.error("Error creating tag:", error);
    }finally {
      setLoading(false);
    }
  };


  

  const handleDeleteTag = async (tagId) => {
    try {
      const response = await deleteTag(tagId);
      if (response.success) {
        setTags(tags.filter((tag) => tag.id !== tagId)); 
      } else {
        console.error('Failed to delete tag');
      }
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto m-10 p-10 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
      {/* Title */}
      <h2 className="text-2xl font-bold text-center text-white mb-6">Add a new tag</h2>
      
      {/* Form */}
      <form>
        <div className="mb-4">
          <input
            type="text"
            id="name"
            placeholder="Enter tag name"
            value={tagDetails.name}
            onChange={(e) => setTagDetails({ ...tagDetails, name: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-white rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
          />
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleCreateTag}
          className="w-full bg-teal-800 text-white text-lg px-4 py-1 rounded-lg hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300 transform hover:scale-110"
        >
          Create Tag
        </button>
      </form>

      {/* Display Tags Underneath the Form */}
      <div className="mt-8 rounded-lg bg-gray-900 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Available Tags</h3>
        <ul className="space-y-2">
          {loading && <div className="text-white">Loading...</div>}

          {/* Tag List */}
          {tags.map((tag) => (
            <li
              key={tag.id || tag._id}
              className="flex items-center justify-between bg-gray-800 text-white text-sm py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-300 ease-in-out"
            >
              <span>{tag.name}</span>

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteTag(tag.id || tag._id)}
                className="bg-red-600 text-white hover:bg-red-700 transition-all duration-300 ease-in-out p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
              >
                <FaTrash className="text-xs" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageTags;
