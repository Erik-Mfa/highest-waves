
import React, { useState } from 'react';
import { createBeat } from '../../../services/beat'; 


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

  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add a new beat</h2>
      <form>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-white">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter beat title"
              value={beatDetails.title}
              onChange={(e) => setBeatDetails({ ...beatDetails, title: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-white">Description</label>
            <textarea
              id="description"
              placeholder="Enter beat description"
              value={beatDetails.description}
              onChange={(e) => setBeatDetails({ ...beatDetails, description: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
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
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-white">Image URL</label>
            <input
              type="file"
              id="image"
              onChange={(e) => setBeatDetails({ ...beatDetails, image: e.target.files[0] })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="audioURL" className="block text-sm font-medium text-white">Audio URL</label>
            <input
              type="file"
              id="audioURL"
              onChange={(e) => setBeatDetails({ ...beatDetails, audioURL: e.target.files[0] })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
            />
          </div>

          <button
            type="button"
            onClick={handleCreateBeat}
            className="w-full py-2 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            Create Beat
          </button>
        </form>
    </div>
  );
};

export default CreateBeat;
