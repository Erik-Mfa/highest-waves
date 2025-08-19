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
    <div className="page-content-wrapper">
      <div className="page-card relative overflow-hidden" style={{
        background: 'rgba(14, 41, 71, 0.3)',
        border: '1px solid rgba(56, 118, 174, 0.2)',
        backdropFilter: 'blur(20px)',
        borderRadius: 'var(--radius-lg)'
      }}>
        <h1 className="page-title">
          Available Beats
        </h1>
        
        <div className="page-two-column">
          {/* Filter Sidebar */}
          <div className="page-sidebar">
            <FilterSidebar 
              filters={filters} 
              setFilters={setFilters} 
              tags={tags}
              users={users}
              tones={tones}
            />
          </div>
          
          {/* Beat List */}
          <div className="page-main-content">
            <BeatList beats={beats} filters={filters} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AvailableBeats
