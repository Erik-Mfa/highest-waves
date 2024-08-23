import React, { useEffect, useState, useContext } from 'react';
import './FeaturedBeats.css';
import { getBeats } from '../../../services/endpoints/beats';
import ContextAudioPlayer from '../../Layout/ContextAudioPlayer';
import { FaPlay } from 'react-icons/fa';

function FeaturedBeats() {
  const [featuredBeats, setFeaturedBeats] = useState([]);
  const { playTrack } = useContext(ContextAudioPlayer); // Access the playTrack function from the context

  useEffect(() => {
    const fetchFeaturedBeats = async () => {
      try {
        const response = await getBeats();
        const latestBeats = response.slice(0, 5); // Get the latest 5 beats
        setFeaturedBeats(latestBeats);
      } catch (error) {
        console.error('Error fetching featured beats:', error);
      }
    };

    fetchFeaturedBeats();
  }, []);

  if (featuredBeats.length === 0) return <div>Loading...</div>;

  const handlePlayTrack = (beat) => {
    playTrack(`http://localhost:3001/${beat.audioURL}`, beat.title, `http://localhost:3001/${beat.image}`);
  };

  return (
    <div className="bg-black py-8 px-4">
      <h2 className="text-3xl font-bold text-center text-white mb-8" style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}>
        Featured Beats
      </h2>
      <div className="relative overflow-hidden marquee">
        <div className="flex marquee-content">
          {featuredBeats.concat(featuredBeats).map((beat, index) => (
            <div key={`${beat.id}-${index}`} className="inline-block mr-5">
              <div className="relative w-64 h-64 bg-gray-800 flex items-center justify-center rounded-lg transition-transform transform group hover:scale-105">
                <img
                  src={`http://localhost:3001/${beat.image}`}
                  alt={beat.title}
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: '5/5' }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayTrack(beat);
                  }}
                  className="absolute inset-0 flex justify-center items-center text-white bg-black bg-opacity-50 hover:bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FaPlay size={48} />
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
