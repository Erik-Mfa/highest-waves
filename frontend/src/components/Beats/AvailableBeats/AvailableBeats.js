import React, { useEffect, useState } from 'react'
import BeatList from './BeatList/BeatList'
import FilterSidebar from './FilterSidebar/FilterSidebar'
import './AvailableBeats.css'
import { getBeats } from '../../../services/api/beats'
import { getTags } from '../../../services/api/tags'
import { FaBars, FaTimes } from 'react-icons/fa'

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
    <div className="min-h-screen  bg-gradient-to-br from-black/50 to-transparent px-4 py-8 sm:px-6 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="lg:flex lg:space-x-8">
          {/* Desktop Filter Sidebar - Sticky */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="sticky top-24">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                tags={tags}
                users={users}
                tones={tones}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="w-full lg:w-3/4">
            {/* Mobile Filter Button */}
            <div className="mb-6 flex items-center justify-between lg:hidden">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Available Beats
              </h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center rounded-lg bg-white/10 px-4 py-2 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              >
                {showFilters ? (
                  <>
                    <FaTimes className="mr-2" />
                    <span>Close</span>
                  </>
                ) : (
                  <>
                    <FaBars className="mr-2" />
                    <span>Filters</span>
                  </>
                )}
              </button>
            </div>

            {/* Mobile Filter Sidebar - Fixed when open */}
            {showFilters && (
              <div className="fixed inset-0 z-50 bg-black/80 lg:hidden">
                <div className="h-full overflow-y-auto p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Filters</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                    >
                      <FaTimes size={20} />
                    </button>
                  </div>
                  <FilterSidebar
                    filters={filters}
                    setFilters={setFilters}
                    tags={tags}
                    users={users}
                    tones={tones}
                  />
                </div>
              </div>
            )}

            {/* Desktop Title */}
            <h2 className="mb-6 hidden text-2xl font-bold text-white lg:block sm:text-3xl">
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
