import React from 'react';
import Select from 'react-select';
import Slider from 'rc-slider'; // Import Slider
import 'rc-slider/assets/index.css'; // Import default Slider styles

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
    <div className="p-10 rounded-lg shadow-md h-full" style={{ backgroundColor: '#102D40' }}>
      <div className="sticky top-20">
        
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
        trackStyle={{ backgroundColor: '#0FC2C0', height: 6 }}
        railStyle={{ backgroundColor: '#073D3A', height: 6 }}
        handleStyle={{
          borderColor: '#0FC2C0',  // Make handles more visible with a distinct color
          backgroundColor: '#0FC2C0',  // Distinct handle color
          height: 22,
          width: 22,
          opacity: 1,
          top: 2,
          zIndex: 2, // Ensure handles are on top of the bar
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
          <Select
            options={bpmOptions}
            value={bpmOptions.find(option => 
              `${option.value.min}-${option.value.max}` === `${filters.bpm.min}-${filters.bpm.max}`
            )}
            onChange={(selectedOption) => {
              setFilters({ ...filters, bpm: selectedOption ? selectedOption.value : { min: 1, max: 200 } });
            }}
            className="basic-single"
            classNamePrefix="select"
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: '#102D40',
                borderColor: '#0FC2C0',
                borderRadius: '0.375rem',
                padding: '10px',
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: '#102D40',
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? '#0FC2C0' : '#102D40',
                color: '#ffffff',
                padding: '10px',
              }),
              singleValue: (provided) => ({
                ...provided,
                color: '#ffffff',
              }),
              placeholder: (provided) => ({
                ...provided,
                color: '#ffffff',
              }),
            }}
          />
        </div>

        {/* Tone Filter */}
        <div className="mb-6">
          <label className="block text-white mb-2">Tone</label>
          <Select
            options={tones.map(tone => ({ label: tone, value: tone }))}
            value={filters.tone ? { label: filters.tone, value: filters.tone } : null}
            onChange={(selectedOption) => setFilters({ ...filters, tone: selectedOption ? selectedOption.value : '' })}
            className="basic-single"
            classNamePrefix="select"
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: '#102D40',
                borderColor: '#0FC2C0',
                borderRadius: '0.375rem',
                padding: '10px',
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: '#102D40',
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? '#0FC2C0' : '#102D40',
                color: '#ffffff',
                padding: '10px',
              }),
              singleValue: (provided) => ({
                ...provided,
                color: '#ffffff',
              }),
              placeholder: (provided) => ({
                ...provided,
                color: '#ffffff',
              }),
            }}
          />
        </div>

        {/* Tags Filter */}
        <div className="mb-6">
          <label className="block text-white mb-2 font-semibold">Tags</label>
          <div className="flex flex-wrap ">
            {tags.map((tag) => (
              <button
                key={tag.id}
                className={`px-3 py-1 m-1 rounded-full border border-cyan-500 transition-transform transform duration-300 ease-in-out ${
                  filters.tag.includes(tag.id)
                    ? 'bg-cyan-500 text-white hover:scale-105'
                    : 'border-cyan-500 text-gray-300 hover:scale-105'
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
          <Select
            options={users.map(user => ({ label: user, value: user }))}
            value={filters.user ? { label: filters.user, value: filters.user } : null}
            onChange={(selectedOption) => setFilters({ ...filters, user: selectedOption ? selectedOption.value : '' })}
            className="basic-single"
            classNamePrefix="select"
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: '#102D40',
                borderColor: '#0FC2C0',
                borderRadius: '0.375rem',
                padding: '10px',
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: '#102D40',
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? '#0FC2C0' : '#102D40',
                color: '#ffffff',
                padding: '10px',
              }),
              singleValue: (provided) => ({
                ...provided,
                color: '#ffffff',
              }),
              placeholder: (provided) => ({
                ...provided,
                color: '#ffffff',
              }),
            }}
          />
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
