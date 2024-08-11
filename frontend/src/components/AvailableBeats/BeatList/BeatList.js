import React from 'react';
import { useNavigate } from 'react-router-dom';

function BeatList({ beats, filters }) {
  const navigate = useNavigate();

  const filteredBeats = beats.filter((beat) => {
    // Price range filter
    const matchesPrice = beat.price >= filters.price.min && beat.price <= filters.price.max;
    // Tag filter
    const beatTagIds = beat.tags.map(tag => tag._id);
    const matchesTag = filters.tag.length > 0 ? filters.tag.every(tagId => beatTagIds.includes(tagId)) : true;
    // BPM Filter
    const matchesBpm = filters.bpm.min !== undefined && filters.bpm.max !== undefined
      ? beat.bpm >= filters.bpm.min && beat.bpm <= filters.bpm.max
      : true;
    // Tone Filter
    const matchesTone = filters.tone ? beat.tone === filters.tone : true;
    // Owner filter
    const matchesOwner = filters.owner ? beat.owner.username === filters.owner : true;

    return matchesPrice && matchesTag && matchesBpm && matchesTone && matchesOwner;
  });

  const handleBeatClick = (beatId) => {
    navigate(`/beats/${beatId}`);
  };

  return (
    <div className="beat-list-container bg-gray-900 p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row">
      <div className="beat-list flex-1 p-4 sm:p-6 lg:p-8 lg:pt-0 rounded-lg">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-white mb-6 sm:mb-8">Beats</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredBeats.map((beat) => (
            <div 
              key={beat._id} 
              className="w-[200px] h-[300px] mx-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => handleBeatClick(beat._id)}
            >
              <div className="w-full h-[70%] bg-gray-600 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                <img src={beat.image} alt={beat.title} className="w-full h-full object-cover" />
              </div>
              <div className='text-center'>
                <h3 className="text-sm md:text-base text-white font-semibold mb-1">{beat.title}</h3>
                <p className="text-sm text-gray-300 mb-1">{beat.owner.username}</p>
                <p className="text-sm text-sky-400 font-bold">${beat.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BeatList;
