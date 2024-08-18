
import React, { useState } from 'react';
import { createBeat } from '../../services/beat'; 


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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add a new beat</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter beat title"
            value={beatDetails.title}
            onChange={(e) => setBeatDetails({ ...beatDetails, title: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            placeholder="Enter beat description"
            value={beatDetails.description}
            onChange={(e) => setBeatDetails({ ...beatDetails, description: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            placeholder="Enter beat price"
            value={beatDetails.price}
            onChange={(e) => setBeatDetails({ ...beatDetails, price: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bpm" className="block text-sm font-medium text-gray-700">BPM</label>
          <input
            type="number"
            id="bpm"
            placeholder="Enter beats per minute"
            value={beatDetails.bpm}
            onChange={(e) => setBeatDetails({ ...beatDetails, bpm: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tone" className="block text-sm font-medium text-gray-700">Tone</label>
          <input
            type="text"
            id="tone"
            placeholder="Enter beat tone"
            value={beatDetails.tone}
            onChange={(e) => setBeatDetails({ ...beatDetails, tone: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            id="image"
            placeholder="Enter image URL"
            value={beatDetails.image}
            onChange={(e) => setBeatDetails({ ...beatDetails, image: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="audioURL" className="block text-sm font-medium text-gray-700">Audio URL</label>
          <input
            type="text"
            id="audioURL"
            placeholder="Enter audio URL"
            value={beatDetails.audioURL}
            onChange={(e) => setBeatDetails({ ...beatDetails, audioURL: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <button
          type="button"
          onClick={handleCreateBeat}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Beat
        </button>
      </form>
    </div>
  );
};

export default CreateBeat;
