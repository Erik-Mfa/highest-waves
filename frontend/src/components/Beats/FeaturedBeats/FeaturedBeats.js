import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentId, setCurrentTrack, setCurrentTitle, setCurrentCover, togglePlayPause } from '../../../store/audioPlayerSlice'; // Added togglePlayPause
import { setPlaylist, setCurrentIndex } from '../../../store/playlistSlice';
import { getBeats } from '../../../services/api/beats';
import { FaPlay, FaPause } from 'react-icons/fa'; // Added FaPause for pause functionality
import './FeaturedBeats.css';

function FeaturedBeats() {
  const [featuredBeats, setFeaturedBeats] = useState([]);
  const [isImageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the currently playing track and play state from Redux store
  const currentTrack = useSelector((state) => state.audioPlayer.currentTrack);
  const isPlaying = useSelector((state) => state.audioPlayer.isPlaying);

  useEffect(() => {
    const fetchFeaturedBeats = async () => {
      try {
        const response = await getBeats();
        const latestBeats = response.slice(0, 7); // Get the latest 7 beats
        setFeaturedBeats(latestBeats);
      } catch (error) {
        console.error('Error fetching featured beats:', error);
      }
    };

    fetchFeaturedBeats();
  }, []);

  const handleBeatClick = (beatId) => {
    navigate(`/beats/${beatId}`);
  };

  const handlePlayTrack = (e, beat) => {
    e.stopPropagation(); // Prevent navigating to BeatDetail

    // Set the playlist with all featured beats
    dispatch(setPlaylist(featuredBeats));

    // Find the index of the selected beat
    const trackIndex = featuredBeats.findIndex((b) => b.id === beat.id);
    dispatch(setCurrentIndex(trackIndex));

    // Set the current track details
    dispatch(setCurrentTrack(`${process.env.REACT_APP_API_URL}/${beat.audioURL}`));
    dispatch(setCurrentTitle(beat.title));
    dispatch(setCurrentId(beat.id));
    dispatch(setCurrentCover(`${process.env.REACT_APP_API_URL}/${beat.image}`));

    // Toggle play/pause
    dispatch(togglePlayPause());
  };

  return (
    <div className="relative bg-black py-10 pt-4 shadow-fade-lg">
      <h2 className="text-2xl font-bold text-center text-white mb-4" style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}>
        Featured Beats
      </h2>

      <div className="relative overflow-hidden">
        <div className="marquee-container overflow-hidden featured-beats-container">
          <div className="marquee-content flex">
            {featuredBeats.concat(featuredBeats).map((beat, index) => (
              <div
                key={`${beat.id}-${index}`}
                className="inline-block mr-5 relative group rounded-lg overflow-hidden"
                onClick={() => handleBeatClick(beat.id)}
              >
                <div className="w-64 h-64 flex items-center justify-center rounded-lg transition-transform transform group hover:scale-105 relative">
                  {!isImageLoaded && (
                    <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-md"></div>
                  )}

                  <img
                    src={`${process.env.REACT_APP_API_URL}/${beat.image}`}
                    alt={beat.title}
                    className={`w-full h-full object-cover rounded-lg ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    style={{ aspectRatio: '1 / 1' }}
                    onLoad={() => setImageLoaded(true)}
                  />

                  <button
                    onClick={(e) => handlePlayTrack(e, beat)}
                    className="absolute inset-0 flex items-center justify-center p-2 rounded-full text-cyan-400 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                  >
                    {/* Conditionally render FaPlay or FaPause */}
                    {currentTrack === `${process.env.REACT_APP_API_URL}/${beat.audioURL}` && isPlaying ? (
                      <FaPause size={32} />
                    ) : (
                      <FaPlay size={32} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedBeats;
