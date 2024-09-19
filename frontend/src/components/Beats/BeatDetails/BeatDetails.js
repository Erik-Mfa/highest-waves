import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated } from '../../../services/api/auth';
import { getBeatById } from '../../../services/api/beats';
import { addToCartAndUpdate } from '../../../store/cartSlice';
import { FaPlay, FaShoppingCart } from 'react-icons/fa';
import Loading from '../../Loading/Loading';
import { setCurrentTrack, setCurrentTitle, setCurrentCover, togglePlayPause } from '../../../store/audioPlayerSlice';

function BeatDetails() {
  const [beat, setBeat] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id: beatId } = useParams();
  const dispatch = useDispatch();
  const isPlaying = useSelector(state => state.audioPlayer.isPlaying);

  useEffect(() => {
    const fetchBeatDetails = async () => {
      try {
        const userToken = await isAuthenticated();
        const beatData = await getBeatById(beatId);
        setBeat(beatData);
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

    dispatch(addToCartAndUpdate({ beatId: beat.id, userId: user.userId }));
  };

  const handlePlayTrack = () => {
    dispatch(setCurrentTrack(`http://localhost:3001/${beat.audioURL}`));
    dispatch(setCurrentTitle(beat.title));
    dispatch(setCurrentCover(`http://localhost:3001/${beat.image}`));
    if (!isPlaying) {
      dispatch(togglePlayPause());
    }
  };

  if (loading) return <Loading />;

  if (!beat) return <div className="text-white text-center py-4">Beat not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-start justify-center pt-16 px-4">
      <div className="flex items-start bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-5xl border border-gray-700">
        {/* Left Side: Beat Image & Play Button */}
        <div className="flex-shrink-1 lg:w-1/2 mb-6 lg:mb-0 lg:mr-8 relative">
          <div 
            className="relative w-full h-[300px] lg:h-[400px] bg-gradient-to-br from-teal-800 to-gray-800 rounded-xl overflow-hidden cursor-pointer"
            onClick={handlePlayTrack}
          >
            <img
              src={`http://localhost:3001/${beat.image}`}
              alt={beat.title}
              className="w-full h-full object-cover opacity-90"
              style={{ aspectRatio: '1/1' }}
            />
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-60">
              <FaPlay 
                size={64} 
                className="text-teal-400 hover:text-teal-500 transform hover:scale-125 transition-transform duration-200"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Beat Info */}
        <div className="flex-1 lg:w-1/2 text-white text-center lg:text-left space-y-4">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-wide text-teal-400">{beat.title}</h2>
          <p className="text-lg text-gray-300">By: <span className="text-teal-400">{beat.owner.username}</span></p>
          <p className="text-xl">
            Price: 
            <span className="text-teal-500 font-bold"> ${beat.price}</span>
          </p>
          <p className="text-sm text-gray-400">BPM: {beat.bpm}</p>
          <p className="text-sm text-gray-400">Tone: {beat.tone}</p>
          <p className="text-md text-gray-300 border-t border-gray-700 pt-4">Description: {beat.description}</p>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full max-w-xs flex items-center justify-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-5 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <FaShoppingCart /> <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BeatDetails;
