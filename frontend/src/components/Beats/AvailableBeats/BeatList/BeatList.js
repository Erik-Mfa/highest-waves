import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playTrack, setCurrentTrack, setCurrentTitle, setCurrentOwner, setCurrentCover } from '../../../../store/audioPlayerSlice';
import { setPlaylist, nextTrack, prevTrack, setCurrentIndex } from '../../../../store/playlistSlice';
import { useNavigate } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import './BeatList.css';

function BeatList({ beats, filters }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(setCurrentTrack(`http://localhost:3001/${beat.audioURL}`));
    dispatch(setCurrentTitle(beat.title));
    dispatch(setCurrentOwner(beat.owner.username));
    dispatch(setCurrentCover(`http://localhost:3001/${beat.image}`));
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
                <div className="w-full pt-[100%] relative rounded-lg overflow-hidden">
                  <img
                    src={`http://localhost:3001/${beat.image}`}
                    alt={beat.title}
                    className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-60"
                  />
                  
                  {/* Play Button */}
                  <button
                    onClick={(e) => handlePlayTrack(e, beat)}
                    className="absolute top-1/2 left-1/2 mt-2 transform -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full text-cyan-400 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 z-10"
                  >
                    <FaPlay size={35} />
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
