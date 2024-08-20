import React, { useContext, useEffect, useState } from 'react';
import axios from '../../../axios/axios';
import { useParams } from 'react-router-dom';
import { isAuthenticated } from '../../../services/auth';
import { FaPlay } from 'react-icons/fa';
import AudioPlayerContext from '../../Layout/AudioPlayerContext';

function BeatDetails() { 
  const [beat, setBeat] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id: beatId } = useParams();
  const { playTrack } = useContext(AudioPlayerContext);

  useEffect(() => {
    const fetchBeatDetails = async () => {
      try {
        const userToken = await isAuthenticated();
        const response = await axios.get(`/beats/${beatId}`);
        setBeat(response.data);
        setUser(userToken);
      } catch (error) {
        console.error('Error fetching beat details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBeatDetails();
  }, [beatId]);

  const handleAddToCart = async () => {
    if (!user) {
      alert('You must be logged in to add items to your cart.');
      return;
    }

    try {
      await axios.post('/carts', {
        beat: beat.id,
        user: user.userId
      }, { withCredentials: true });
      alert('Beat added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add beat to cart.');
    }
  };

  const handlePlayTrack = () => {
    playTrack(`http://localhost:3001/${beat.audioURL}`, beat.title, `http://localhost:3001/${beat.image}`);
  };

  if (loading) return <div className="text-white text-center py-4">Loading...</div>;
  if (!beat) return <div className="text-white text-center py-4">Beat not found</div>;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center pt-10 px-4">
      <div className="flex flex-col lg:flex-row items-start bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
        {/* Image Section */}
        <div className="flex-shrink-0 lg:w-1/2 lg:max-w-lg mb-4 lg:mb-0 lg:mr-8 relative">
          <div className="relative w-full h-[300px] lg:h-[400px] bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={`http://localhost:3001/${beat.image}`}
              alt={beat.title}
              className="w-full h-full object-cover"
              style={{ aspectRatio: '1/1' }}
            />
            <button
              onClick={handlePlayTrack}
              className="absolute inset-0 flex justify-center items-center text-white bg-black bg-opacity-50 hover:bg-opacity-70"
            >
              <FaPlay size={48} />
            </button>
          </div>
        </div>
  
        {/* Information Section */}
        <div className="flex-1 lg:w-1/2 text-white">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">{beat.title}</h2>
          <p className="text-lg mb-4">By: {beat.owner.username}</p>
          <p className="text-lg mb-4">
            Price: 
            <span className="text-cyan-600 font-bold"> ${beat.price}</span>
          </p>
          <p className="text-md mb-4">BPM: {beat.bpm}</p>
          <p className="text-md mb-4">Tone: {beat.tone}</p>
          <p className="text-md mb-6">Beat Description: {beat.description}</p>
  
          <button
            onClick={handleAddToCart}
            className="w-full max-w-xs bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default BeatDetails;
