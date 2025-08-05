/* eslint-disable react/prop-types */
import React from 'react'
import Select from 'react-select'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

function FilterSidebar({ filters, setFilters, tags, users, tones }) {
  const handlePriceChange = (value) => {
    setFilters({
      ...filters,
      priceRange: [value[0], value[1]]
    })
  }

  const bpmOptions = [
    { label: '60-90', value: '60-90' },
    { label: '91-120', value: '91-120' },
    { label: '121-150', value: '121-150' },
    { label: '151+', value: '151+' }
  ]

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#102D40',
      borderColor: '#0FC2C0',
      borderRadius: '0.5rem',
      padding: '2px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#0FC2C0'
      }
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#102D40',
      borderRadius: '0.5rem',
      overflow: 'hidden'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#0FC2C0' : '#102D40',
      color: '#ffffff',
      padding: '8px 12px',
      '&:hover': {
        backgroundColor: state.isSelected ? '#0FC2C0' : '#0a1f2f'
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#ffffff'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#ffffff'
    })
  }

  return (
    <div className="rounded-lg bg-[#102D40]/90 p-4 shadow-lg backdrop-blur-sm sm:p-6">
      <div className="space-y-4">
        {/* Price Filter */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-white">
            Price Range
          </label>
          <div className="px-2">
            <Slider
              range
              value={filters.priceRange || [0, 300]}
              min={0}
              max={300}
              step={1}
              onChange={handlePriceChange}
              trackStyle={{ backgroundColor: '#0FC2C0', height: 4 }}
              railStyle={{ backgroundColor: '#073D3A', height: 4 }}
              handleStyle={{
                borderColor: '#0FC2C0',
                backgroundColor: '#0FC2C0',
                height: 16,
                width: 16,
                marginTop: -6,
                boxShadow: '0 0 0 2px #102D40'
              }}
            />
            <div className="mt-2 flex justify-between text-sm text-white">
              <span>${(filters.priceRange || [0, 300])[0]}</span>
              <span>${(filters.priceRange || [0, 300])[1]}</span>
            </div>
          </div>
        </div>

        {/* BPM Filter */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-white">
            BPM Range
          </label>
          <Select
            options={bpmOptions}
            value={
              filters.bpmRange ? { label: filters.bpmRange, value: filters.bpmRange } : null
            }
            onChange={(selectedOption) =>
              setFilters({
                ...filters,
                bpmRange: selectedOption ? selectedOption.value : ''
              })
            }
            styles={selectStyles}
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select..."
          />
        </div>

        {/* Tone Filter */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-white">
            Tone
          </label>
          <Select
            options={tones.map((tone) => ({ label: tone, value: tone }))}
            value={
              filters.tone ? { label: filters.tone, value: filters.tone } : null
            }
            onChange={(selectedOption) =>
              setFilters({
                ...filters,
                tone: selectedOption ? selectedOption.value : ''
              })
            }
            styles={selectStyles}
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select..."
          />
        </div>

        {/* Tags Filter */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-white">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                className={`rounded-full px-3 py-1.5 text-sm transition-all duration-200 ${
                  (filters.tags || []).includes(tag.id)
                    ? 'bg-cyan-500 text-white'
                    : 'border border-cyan-500 text-cyan-400 hover:bg-cyan-500/20'
                }`}
                onClick={() => {
                  const currentTags = filters.tags || [];
                  setFilters({
                    ...filters,
                    tags: currentTags.includes(tag.id)
                      ? currentTags.filter((id) => id !== tag.id)
                      : [...currentTags, tag.id]
                  })
                }}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        {/* Producer Filter */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-white">
            Producer
          </label>
          <Select
            options={users.map((username) => ({ label: username, value: username }))}
            value={
              filters.producer ? { label: filters.producer, value: filters.producer } : null
            }
            onChange={(selectedOption) =>
              setFilters({
                ...filters,
                producer: selectedOption ? selectedOption.value : ''
              })
            }
            styles={selectStyles}
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select..."
          />
        </div>

        {/* Reset Button */}
        <button
          className="mt-6 w-full rounded-lg border border-red-500 bg-transparent px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-red-500/20"
          onClick={() =>
            setFilters({
              priceRange: [0, 300],
              bpmRange: '',
              tone: '',
              tags: [],
              producer: ''
            })
          }
        >
          Reset Filters
        </button>
      </div>
    </div>
  )
}

export default FilterSidebar
