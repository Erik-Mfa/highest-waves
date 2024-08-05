import { useEffect, useState } from 'react';
import axios from '../../axios/axios'; // Adjust the import path as needed
import './BeatList.css'; // Make sure this file includes the font import

function BeatList() {
  const [beats, setBeats] = useState([]);
  const [tags, setTags] = useState([]);
  const [owners, setOwners] = useState([]);
  const [tones, setTones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    price: { min: 0, max: 1000 },
    createdAt: '',
    tag: [],
    bpm: '',
    tone: '',
    owner: ''
  });

  useEffect(() => {
    const fetchBeatsAndTags = async () => {
      try {
        const [beatsResponse, tagsResponse] = await Promise.all([
          axios.get('/beats'),
          axios.get('/tags') // Endpoint to fetch tags
        ]);
        setBeats(beatsResponse.data);
        setTags(tagsResponse.data);

        // Extract unique owners and tones from beats
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

    fetchBeatsAndTags();
  }, []);

  const filteredBeats = beats.filter((beat) => {
    const matchesPrice = beat.price >= filters.price.min && beat.price <= filters.price.max;
    const matchesCreatedAt = filters.createdAt ? new Date(beat.createdAt) >= new Date(filters.createdAt) : true;
    const matchesTag = filters.tag.length > 0 ? filters.tag.some(tag => beat.tags.includes(tag)) : true;
    const matchesBpm = filters.bpm ? beat.bpm === filters.bpm : true;
    const matchesTone = filters.tone ? beat.tone === filters.tone : true;
    const matchesOwner = filters.owner ? beat.owner.username === filters.owner : true;

    return matchesPrice && matchesCreatedAt && matchesTag && matchesBpm && matchesTone && matchesOwner;
  });

  if (loading) return <div>Loading...</div>;

  const handleSliderChange = (event) => {
    const value = Number(event.target.value);
    const maxValue = 1000;

    if (value < filters.price.max) {
      setFilters({ ...filters, price: { min: value, max: filters.price.max } });
    } else {
      setFilters({ ...filters, price: { min: filters.price.min, max: value } });
    }
  };

  const handleTagClick = (tag) => {
    setFilters(prevFilters => {
      const newTags = prevFilters.tag.includes(tag) ? 
        prevFilters.tag.filter(t => t !== tag) : 
        [...prevFilters.tag, tag];
      return { ...prevFilters, tag: newTags };
    });
  };

  return (
    <div className="beat-list-container flex font-be-vietnam">
      {/* Sidebar */}
      <div className="sidebar w-64 bg-gray-800 p-4 text-black">
        <h3 className="text-lg font-bold mb-4">Filters</h3>

        {/* Price Filter */}
        <div className="filter-group mb-4">
          <h4 className="font-semibold">Price Range</h4>
          <div className="price-slider">
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.price.min}
              onChange={handleSliderChange}
              className="slider-thumb"
              style={{ '--value': filters.price.min }}
            />
            <div className="price-values">
              <span>Min: ${filters.price.min}</span>
              <span>Max: ${filters.price.max}</span>
            </div>
          </div>
        </div>

        {/* Tags Filter */}
        <div className="filter-group mb-4">
          <h4 className="font-semibold">Tags</h4>
          <div className="tag-container flex flex-wrap gap-2">
            {tags.map(tag => (
              <div
                key={tag._id}
                className={`tag-box rounded-full px-4 py-2 cursor-pointer ${
                  filters.tag.includes(tag._id) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                }`}
                onClick={() => handleTagClick(tag._id)}
              >
                {tag.name}
              </div>
            ))}
          </div>
        </div>

        {/* BPM Filter */}
        <div className="filter-group mb-4">
          <label className="font-semibold" htmlFor="bpm">BPM Range</label>
          <select
            id="bpm"
            className="filter-input text-black"
            value={filters.bpm}
            onChange={(e) => setFilters({ ...filters, bpm: e.target.value })}
          >
            <option value="">Select BPM Range</option>
            {[...Array(20).keys()].map(i => (
              <option key={i} value={`${i * 10}-${(i + 1) * 10}`}>
                {i * 10} - {(i + 1) * 10}
              </option>
            ))}
          </select>
        </div>

        {/* Tone Filter */}
        <div className="filter-group mb-4">
          <label className="font-semibold" htmlFor="tone">Tone</label>
          <select
            id="tone"
            className="filter-input text-black"
            value={filters.tone}
            onChange={(e) => setFilters({ ...filters, tone: e.target.value })}
          >
            <option value="">Select Tone</option>
            {tones.map((tone, index) => (
              <option key={index} value={tone}>
                {tone}
              </option>
            ))}
          </select>
        </div>

        {/* Owner Filter */}
        <div className="filter-group mb-4">
          <label className="font-semibold" htmlFor="owner">Owner</label>
          <select
            id="owner"
            className="filter-input text-black"
            value={filters.owner}
            onChange={(e) => setFilters({ ...filters, owner: e.target.value })}
          >
            <option value="">Select Owner</option>
            {owners.map((owner, index) => (
              <option key={index} value={owner}>
                {owner}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Beat List */}
      <div className="beat-list flex-1 py-8 px-4">
        <h2 className="text-5xl font-bold text-center text-white mb-8">Available Beats</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredBeats.map((beat) => (
            <div key={beat._id} className="bg-transparent p-2 rounded-lg shadow-md flex flex-col items-center">
              <div className="w-40 h-40 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                <img src={beat.image} alt={beat.title} className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className='flex flex-col'>
                <h3 className="text-sm text-white font-semibold mb-1 text-center">{beat.title}</h3>
                <p className="text-xs text-gray-500 mb-1">Posted By: {beat.owner.username}</p>
                <p className="text-sm text-sky-800 font-bold">Price: ${beat.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BeatList;
