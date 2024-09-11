import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentTrack, setCurrentTitle, setCurrentCover } from '../../../store/audioPlayerSlice';
import { setPlaylist, setCurrentIndex } from '../../../store/playlistSlice';
import { getBeats } from '../../../services/api/beats';
import { FaPlay } from 'react-icons/fa';
import './FeaturedBeats.css';
import Loading from '../../Loading/Loading';

function FeaturedBeats() {
  const [featuredBeats, setFeaturedBeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFeaturedBeats = async () => {
      setLoading(true);

      try {
        const response = await getBeats();
        const latestBeats = response.slice(0, 7); // Get the latest 7 beats
        setFeaturedBeats(latestBeats);
      } catch (error) {
        console.error('Error fetching featured beats:', error);
      } finally {
        setLoading(false);
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

  if (loading) return <Loading />; // Replace with the Loading component

  return (
    <div 
    className="relative bg-gray-950 py-10 border-t-2 border-teal-600 shadow-bottom-lg"
  >
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
            <div
              className="w-64 h-64 flex items-center justify-center rounded-lg transition-transform transform group hover:scale-105 relative"
            >
              <img
                src={`http://localhost:3001/${beat.image}`}
                alt={beat.title}
                className="w-full h-full object-cover rounded-lg"
                style={{ aspectRatio: '1 / 1' }}
              />
              <button
                onClick={(e) => handlePlayTrack(e, beat)}
                className="absolute inset-0 flex items-center justify-center p-2 rounded-full text-cyan-400 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
              >
                <FaPlay size={24} />
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
