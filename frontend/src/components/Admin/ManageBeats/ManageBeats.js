import React, { useState, useEffect } from 'react';
import { createBeat, getBeats, deleteBeat } from '../../../services/api/beats';
import { FaImage, FaVideo, FaChevronDown, FaTrash } from 'react-icons/fa';
import { getTags } from '../../../services/api/tags';
import UserRegisterError from '../../Error/UserRegisterError/UserRegisterError'; // Adjust import path

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

  const [tags, setTags] = useState([]);
  const [beats, setBeats] = useState([]);
  const [isFormDropdownOpen, setIsFormDropdownOpen] = useState(false);
  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageName, setImageName] = useState('No file chosen'); 
  const [audioName, setAudioName] = useState('No file chosen'); 
  const [validationErrors, setValidationErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [deletedBeatId, setDeletedBeatId] = useState(null); 
  const [isImageLoaded, setImageLoaded] = useState(false);

  const validateForm = () => {
    const errors = {};

    if (!beatDetails.title) errors.title = 'Title is required';
    if (!beatDetails.description) errors.description = 'Description is required';
    if (!beatDetails.price) errors.price = 'Price is required';
    if (!beatDetails.bpm) errors.bpm = 'BPM is required';
    if (!beatDetails.tone) errors.tone = 'Tone is required';
    if (!beatDetails.image) errors.image = 'Image is required';
    if (!beatDetails.audioURL) errors.audioURL = 'Audio file is required';

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleCreateBeat = async () => {
    if (!validateForm()) return; // Prevent submission if there are validation errors

    setLoading(true);
    try {
      const response = await createBeat(beatDetails);
      if (response.success) {
        setSuccessMessage('Beat created successfully!');
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
        fetchBeats();
        setTimeout(() => setSuccessMessage(''), 3000); // Fade out message after 3 seconds
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
        setDeletedBeatId(beatId);
        setBeats(beats.filter((beat) => beat.id !== beatId)); 
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
      setTags(tags);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBeatDetails({ ...beatDetails, image: file });
      setImageName(file.name);
    }
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBeatDetails({ ...beatDetails, audioURL: file });
      setAudioName(file.name);
    }
  };

  return (
    <div className="p-10 m-10 bg-gray-800 shadow-header-shadow rounded-lg">

      {successMessage && (
        <div className="mb-8 px-4 py-2 text-white bg-green-600 rounded-md transition-opacity duration-300 ease-in-out">
          {successMessage}
        </div>
      )}

      <div className="mx-10 flex justify-center">
        <button
          onClick={toggleFormDropdown}
          className="bg-teal-800 text-white text-lg px-8 py-2 rounded-lg hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300 transform hover:scale-110"
        >
          Create Beat
        </button>
      </div>

      {isFormDropdownOpen && (
        <form className="mb-8 mt-6 mx-12 py-10 rounded-lg bg-gray-800">
          {/* Title */}
          <div className="mb-8 mx-10">
            <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter beat title"
              value={beatDetails.title}
              onChange={(e) => setBeatDetails({ ...beatDetails, title: e.target.value })}
              className={`mt-1 block w-full px-4 py-2 border ${validationErrors.title ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-900 text-white transform transition-transform duration-300 hover:scale-105`}
            />
            {validationErrors.title && <p className="text-red-500 text-sm">{validationErrors.title}</p>}
          </div>

          {/* Description */}
          <div className="mb-8 mx-10">
            <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter beat description"
              value={beatDetails.description}
              onChange={(e) => setBeatDetails({ ...beatDetails, description: e.target.value })}
              className={`mt-1 block w-full px-4 py-2 border ${validationErrors.description ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-900 text-white transform transition-transform duration-300 hover:scale-105`}
            />
            {validationErrors.description && <p className="text-red-500 text-sm">{validationErrors.description}</p>}
          </div>

          {/* Price */}
          <div className="mb-8 mx-10">
            <label htmlFor="price" className="block text-sm font-medium text-white mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              placeholder="Enter beat price"
              value={beatDetails.price}
              onChange={(e) => setBeatDetails({ ...beatDetails, price: e.target.value })}
              className={`mt-1 block w-full px-4 py-2 border ${validationErrors.price ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-900 text-white transform transition-transform duration-300 hover:scale-105`}
            />
            {validationErrors.price && <p className="text-red-500 text-sm">{validationErrors.price}</p>}
          </div>

          {/* BPM */}
          <div className="mb-8 mx-10">
            <label htmlFor="bpm" className="block text-sm font-medium text-white mb-2">
              BPM
            </label>
            <input
              type="text"
              id="bpm"
              placeholder="Enter BPM"
              value={beatDetails.bpm}
              onChange={(e) => setBeatDetails({ ...beatDetails, bpm: e.target.value })}
              className={`mt-1 block w-full px-4 py-2 border ${validationErrors.bpm ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-900 text-white transform transition-transform duration-300 hover:scale-105`}
            />
            {validationErrors.bpm && <p className="text-red-500 text-sm">{validationErrors.bpm}</p>}
          </div>

          {/* Tone */}
          <div className="mb-8 mx-10">
            <label htmlFor="tone" className="block text-sm font-medium text-white mb-2">
              Tone
            </label>
            <input
              type="text"
              id="tone"
              placeholder="Enter tone"
              value={beatDetails.tone}
              onChange={(e) => setBeatDetails({ ...beatDetails, tone: e.target.value })}
              className={`mt-1 block w-full px-4 py-2 border ${validationErrors.tone ? 'border-red-500' : 'border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-gray-900 text-white transform transition-transform duration-300 hover:scale-105`}
            />
            {validationErrors.tone && <p className="text-red-500 text-sm">{validationErrors.tone}</p>}
          </div>


          <div className='flex justify-center'>

          {/* Image */}
          <div className="mb-8 mx-10">
            <label htmlFor="image" className="block text-sm font-medium text-white text-center p-2">
              Image
            </label>
            <div className="flex items-center">
              <label className="flex items-center px-3 py-2 bg-gray-700 rounded-md shadow-sm cursor-pointer hover:bg-gray-600">
                <FaImage className="mr-2" />
                <span>{imageName}</span>
                <input
                  type="file"
                  id="image"
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                  />
              </label>
            </div>
            {validationErrors.image && <p className="text-red-500 text-sm">{validationErrors.image}</p>}
          </div>

          {/* Audio File */}
          <div className="mb-8 mx-10">
          <label htmlFor="audioURL" className="block text-sm font-medium text-white text-center p-2">
            Audio
          </label>
          <div className="flex items-center">
            <label className="flex items-center px-3 py-2 bg-gray-700 rounded-md shadow-sm cursor-pointer hover:bg-gray-600">
              <FaVideo className="mr-2" />
              <span>{audioName}</span>
              <input
                type="file"
                id="audioURL"
                onChange={handleAudioChange}
                className="hidden"
                accept="audio/*"
                />
            </label>
          </div>
          {validationErrors.audioURL && <p className="text-red-500 text-sm">{validationErrors.audioURL}</p>}
        </div>


        </div>

        {/* Tags Dropdown */}
        <div className="mb-8 mx-10">
          <label htmlFor="tags" className="block text-sm font-medium text-white mb-2">
            Tags
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={toggleTagsDropdown}
              className="w-full px-4 py-2 text-left bg-gray-900 text-white border border-gray-600 rounded-md shadow-sm hover:bg-gray-800"
            >
              Select Tags <FaChevronDown className="inline-block ml-2" />
            </button>
            {isTagsDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-gray-900 border border-gray-600 rounded-md shadow-lg">
                {tags.map((tag) => (
                  <div
                    key={tag.id}
                    className={`cursor-pointer px-4 py-2 ${
                      beatDetails.tags.includes(tag.id)
                        ? 'bg-cyan-600 text-white'
                        : 'hover:bg-gray-800 text-white'
                    }`}
                    onClick={() => handleTagSelect(tag.id)}
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Create Beat */}
        <div className="mb-8 mx-10">
          <button
            type="button"
            onClick={handleCreateBeat}
            className="w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Create Beat
          </button>
        </div>
          
        {/* Form validation errors */}
        {Object.keys(validationErrors).length > 0 && (
          <UserRegisterError message="Please fix the errors above and try again." />
        )}
        </form>
      )}

      <div className="text-white rounded-lg max-w-5xl mx-auto"> 
        <div className="m-6 bg-gray-800 rounded-lg p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {beats.map((beat) => {
              return (
                <div
                  key={beat.id}
                  className="p-4 bg-gray-800 border border-teal-600 rounded-lg flex items-center hover:bg-gray-700 transition-colors duration-300 ease-in-out"
                >

                  {/* Image Container */}
                  <div className="relative w-32 h-32 mr-4 flex-shrink-0"> 
                    {/* Gray placeholder effect while image is loading */}
                    {!isImageLoaded && (
                      <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-md"></div>
                    )}

                    <img
                      src={`http://localhost:3001/${beat.image}`}
                      alt="Cover Art"
                      className={`w-full h-full rounded-md object-cover transition-opacity duration-500 ${
                        isImageLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={() => setImageLoaded(true)}
                    />
                  </div>
                  
                  {/* Beat Information */}
                  <div className="flex flex-col text-left flex-grow">
                    <h3 className="text-md font-semibold text-white mb-8">{beat.title}</h3>
                    <p className="text-sm text-gray-400">BPM: {beat.bpm}</p>
                    <p className="text-sm text-gray-400">Tone: {beat.tone}</p>

                    {/* Flex container to keep Tone and Trash on the same line */}
                    <div className="flex justify-between items-center mt-2">
                    <p className="text-sm font-bold text-gray-400 mt-2">${beat.price}</p>

                      <button
                        onClick={() => handleDeleteBeat(beat.id)}
                        className="bg-red-600 text-white hover:bg-red-700 transition-all duration-300 ease-in-out p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
                        >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ManageBeats;
