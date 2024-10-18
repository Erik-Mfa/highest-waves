import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentId, setCurrentTrack, setCurrentTitle, setCurrentOwner, setCurrentCover, togglePlayPause } from '../../../../store/audioPlayerSlice'; // use togglePlayPause
import { setPlaylist, setCurrentIndex } from '../../../../store/playlistSlice';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaPause } from 'react-icons/fa'; // Import FaPause for the pause button
import './BeatList.css';

function BeatList({ beats, filters }) {
  const [isImageLoaded, setImageLoaded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get the currently playing track and play state from Redux store
  const currentTrack = useSelector((state) => state.audioPlayer.currentTrack);
  const isPlaying = useSelector((state) => state.audioPlayer.isPlaying);
  
  const filteredBeats = beats.filter((beat) => {
    const matchesPrice = beat.price >= filters.price.min && beat.price <= filters.price.max;
    const beatTagIds = beat.tags.map((tag) => tag.id);
    const matchesTag = filters.tag.length > 0 ? filters.tag.every((tagId) => beatTagIds.includes(tagId)) : true;
    const matchesBpm = beat.bpm >= filters.bpm.min && beat.bpm <= filters.bpm.max;
    const matchesTone = filters.tone ? beat.tone === filters.tone : true;
    const matchesUser = filters.user ? beat.owner.username === filters.user : true;

    return matchesPrice && matchesTag && matchesBpm && matchesTone && matchesUser;
  });

  const handleBeatClick = (beatId) => {
    navigate(`/beats/${beatId}`);
  };

  const handlePlayTrack = (e, beat) => {
    e.stopPropagation();
    
    // Set the playlist with all filtered beats
    dispatch(setPlaylist(filteredBeats));
    
    // Find the index of the selected beat
    const trackIndex = filteredBeats.findIndex((b) => b.id === beat.id);
    dispatch(setCurrentIndex(trackIndex));

    // Set the current track details
    dispatch(setCurrentTrack(`${process.env.REACT_APP_API_URL}/${beat.audioURL}`));
    dispatch(setCurrentTitle(beat.title));
    dispatch(setCurrentId(beat.id));
    dispatch(setCurrentOwner(beat.owner.username));
    dispatch(setCurrentCover(`${process.env.REACT_APP_API_URL}/${beat.image}`));

    // Toggle play/pause
    dispatch(togglePlayPause());
  };

  return (
    <div className="relative">
      {filteredBeats.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBeats.map((beat) => (
              <div
              key={beat.id}
              className="relative group rounded-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 w-full"
              onClick={() => handleBeatClick(beat.id)}
              >
              {/* Image Container */}
              <div className="relative">
              {!isImageLoaded && (
                <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-md"></div>
              )}

                <div className="w-full pt-[100%] relative rounded-lg overflow-hidden">
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${beat.image}`}
                    alt={beat.title}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-60 ${
                      isImageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                  
                  {/* Play/Pause Button */}
                  <button
                    onClick={(e) => handlePlayTrack(e, beat)}
                    className="absolute top-1/2 left-1/2 mt-2 transform -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full text-cyan-400 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 z-10"
                  >
                    {/* Conditionally render FaPlay or FaPause */}
                    {currentTrack === `${process.env.REACT_APP_API_URL}/${beat.audioURL}` && isPlaying ? (
                      <FaPause size={35} />
                    ) : (
                      <FaPlay size={35} />
                    )}
                  </button>
                  
                  {/* Black Overlay */}
                  <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white p-2 transition-transform duration-500 ease-out transform translate-y-full group-hover:translate-y-0">
                    <p className="text-sm">by {beat.owner.username}</p>
                    <h3 className="">{beat.price}$</h3>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="mt-2 px-2 text-center">
                <h3 className="text-md text-white font-semibold truncate">{beat.title}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">No beats available.</p>
      )}
    </div>
  );
}

export default BeatList;
