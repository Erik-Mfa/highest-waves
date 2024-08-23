import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function FilterSidebar({ filters, setFilters, tags, users, tones }) {
  // Handle slider change
  const handlePriceChange = (value) => {
    setFilters({
      ...filters,
      price: { min: value[0], max: value[1] }
    });
  };

  // Define BPM options
  const bpmOptions = [
    { label: '1-20', value: { min: 1, max: 20 } },
    { label: '21-40', value: { min: 21, max: 40 } },
    { label: '41-60', value: { min: 41, max: 60 } },
    { label: '61-80', value: { min: 61, max: 80 } },
    { label: '81-100', value: { min: 81, max: 100 } },
    { label: '101-120', value: { min: 101, max: 120 } },
    { label: '121-140', value: { min: 121, max: 140 } },
    { label: '141-160', value: { min: 141, max: 160 } },
    { label: '161-180', value: { min: 161, max: 180 } },
    { label: '181-200', value: { min: 181, max: 200 } }
  ];

  return (
    <div className="p-6 rounded-lg shadow-md h-full" style={{ backgroundColor: '#102D40' }}>
      <div className="sticky top-20">
        <h2 className="text-2xl font-semibold text-white mb-4">Filters</h2>

        {/* Price Filter */}
        <div className="mb-6">
        <label className="block text-white mb-2">Price</label>
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <Slider
                range
                value={[filters.price.min, filters.price.max]}
                min={0}
                max={300}
                step={1}
                onChange={handlePriceChange}
                trackStyle={{ backgroundColor: '#0FC2C0' }}
                railStyle={{ backgroundColor: '#0FC2C0' }}
                handleStyle={{
                  borderColor: '#0FC2C0',
                  backgroundColor: '#0FC2C0',
                  height: 20,
                  width: 20
                }}
              />
              <div className="flex justify-between text-white mt-2">
                <span>${filters.price.min}</span>
                <span>${filters.price.max}</span>
              </div>
            </div>
          </div>
        </div>

        {/* BPM Filter */}
        <div className="mb-6">
          <label className="block text-white mb-2">BPM</label>
          <select
            className="w-full p-2 bg-gray-700 text-white rounded bg-transparent border border-cyan-500"
            value={`${filters.bpm.min}-${filters.bpm.max}`}
            onChange={(e) => {
              const selectedBpm = bpmOptions.find(option => option.label === e.target.value);
              setFilters({ ...filters, bpm: selectedBpm ? selectedBpm.value : { min: 1, max: 200 } });
            }}
          >
          <option value="">Select the BPM value</option>
          {bpmOptions.map((option) => (
            <option key={option.label} value={option.label}>
              {option.label}
            </option>
          ))}
          </select>
        </div>

                {/* Tone Filter */}
        <div className="mb-6">
          <label className="block text-white mb-2">Tone</label>
          <select
            className="w-full p-2 bg-gray-700 text-white rounded bg-transparent border border-cyan-500"
            value={filters.tone}
            onChange={(e) => setFilters({ ...filters, tone: e.target.value })}
          >
            <option value="">Select a tone</option>
            {tones.map((tone) => (
              <option key={tone} value={tone}>{tone}</option>
            ))}
          </select>
        </div>

        {/* Tags Filter */}
        <div className="mb-6">
          <label className="block text-white mb-2">Tags</label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                className={`px-3 py-1 rounded-full border border-cyan-500 ${
                  filters.tag.includes(tag.id)
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'border-gray-500 text-gray-300'
                }`}
                onClick={() => {
                  setFilters({
                    ...filters,
                    tag: filters.tag.includes(tag.id)
                      ? filters.tag.filter((id) => id !== tag.id)
                      : [...filters.tag, tag.id]
                  });
                }}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        {/* User Filter */}
        <div className="mb-8">
          <label className="block text-white mb-2">Producer</label>
          <select
            className="w-full p-2 bg-transparent border border-cyan-500 text-white rounded"
            value={filters.user}
            onChange={(e) => setFilters({ ...filters, user: e.target.value })}
          >
            <option value="">All Producers</option>
            {users.map((user) => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
        </div>

        {/* Reset Filters Button */}
        <button
          className="w-full py-2 bg-transparent border border-red-700 text-white rounded hover:bg-red-700 transition"
          onClick={() => setFilters({
            price: { min: 0, max: 300 },
            createdAt: '',
            tag: [],
            bpm: { min: 1, max: 200 },
            tone: '',
            user: ''
          })}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default FilterSidebar;
