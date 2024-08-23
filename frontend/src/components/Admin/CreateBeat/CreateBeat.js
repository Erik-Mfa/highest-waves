import React, { useState, useEffect } from 'react';
import { createBeat } from '../../../services/endpoints/beats';
import { getTags } from '../../../services/endpoints/tags'; // Import the getTags function
import { FaImage, FaVideo, FaChevronDown } from 'react-icons/fa';

const CreateBeat = () => {
  const [beatDetails, setBeatDetails] = useState({
    title: '',
    description: '',
    price: '',
    bpm: '',
    tone: '',
    image: '',
    audioURL: '',
    owner: '',
    tags: []
  });

  const [availableTags, setAvailableTags] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Fetch the available tags when the component mounts
    const fetchTags = async () => {
      try {
        const tags = await getTags();
        setAvailableTags(tags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  const handleCreateBeat = async () => {
    try {
      const response = await createBeat(beatDetails);
      if (response.success) {
        console.log("Beat created successfully");
      } else {
        console.error("Failed to create beat");
      }
    } catch (error) {
      console.error("Error creating beat:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTagSelect = (tagId) => {
    const newTags = beatDetails.tags.includes(tagId)
      ? beatDetails.tags.filter(id => id !== tagId)
      : [...beatDetails.tags, tagId];

    setBeatDetails({ ...beatDetails, tags: newTags });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-white mb-6">Add Beat</h2>
      <form className="space-y-4">
        {/* Other input fields remain unchanged */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-white">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter beat title"
            value={beatDetails.title}
            onChange={(e) => setBeatDetails({ ...beatDetails, title: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-900 text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-white">Description</label>
          <textarea
            id="description"
            placeholder="Enter beat description"
            value={beatDetails.description}
            onChange={(e) => setBeatDetails({ ...beatDetails, description: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-900 text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-white">Price</label>
          <input
            type="number"
            id="price"
            placeholder="Enter beat price"
            value={beatDetails.price}
            onChange={(e) => setBeatDetails({ ...beatDetails, price: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-900 text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bpm" className="block text-sm font-medium text-white">BPM</label>
          <input
            type="number"
            id="bpm"
            placeholder="Enter beats per minute"
            value={beatDetails.bpm}
            onChange={(e) => setBeatDetails({ ...beatDetails, bpm: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-900 text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tone" className="block text-sm font-medium text-white">Tone</label>
          <input
            type="text"
            id="tone"
            placeholder="Enter beat tone"
            value={beatDetails.tone}
            onChange={(e) => setBeatDetails({ ...beatDetails, tone: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-900 text-white"
          />
        </div>

        <div className="mb-4">
          <div className="relative">
            <input
              type="file"
              id="image"
              onChange={(e) => setBeatDetails({ ...beatDetails, image: e.target.files[0] })}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500">
              <i className="text-xl"><FaImage /></i>
              <span className="ml-2">Choose Image</span>
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="relative">
            <input
              type="file"
              id="audioURL"
              onChange={(e) => setBeatDetails({ ...beatDetails, audioURL: e.target.files[0] })}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500">
              <i className="text-xl"><FaVideo /></i>
              <span className="ml-2">Choose Audio</span>
            </button>
          </div>
        </div>

        {/* Tags dropdown */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-white">Tags</label>
          <button
            type="button"
            onClick={toggleDropdown}
            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white flex items-center justify-between hover:bg-gray-600 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
          >
            <span>Select Tags</span>
            <FaChevronDown />
          </button>
          {isDropdownOpen && (
            <div className="absolute mt-2 w-full bg-gray-700 border border-gray-600 rounded-md shadow-lg z-10">
              {availableTags.map(tag => (
                <div key={tag.id} className="flex items-center px-4 py-2 text-sm text-white cursor-pointer hover:bg-gray-600" onClick={() => handleTagSelect(tag.id)}>
                  <input
                    type="checkbox"
                    checked={beatDetails.tags.includes(tag.id)}
                    onChange={() => handleTagSelect(tag.id)}
                    className="mr-2"
                  />
                  {tag.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleCreateBeat}
          className="w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Create Beat
        </button>
      </form>
    </div>
  );
};

export default CreateBeat;
