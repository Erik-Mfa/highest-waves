import React, { useEffect, useState } from 'react'
import BeatList from './BeatList/BeatList'
import FilterSidebar from './FilterSidebar/FilterSidebar'
import './AvailableBeats.css'
import { getBeats } from '../../../services/api/beats'
import { getTags } from '../../../services/api/tags'
import { FaBars } from 'react-icons/fa'

function AvailableBeats() {
  const [beats, setBeats] = useState([])
  const [tags, setTags] = useState([])
  const [users, setUsers] = useState([])
  const [tones, setTones] = useState([])
  const [showFilters, setShowFilters] = useState(false)

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
    <div className="min-h-screen border-b-2 border-gray-700 bg-gradient-to-br from-black/50 to-transparent px-4 py-8 sm:px-6 md:px-8 lg:px-12">
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
          <div className="w-full lg:w-3/4">
            {/* Mobile Hamburger Button */}
            <div className="mb-6 flex items-center justify-between lg:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center rounded-lg bg-gray-800 px-4 py-2 text-xl text-white focus:outline-none"
              >
                <FaBars
                  className={`mr-2 transition-transform duration-300 ${
                    showFilters ? 'rotate-90' : 'rotate-0'
                  }`}
                />
                <span>Filters</span>
              </button>
            </div>

            {/* Mobile Filter Sidebar */}
            {showFilters && (
              <div className="mb-6 rounded-lg bg-gray-800/50 p-4 backdrop-blur-sm lg:hidden">
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
            <h2 className="mb-6 text-2xl font-bold text-white sm:text-3xl">
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
