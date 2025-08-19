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
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#0B1420',
      border: '2px solid #3876AE !important',
      borderColor: '#3876AE !important',
      borderRadius: '0.5rem',
      padding: '2px',
      boxShadow: '0 0 8px rgba(56, 118, 174, 0.3)',
      minHeight: '38px',
      '&:hover': {
        border: '2px solid #3876AE !important',
        borderColor: '#3876AE !important',
        boxShadow: '0 0 12px rgba(56, 118, 174, 0.5)'
      },
      '&:focus-within': {
        border: '2px solid #3876AE !important',
        borderColor: '#3876AE !important',
        boxShadow: '0 0 12px rgba(56, 118, 174, 0.5)'
      }
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#0B1420',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      border: '2px solid #3876AE',
      boxShadow: '0 0 8px rgba(56, 118, 174, 0.3)'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3876AE' : '#0B1420',
      color: '#FFFFFF',
      padding: '8px 12px',
      '&:hover': {
        backgroundColor: state.isSelected ? '#3876AE' : '#124D82'
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#FFFFFF'
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#6C757D'
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: '#3876AE'
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#3876AE',
      '&:hover': {
        color: '#3876AE'
      }
    })
  }

  return (
    <div className="rounded-lg bg-[#0B1420]/90 p-4 shadow-lg backdrop-blur-sm sm:p-6 border border-[#3876AE]" style={{ boxShadow: '0 0 15px rgba(56, 118, 174, 0.4)' }}>
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
              trackStyle={{ backgroundColor: '#3876AE', height: 4 }}
              railStyle={{ backgroundColor: '#124D82', height: 4 }}
              handleStyle={{
                borderColor: '#3876AE',
                backgroundColor: '#3876AE',
                height: 16,
                width: 16,
                marginTop: -6,
                boxShadow: '0 0 8px rgba(56, 118, 174, 0.6)'
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
                    ? 'bg-[#3876AE] text-white'
                    : 'border border-[#3876AE] text-[#3876AE] hover:bg-[#3876AE]/20'
                }`}
                style={{
                  boxShadow: (filters.tags || []).includes(tag.id) 
                    ? '0 0 8px rgba(56, 118, 174, 0.6)' 
                    : '0 0 4px rgba(56, 118, 174, 0.3)'
                }}
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
          style={{ boxShadow: '0 0 8px rgba(220, 38, 38, 0.3)' }}
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
