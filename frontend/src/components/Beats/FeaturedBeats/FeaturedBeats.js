import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentTrack, setCurrentTitle, setCurrentCover, playTrack } from '../../../store/audioPlayerSlice';
import { setPlaylist, setCurrentIndex } from '../../../store/playlistSlice';
import { getBeats } from '../../../services/api/beats';
import { FaPlay } from 'react-icons/fa';
import './FeaturedBeats.css';

function FeaturedBeats() {
  const [featuredBeats, setFeaturedBeats] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    dispatch(setCurrentTrack(`http://localhost:3001/${beat.audioURL}`));
    dispatch(setCurrentTitle(beat.title));
    dispatch(setCurrentCover(`http://localhost:3001/${beat.image}`));
  };

  return (
    <div className="bg-w p-20">
      <h2 className="text-3xl font-bold text-center text-white mb-8" style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}>
        Featured Beats
      </h2>
      <div className="relative overflow-hidden marquee">
        <div className="flex marquee-content">
          {featuredBeats.concat(featuredBeats).map((beat, index) => (
            <div 
              key={`${beat.id}-${index}`} 
              className="inline-block mr-5"
              onClick={() => handleBeatClick(beat.id)} // Navigate on image container click
            >
              <div 
                className="w-64 h-64 flex items-center justify-center rounded-lg transition-transform transform group hover:scale-105"
              >
                <img
                  src={`http://localhost:3001/${beat.image}`}
                  alt={beat.title}
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: '5/5' }}
                />
                <button
                  onClick={(e) => handlePlayTrack(e, beat)} // Play track on button click
                  className="play-button text-cyan-400"
                >
                  <FaPlay size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedBeats;
