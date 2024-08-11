import React from 'react';
import ReactSlider from 'react-slider';

function FilterSidebar({ filters, setFilters, tags = [], owners = [], tones = [] }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const handleSliderChange = (values) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      price: { min: values[0], max: values[1] }
    }));
  };

  const handleBpmChange = (e) => {
    const [min, max] = e.target.value.split('-').map(Number);
    setFilters(prevFilters => ({
      ...prevFilters,
      bpm: { min, max }
    }));
  };

  const handleTagClick = (tag) => {
    setFilters(prevFilters => {
      const newTags = prevFilters.tag.includes(tag)
        ? prevFilters.tag.filter(t => t !== tag)
        : [...prevFilters.tag, tag];
      return { ...prevFilters, tag: newTags };
    });
  };

  return (
    <div>
      <button
        className="block md:hidden mb-4 bg-cyan-600 text-white py-2 px-4 rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? 'Hide Filters' : 'Show Filters'}
      </button>

      <div className={`sidebar ${isSidebarOpen ? 'block' : 'hidden'} md:block rounded-lg`}>
        <div className="filter-group">
          <h4 className="font-semibold text-white text-center mb-2 mt-2">Price</h4>
          {console.log(filters.price)}
          <ReactSlider
            className="horizontal-slider mb-4"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            min={0}
            max={300}
            value={[filters.price.min, filters.price.max]}
            onChange={handleSliderChange}
            renderThumb={(props) => <div {...props} />}
          />
          <div className="price-values text-white mb-8">
            <span>${filters.price.min}</span> <span>${filters.price.max}</span>
          </div>
        </div>

        <div className="filter-group mt-2">
          <h4 className="font-semibold text-white mb-2">Tags</h4>
          <div className="tag-container flex flex-wrap gap-2 mb-8">
            {tags.map(tag => (
              <div
                key={tag._id}
                className={`tag-box rounded-full px-3 py-1 text-sm cursor-pointer transition-all duration-300 ease-in-out ${
                  filters.tag.includes(tag._id) ? 'bg-cyan-600 text-white' : 'bg-gray-200 text-black'
                } hover:bg-cyan-500 hover:text-white hover:scale-105`}
                onClick={() => handleTagClick(tag._id)}
              >
                {tag.name}
              </div>
            ))}
          </div>
        </div>

        <div className="filter-group mt-4">
          <select
            id="bpm"
            className="filter-input text-black rounded-lg"
            value={`${filters.bpm.min}-${filters.bpm.max}`}
            onChange={handleBpmChange}
          >
            <option value="0-200">BPM</option>
            {[...Array(20).keys()].map(i => (
              <option key={i} value={`${i * 10}-${(i + 1) * 10}`}>
                {i * 10} - {(i + 1) * 10}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group mb-8 mt-2">
          <select
            id="tone"
            className="filter-input text-black rounded-lg"
            value={filters.tone}
            onChange={(e) => setFilters({ ...filters, tone: e.target.value })}
          >
            <option value="">Tone</option>
            {tones.map((tone, index) => (
              <option key={index} value={tone}>
                {tone}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group mb-6 mt-4">
          <select
            id="owner"
            className="filter-input text-black rounded-lg"
            value={filters.owner}
            onChange={(e) => setFilters({ ...filters, owner: e.target.value })}
          >
            <option value="">Owner</option>
            {owners.map((owner, index) => (
              <option key={index} value={owner}>
                {owner}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;
