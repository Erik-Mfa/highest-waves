import React, { useState, useEffect } from 'react'
import BeatList from './BeatList/BeatList'
import FilterSidebar from './FilterSidebar/FilterSidebar'
import { getBeats } from '../../../services/api/beats'
import { getTags } from '../../../services/api/tags'
import './AvailableBeats.css'

function AvailableBeats() {
  const [beats, setBeats] = useState([])
  const [tags, setTags] = useState([])
  const [users, setUsers] = useState([])
  const [tones, setTones] = useState([])
  const [filters, setFilters] = useState({
    priceRange: [0, 300],
    bpmRange: '',
    tone: '',
    tags: [],
    producer: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [beatsData, tagsData] = await Promise.all([
          getBeats(),
          getTags()
        ])

        setBeats(beatsData)
        setTags(tagsData)

        // Extract unique tones from beats
        const uniqueTones = [...new Set(beatsData.map(beat => beat.tone).filter(Boolean))]
        setTones(uniqueTones)

        // Extract unique usernames from beats for producer filter
        const uniqueUsernames = [...new Set(beatsData.map(beat => beat.owner?.username).filter(Boolean))]
        setUsers(uniqueUsernames)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="available-beats-container">
      {/* Background layers */}
      <div className="background-layer"></div>
      <div className="animated-grid"></div>
      
      {/* Glow effects */}
      <div className="glow-effects">
        <div className="glow-effect glow-purple"></div>
        <div className="glow-effect glow-blue"></div>
        <div className="glow-effect glow-pink"></div>
      </div>

      {/* Main content */}
      <div className="content-container">
        <div className="glass-card">
          <h1 
            className="mb-8 text-center text-4xl font-bold md:text-5xl lg:text-6xl"
            style={{ color: 'var(--brand-contrast)' }}
          >
            Available Beats
          </h1>
          
          <div className="flex flex-col gap-4 lg:gap-6 lg:flex-row">
            {/* Filter Sidebar */}
            <div className="w-full lg:w-1/4">
              <FilterSidebar 
                filters={filters} 
                setFilters={setFilters} 
                tags={tags}
                users={users}
                tones={tones}
              />
            </div>
            
            {/* Beat List */}
            <div className="w-full lg:w-3/4">
              <BeatList beats={beats} filters={filters} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AvailableBeats
