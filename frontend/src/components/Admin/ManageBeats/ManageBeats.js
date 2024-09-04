import React, { useState, useEffect } from 'react';
import { createBeat, getBeats, deleteBeat } from '../../../services/api/beats';
import { getTags } from '../../../services/api/tags';
import { FaImage, FaVideo, FaChevronDown, FaTrash } from 'react-icons/fa';
import Loading from '../../Loading/Loading'; // Import the Loading component

const ManageBeats = () => {
  const [beatDetails, setBeatDetails] = useState({
    title: '',
    description: '',
    price: '',
    bpm: '',
    tone: '',
    image: '',
    audioURL: '',
    owner: '',
    tags: [],
  });

  const [availableTags, setAvailableTags] = useState([]);
  const [isFormDropdownOpen, setIsFormDropdownOpen] = useState(false);
  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false);
  const [beats, setBeats] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const [imageName, setImageName] = useState('No file chosen'); // State for image name
  const [audioName, setAudioName] = useState('No file chosen'); // State for audio name

  const handleCreateBeat = async () => {
    setLoading(true);
    try {
      const response = await createBeat(beatDetails);
      if (response.success) {
        fetchBeats();
        setBeatDetails({
          title: '',
          description: '',
          price: '',
          bpm: '',
          tone: '',
          image: '',
          audioURL: '',
          owner: '',
          tags: [],
        });
        setIsFormDropdownOpen(false);
      } else {
        console.error('Failed to create beat');
      }
    } catch (error) {
      console.error('Error creating beat:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBeat = async (beatId) => {
    try {
      const response = await deleteBeat(beatId);
      if (response.success) {
        setBeats(beats.filter((beat) => beat._id !== beatId)); 
        fetchBeats();
      } else {
        console.error('Failed to delete beat');
      }
    } catch (error) {
      console.error('Error deleting beat:', error);
    }
  };

  const fetchBeats = async () => {
    try {
      const data = await getBeats();
      setBeats(data);
    } catch (error) {
      console.error('Error fetching beats:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const tags = await getTags();
      setAvailableTags(tags);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  useEffect(() => {
    fetchTags();
    fetchBeats();
  }, []);

  const toggleFormDropdown = () => {
    setIsFormDropdownOpen(!isFormDropdownOpen);
    setIsTagsDropdownOpen(false); // Ensure tags dropdown is closed when form dropdown is toggled
  };

  const toggleTagsDropdown = () => {
    setIsTagsDropdownOpen(!isTagsDropdownOpen);
  };

  const handleTagSelect = (tagId) => {
    const newTags = beatDetails.tags.includes(tagId)
      ? beatDetails.tags.filter((id) => id !== tagId)
      : [...beatDetails.tags, tagId];

    setBeatDetails({ ...beatDetails, tags: newTags });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBeatDetails({ ...beatDetails, image: file });
      setImageName(file.name);
    }
  };

  // Handle audio file change
  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBeatDetails({ ...beatDetails, audioURL: file });
      setAudioName(file.name);
    }
  };

  return (
    <div className="p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
      {loading && <Loading />} {/* Show loading component if loading */}

      <div className="mb-4">
        <button
          onClick={toggleFormDropdown}
          className="w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Add Beat
        </button>
      </div>

      {isFormDropdownOpen && (
        <form className="space-y-4 mb-4">
          {/* Form fields */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-white">
              Title
            </label>
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
            <label htmlFor="description" className="block text-sm font-medium text-white">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter beat description"
              value={beatDetails.description}
              onChange={(e) => setBeatDetails({ ...beatDetails, description: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-900 text-white"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-white">
              Price
            </label>
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
            <label htmlFor="bpm" className="block text-sm font-medium text-white">
              BPM
            </label>
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
            <label htmlFor="tone" className="block text-sm font-medium text-white">
              Tone
            </label>
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
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button
                type="button"
                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              >
                <i className="text-xl">
                  <FaImage />
                </i>
                <span className="ml-2">{imageName}</span>
              </button>
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <input
                type="file"
                id="audioURL"
                onChange={handleAudioChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button
                type="button"
                className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white flex items-center justify-center hover:bg-gray-600 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              >
                <i className="text-xl">
                  <FaVideo />
                </i>
                <span className="ml-2">{audioName}</span>
              </button>
            </div>
          </div>

          <div className="mb-4">
            <button
              type="button"
              onClick={handleCreateBeat}
              className="w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Create Beat
            </button>
          </div>
        </form>
      )}

    <ul className="space-y-4">
      {beats.map((beat) => (
        <li key={beat.id} className="bg-gray-700 p-4 rounded-md shadow-lg flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src={`http://localhost:3001/${beat.image}`} 
              alt="Cover Art" 
              className="w-16 h-16 rounded-md object-cover"
            />
            <div>
              <h3 className="text-lg font-bold text-white">{beat.title}</h3>
              <p className="text-sm text-gray-300">{beat.description}</p>
              <h3 className="text-md text-gray-200">{beat.owner.username}</h3>
            </div>
          </div>
          <button
              onClick={() => handleDeleteBeat(beat._id)}
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-transform transform hover:scale-105"
            >
              <FaTrash />
            </button>
        </li>
      ))}
    </ul>
      
    </div>
  );
};

export default ManageBeats;
