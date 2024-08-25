import React, { useEffect, useState, useContext } from 'react';
import './FeaturedBeats.css';
import { getBeats } from '../../../services/endpoints/beats';
import { useNavigate } from 'react-router-dom';
import ContextAudioPlayer from '../../Layout/ContextAudioPlayer';
import { FaPlay } from 'react-icons/fa';

function FeaturedBeats() {
  const [featuredBeats, setFeaturedBeats] = useState([]);
  const navigate = useNavigate();
  const { playTrack } = useContext(ContextAudioPlayer);

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
    playTrack(`http://localhost:3001/${beat.audioURL}`, beat.title, `http://localhost:3001/${beat.image}`);
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
