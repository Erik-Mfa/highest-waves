// AvailableBeats.js

import React, { useEffect, useState } from 'react';
import BeatList from './BeatList/BeatList';
import FilterSidebar from './FilterSidebar/FilterSidebar';
import { getBeats } from '../../../services/endpoints/beats';
import { getTags } from '../../../services/endpoints/tags';
import { FaBars } from 'react-icons/fa'; // Import the hamburger icon

function AvailableBeats() {
  const [beats, setBeats] = useState([]);
  const [tags, setTags] = useState([]);
  const [users, setUsers] = useState([]);
  const [tones, setTones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false); // State to handle mobile sidebar visibility

  console.log(users)

  const [filters, setFilters] = useState({
    price: { min: 0, max: 300 },
    createdAt: '',
    tag: [],
    bpm: { min: 0, max: 200 },
    tone: '',
    user: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [beatsResponse, tagsResponse] = await Promise.all([
          getBeats(), 
          getTags()   
        ]);

        setBeats(beatsResponse);
        setTags(tagsResponse);

        const uniqueUsers = [...new Set(beatsResponse.map(beat => beat.owner.username))];
        setUsers(uniqueUsers);

        const uniqueTones = [...new Set(beatsResponse.map(beat => beat.tone))];
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
    <div className="bg-black min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:flex lg:space-x-8">



          {/* Sidebar for larger screens */}
          <div className="hidden lg:block lg:w-1/4">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              tags={tags}
              users={users}
              tones={tones}
            />
          </div>

          {/* Beat List */}
          <div className="lg:w-3/4">
            {/* Mobile Hamburger Button */}
            
            <div className="lg:hidden mb-4 flex justify-between items-center">
              <button 
                onClick={() => setShowFilters(!showFilters)} 
                className="text-white text-3xl focus:outline-none"
              >
                Filters
                <FaBars />
              </button>

              <h2 className="text-3xl font-bold text-white">Available Beats</h2>
            </div>

            {showFilters && ( // Show the filter sidebar when the state is true
              <div className="lg:hidden mb-8">
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  tags={tags}
                  users={users}
                  tones={tones}
                />
              </div>
            )}

            <BeatList
              beats={beats}
              filters={filters}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default AvailableBeats;
