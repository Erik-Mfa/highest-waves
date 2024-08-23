import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import ContextAudioPlayer from '../../../Layout/ContextAudioPlayer';

function BeatList({ beats, filters }) {
  const navigate = useNavigate();
  const { playTrack } = useContext(ContextAudioPlayer);

  const filteredBeats = beats.filter((beat) => {
    const matchesPrice = beat.price >= filters.price.min && beat.price <= filters.price.max;
    const beatTagIds = beat.tags.map((tag) => tag.id);
    const matchesTag = filters.tag.length > 0 ? filters.tag.every((tagId) => beatTagIds.includes(tagId)) : true;
    const matchesBpm = beat.bpm >= filters.bpm.min && beat.bpm <= filters.bpm.max;
    const matchesTone = filters.tone ? beat.tone === filters.tone : true;
    const matchesUser = filters.user ? beat.user === filters.user : true;

    return matchesPrice && matchesTag && matchesBpm && matchesTone && matchesUser;
  });

  const handleBeatClick = (beatId) => {
    navigate(`/beats/${beatId}`);
  };

  const handlePlayTrack = (beat) => {
    playTrack(`http://localhost:3001/${beat.audioURL}`, beat.title, `http://localhost:3001/${beat.image}`);
  };

  return (
    <div className="">

      {filteredBeats.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBeats.map((beat) => (
            <div
              key={beat.id}
              className="rounded-lg overflow-hidden transition-shadow cursor-pointer group"
              onClick={() => handleBeatClick(beat.id)}
            >
              <div className="relative w-full h-48 bg-gray-600 transform transition-transform duration-300 ease-in-out group-hover:scale-105">
                <img
                  src={`http://localhost:3001/${beat.image}`}
                  alt={beat.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the click event for the parent
                    handlePlayTrack(beat);
                  }}
                  className="absolute inset-0 flex justify-center items-center text-white bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                >
                  <FaPlay size={36} />
                </button>
              </div>

              <div className="p-2">
                <h3 className="text-lg font-semibold text-white truncate">{beat.title}</h3>
                <p className="text-sm text-gray-400">{beat.owner.username}</p>
                <p className="text-md text-blue-400 font-bold">${beat.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No beats found matching the selected filters.</p>
      )}
    </div>
  );
}

export default BeatList;
