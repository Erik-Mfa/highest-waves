import React, { useState } from 'react';
import { createTag } from '../../../services/endpoints/tags'; // Import your tag creation service

const CreateTag = () => {
  const [tagDetails, setTagDetails] = useState({
    name: '',
  });

  const handleCreateTag = async () => {
    try {
      const response = await createTag(tagDetails);
      if (response.success) {
        console.log("Tag created successfully");
        alert("Tag created successfully"); // Provide user feedback
      } else {
        console.error("Failed to create tag");
      }
    } catch (error) {
      console.error("Error creating tag:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add a new tag</h2>
      <form>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter tag name"
            value={tagDetails.name}
            onChange={(e) => setTagDetails({ ...tagDetails, name: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
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
    </div>
  );
};

export default CreateTag;
