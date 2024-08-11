import React, { useEffect, useState } from 'react';
import BeatList from './BeatList/BeatList';
import FilterSidebar from './FilterSidebar/FilterSidebar';
import axios from '../../axios/axios'; // Adjust the import path as needed

function AvailableBeats() {
  const [beats, setBeats] = useState([]);
  const [tags, setTags] = useState([]);
  const [owners, setOwners] = useState([]);
  const [tones, setTones] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    price: { min: 0, max: 300 },
    createdAt: '',
    tag: [],
    bpm: { min: 0, max: 200 },
    tone: '',
    owner: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [beatsResponse, tagsResponse] = await Promise.all([
          axios.get('/beats'),
          axios.get('/tags')
        ]);
        setBeats(beatsResponse.data);
        setTags(tagsResponse.data);

        const uniqueOwners = [...new Set(beatsResponse.data.map(beat => beat.owner.username))];
        setOwners(uniqueOwners);

        const uniqueTones = [...new Set(beatsResponse.data.map(beat => beat.tone))];
        setTones(uniqueTones);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-white text-center">Loading...</div>;

  return (
    <div className="flex flex-row justify-center px-10">
      <main style={{ backgroundColor: '#102D40' }}>
        <div className="flex flex-col lg:flex-row">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            tags={tags}
            owners={owners}
            tones={tones}
          />
          <BeatList
            beats={beats}
            filters={filters}
          />
        </div>
      </main>
    </div>
  );
}

export default AvailableBeats;
