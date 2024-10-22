import React, { useEffect, useState } from 'react'
import BeatList from './BeatList/BeatList'
import FilterSidebar from './FilterSidebar/FilterSidebar'
import './AvailableBeats.css'
import { getBeats } from '../../../services/api/beats'
import { getTags } from '../../../services/api/tags'
import { FaBars } from 'react-icons/fa' // Import the hamburger icon

function AvailableBeats() {
  const [beats, setBeats] = useState([])
  const [tags, setTags] = useState([])
  const [users, setUsers] = useState([])
  const [tones, setTones] = useState([])
  const [showFilters, setShowFilters] = useState(false) // State to handle mobile sidebar visibility

  const [filters, setFilters] = useState({
    price: { min: 0, max: 300 },
    createdAt: '',
    tag: [],
    bpm: { min: 0, max: 200 },
    tone: '',
    user: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [beatsResponse, tagsResponse] = await Promise.all([
          getBeats(),
          getTags()
        ])

        setBeats(beatsResponse)
        setTags(tagsResponse)

        const uniqueUsers = [
          ...new Set(beatsResponse.map((beat) => beat.owner.username))
        ]

        setUsers(uniqueUsers)

        const uniqueTones = [...new Set(beatsResponse.map((beat) => beat.tone))]
        setTones(uniqueTones)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen border-b-2 border-gray-700 bg-gradient-to-br from-black/50 to-transparent p-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
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

          {/* Main content */}
          <div className="lg:w-3/4">
            {/* Mobile Hamburger Button */}
            <div className="mb-10 flex items-center justify-between lg:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center text-3xl text-white focus:outline-none"
              >
                <FaBars
                  className={`transition-transform duration-300 ${showFilters ? 'rotate-90' : 'rotate-0'}`}
                />
                <span className="ml-2">Filters</span>{' '}
                {/* Added margin-left for spacing */}
              </button>
            </div>

            {/* Mobile Filter Sidebar */}
            {showFilters && (
              <div className="mb-8 lg:hidden">
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  tags={tags}
                  users={users}
                  tones={tones}
                />
              </div>
            )}

            {/* Available Beats - Large Screens and Mobile */}
            <h2 className="mb-6 text-3xl font-bold text-white">
              Available Beats
            </h2>
            <BeatList beats={beats} filters={filters} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AvailableBeats
