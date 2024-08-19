import React, { useEffect, useState } from 'react';
import './FeaturedBeats.css';
import {getBeats} from '../../../services/beat'

function FeaturedBeats() {
  const [featuredBeats, setFeaturedBeats] = useState([]);

  useEffect(() => {
    const fetchFeaturedBeats = async () => {
      try {
        const response = await getBeats(); // Adjust the endpoint as needed
        const latestBeats = response.slice(0, 5); // Get the latest 5 beats
        setFeaturedBeats(latestBeats);
      } catch (error) {
        console.error('Error fetching featured beats:', error);
      }
    };

    fetchFeaturedBeats();
  }, []);

  if (featuredBeats.length === 0) return <div>Loading...</div>;

  return (
<div className="bg-black py-8 px-4">
  <h2 className="text-3xl font-bold text-center text-white mb-8" style={{ fontFamily: '"Be Vietnam Pro", sans-serif' }}>Featured Beats</h2>
  <div className="relative overflow-hidden marquee">
    <div className="flex marquee-content">
      {featuredBeats.concat(featuredBeats).map((beat, index) => (
        <div key={`${beat.id}-${index}`} className="inline-block mr-5">
          <div className="w-64 h-64 bg-gray-800  flex items-center justify-center rounded-lg">
          <img
              src={`http://localhost:3001/${beat.image}`}
              alt={beat.title}
              className="w-full h-full object-cover"
              style={{ aspectRatio: '5/5' }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
  );
}

export default FeaturedBeats;
