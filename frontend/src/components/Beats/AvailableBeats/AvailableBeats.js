import React, { useEffect, useState } from 'react';
import BeatList from './BeatList/BeatList';
import FilterSidebar from './FilterSidebar/FilterSidebar';
import axios from '../../../axios/axios'; 

function AvailableBeats() {
  const [beats, setBeats] = useState([]);
  const [tags, setTags] = useState([]);
  const [users, setUsers] = useState([]);
  const [tones, setTones] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    price: { min: 0, max: 300 },
    createdAt: '',
    tag: [],
    bpm: { min: 0, max: 200 },
    tone: '',
    user: ''
  });

  //FETCH BEATS AND TAGS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [beatsResponse, tagsResponse] = await Promise.all([
          axios.get('/beats'),
          axios.get('/tags')
        ]);
        setBeats(beatsResponse.data);
        setTags(tagsResponse.data);

        const uniqueUsers = [...new Set(beatsResponse.data.map(beat => beat.user))];
        setUsers(uniqueUsers);

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
    <div className="flex flex-row justify-center px-10 bg-black">
      <main className="">
        <div className="flex flex-col lg:flex-row">

          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            tags={tags}
            users={users}
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
