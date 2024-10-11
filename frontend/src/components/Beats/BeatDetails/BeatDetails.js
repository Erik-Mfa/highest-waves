import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated } from '../../../services/api/auth';
import { getBeatById } from '../../../services/api/beats';
import { addToCartAndUpdate } from '../../../store/cartSlice';
import { FaPlay, FaPause, FaShoppingCart } from 'react-icons/fa'; // Import FaPause
import { setCurrentId, setCurrentTrack, setCurrentTitle, setCurrentCover, togglePlayPause } from '../../../store/audioPlayerSlice';

function BeatDetails() {
  const [beat, setBeat] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFadeIn, setIsFadeIn] = useState(false);

  const { id: beatId } = useParams();
  const dispatch = useDispatch();
  
  const currentTrack = useSelector((state) => state.audioPlayer.currentTrack);
  const isPlaying = useSelector((state) => state.audioPlayer.isPlaying);

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
        setIsLoading(false);
        setIsFadeIn(true);
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
    if (currentTrack !== `http://localhost:3001/${beat.audioURL}`) {
      dispatch(setCurrentTrack(`http://localhost:3001/${beat.audioURL}`));
      dispatch(setCurrentTitle(beat.title));
      dispatch(setCurrentId(beat.id));
      dispatch(setCurrentCover(`http://localhost:3001/${beat.image}`));
      if (!isPlaying) {
        dispatch(togglePlayPause(true));
      }
    } else {
      dispatch(togglePlayPause()); // Toggle if it's the same track
    }
  };

  if (!beat) return <div className="text-white text-center py-4">Beat not found</div>;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-start pt-20 px-4 ${isFadeIn ? 'fade-in-active' : 'fade-in'}`}>
      <div className="flex items-start bg-gray-800 p-8 rounded-2xl w-full max-w-5xl border border-gray-700">
      
        {/* Left Side: Beat Image & Play Button */}
        <div className="flex-shrink-1 lg:w-1/2 mb-6 lg:mb-0 lg:mr-8 relative">
          <div 
            className="relative w-full h-[300px] lg:h-[400px] bg-gradient-to-br from-teal-800 to-gray-800 rounded-xl overflow-hidden cursor-pointer"
            onClick={handlePlayTrack}
          >
            {/* Image */}
            <img
              src={`http://localhost:3001/${beat.image}`}
              alt={beat.title}
              className="w-full h-full object-cover"
              style={{ aspectRatio: '1/1' }}
            />

            {/* Play/Pause button with hover effect */}
            <div className="absolute inset-0 flex justify-center items-center transition-all duration-[0.8s] ease-in-out">
              <div className="bg-black bg-opacity-60 hover:bg-opacity-0 w-full h-full flex justify-center items-center transition-all duration-[1.2s] ease-in-out">
                {currentTrack === `http://localhost:3001/${beat.audioURL}` && isPlaying ? (
                  <FaPause size={64} className="text-teal-400 hover:text-teal-500 transform hover:scale-125 transition-all duration-[1.2s] ease-in-out" />
                ) : (
                  <FaPlay size={64} className="text-teal-400 hover:text-teal-500 transform hover:scale-125 transition-all duration-[1.2s] ease-in-out" />
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side: Beat Info */}
        <div className="flex-1 lg:w-1/2 text-white text-center lg:text-left space-y-6 lg:px-0">
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-wide text-teal-400">
            {beat.title}
          </h2>
          <p className="text-lg text-gray-300 flex justify-center lg:justify-start items-center space-x-2">
            <span className="text-teal-400 font-semibold">By:</span>
            <span>{beat.owner.username}</span>
          </p>
          <div className="text-lg text-gray-300 flex justify-between items-center space-x-2">
            <span className="text-5xl font-bold text-green-400">${beat.price}</span>
            <button
              onClick={handleAddToCart}
              className="bg-teal-800 text-white text-lg px-4 py-2 rounded-lg hover:bg-teal-700 hover:shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center space-x-2"
            >
              <FaShoppingCart /> <span>Add to Cart</span>
            </button>
          </div>
          <div className="w-full h-[1px] bg-gray-700"></div>
          <div className="flex justify-around lg:justify-start lg:space-x-10 text-gray-400">
            <div className="flex flex-col lg:items-start">
              <span className="text-lg font-semibold text-white">BPM: {beat.bpm}</span>
            </div>
            <div className="flex flex-col lg:items-start">
              <span className="text-lg font-semibold text-white">Tone: {beat.tone}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Beat Description */}
      <div className="w-full max-w-5xl mt-8 flex justify-center">
        <blockquote className="text-3xl lg:text-4xl text-teal-500 font-bold italic text-center lg:text-center max-w-3xl border-teal-500 mt-4">
          &ldquo;{beat.description}&rdquo;
        </blockquote>
      </div>
    </div>
  );
}

export default BeatDetails;
