/* eslint-disable react/prop-types */
import React from 'react'
import Select from 'react-select'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

function FilterSidebar({ filters, setFilters, tags, users, tones }) {
  const handlePriceChange = (value) => {
    setFilters({
      ...filters,
      price: { min: value[0], max: value[1] }
    })
  }

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
              value={[filters.price.min, filters.price.max]}
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
              <span>${filters.price.min}</span>
              <span>${filters.price.max}</span>
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
            value={bpmOptions.find(
              (option) =>
                `${option.value.min}-${option.value.max}` ===
                `${filters.bpm.min}-${filters.bpm.max}`
            )}
            onChange={(selectedOption) =>
              setFilters({
                ...filters,
                bpm: selectedOption
                  ? selectedOption.value
                  : { min: 1, max: 200 }
              })
            }
            styles={selectStyles}
            className="basic-single"
            classNamePrefix="select"
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
                  filters.tag.includes(tag.id)
                    ? 'bg-cyan-500 text-white'
                    : 'border border-cyan-500 text-cyan-400 hover:bg-cyan-500/20'
                }`}
                onClick={() => {
                  setFilters({
                    ...filters,
                    tag: filters.tag.includes(tag.id)
                      ? filters.tag.filter((id) => id !== tag.id)
                      : [...filters.tag, tag.id]
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
            options={users.map((user) => ({ label: user, value: user }))}
            value={
              filters.user ? { label: filters.user, value: filters.user } : null
            }
            onChange={(selectedOption) =>
              setFilters({
                ...filters,
                user: selectedOption ? selectedOption.value : ''
              })
            }
            styles={selectStyles}
            className="basic-single"
            classNamePrefix="select"
          />
        </div>

        {/* Reset Button */}
        <button
          className="mt-6 w-full rounded-lg border border-red-500 bg-transparent px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-red-500/20"
          onClick={() =>
            setFilters({
              price: { min: 0, max: 300 },
              createdAt: '',
              tag: [],
              bpm: { min: 1, max: 200 },
              tone: '',
              user: ''
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
