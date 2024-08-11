import React, { useEffect, useState } from 'react';
import axios from '../../axios/axios'; // Adjust the import path as needed
import Header from '../Header/Header'; // Ensure Header is included

function BeatDetails({ beatId }) {
  const [beat, setBeat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBeatDetails = async () => {
      try {
        const response = await axios.get(`/beats/${beatId}`);
        console.log(response);
        setBeat(response.data);
      } catch (error) {
        console.error('Error fetching beat details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBeatDetails();
  }, [beatId]);

  if (loading) return <div>Loading...</div>;
  if (!beat) return <div>Beat not found</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <Header />

      <div className="flex flex-col lg:flex-row items-center lg:items-start p-4 lg:p-8">
        {/* Image Section */}
        <div className="flex justify-center lg:w-1/2 max-w-md lg:max-w-none mb-4 lg:mb-0 lg:mr-8">
          <div className="w-1/2 h-full bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={beat.image}
              alt={beat.title}
              className="w-full h-full object-cover"
              style={{ aspectRatio: '5/5' }} // Ensures the image is a square
            />
          </div>
        </div>

        {/* Information Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold mb-2">{beat.title}</h2>
          <p className="text-lg text-gray-300 mb-4">By: {beat.owner.username}</p>
          <p className="text-lg mb-4">
            <span className="text-cyan-600 font-bold">${beat.price}</span>
          </p>
          <p className="text-md text-gray-400 mb-4">BPM: {beat.bpm}</p>
          <p className="text-md text-gray-400 mb-4">Tone: {beat.tone}</p>
          <p className="text-md text-gray-300 mb-6">{beat.description}</p>

          {/* Buy Now Button */}
          <button
            className="w-full max-w-xs bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default BeatDetails;
