import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated } from '../../../services/api/auth';
import { getBeatById } from '../../../services/api/beats';
import { addToCart } from '../../../services/api/carts';
import { FaPlay } from 'react-icons/fa';
import Loading from '../../Loading/Loading'; // Import the Loading component
import { setCurrentTrack, setCurrentTitle, setCurrentCover, togglePlayPause } from '../../../store/audioPlayerSlice'; // Import the actions from Redux slice

function BeatDetails() {
  const [beat, setBeat] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id: beatId } = useParams();
  const dispatch = useDispatch();
  const isPlaying = useSelector(state => state.audioPlayer.isPlaying); // Track play/pause state

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
  }, [beatId, dispatch, isPlaying]);

  const handleAddToCart = async () => {
    if (!user) {
      alert('You must be logged in to add items to your cart.');
      return;
    }

    try {
      await addToCart(beat.id, user.userId);
      alert('Beat added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add beat to cart.');
    }
  };

  const handlePlayTrack = () => {
    // Set playback details and start playing when image is clicked
    dispatch(setCurrentTrack(`http://localhost:3001/${beat.audioURL}`));
    dispatch(setCurrentTitle(beat.title));
    dispatch(setCurrentCover(`http://localhost:3001/${beat.image}`));
    if (!isPlaying) {
      dispatch(togglePlayPause()); // Start playback if not already playing
    }
  };

  if (loading) return <Loading />; // Use your custom loading component

  if (!beat) return <div className="text-white text-center py-4">Beat not found</div>;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center pt-10 px-4">
      <div className="flex flex-col lg:flex-row items-start bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
        {/* Image Section */}
        <div className="flex-shrink-0 lg:w-1/2 lg:max-w-lg mb-4 lg:mb-0 lg:mr-8 relative">
          <div className="relative w-full h-[300px] lg:h-[400px] bg-gray-800 rounded-lg overflow-hidden cursor-pointer" onClick={handlePlayTrack}>
            <img
              src={`http://localhost:3001/${beat.image}`}
              alt={beat.title}
              className="w-full h-full object-cover"
              style={{ aspectRatio: '1/1' }}
            />
            <div className="absolute inset-0 flex justify-center items-center text-white bg-black bg-opacity-50">
              <FaPlay size={48} />
            </div>
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
