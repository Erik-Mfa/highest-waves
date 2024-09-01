import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playTrack, setCurrentTrack, setCurrentTitle, setCurrentCover } from '../../../../store/audioPlayerSlice';
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
    dispatch(setCurrentCover(`http://localhost:3001/${beat.image}`));
  };

  return (
    <div className="beat-list-container" style={{ backgroundColor: '#102D40' }}>
      {filteredBeats.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBeats.map((beat) => (
            <div
              key={beat.id}
              className="beat-item relative rounded-lg overflow-hidden transition-shadow cursor-pointer group"
              onClick={() => handleBeatClick(beat.id)}
            >
              <img
                src={`http://localhost:3001/${beat.image}`}
                alt={beat.title}
                className="beat-image"
              />
              <button
                onClick={(e) => handlePlayTrack(e, beat)}
                className="play-button text-cyan-400"
              >
                <FaPlay size={36} />
              </button>
              <div className="beat-details">
                <h3 className="text-md font-semibold truncate">{beat.title}</h3>
                <p className="text-sm">by {beat.owner.username}</p>
                <p className="text-lg font-bold text-cyan-400">{`$${beat.price}`}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No beats available.</p>
      )}
    </div>
  );
}

export default BeatList;
