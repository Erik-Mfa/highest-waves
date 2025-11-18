/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCurrentId,
  setCurrentTrack,
  setCurrentTitle,
  setCurrentCover,
  togglePlayPause
} from '../../../store/audioPlayerSlice' // Added togglePlayPause
import { setPlaylist, setCurrentIndex } from '../../../store/playlistSlice'
import { getBeats } from '../../../services/api/beats'
import { FaPlay, FaPause } from 'react-icons/fa' // Added FaPause for pause functionality
import { API_BASE_URL } from '../../../config/api'
import './FeaturedBeats.css'

const BACKEND_BASE_URL = API_BASE_URL.replace('/api', '')
// Images are served via /api/assets, so use API_BASE_URL

function FeaturedBeats() {
  console.log('FeaturedBeats: Component mounted')
  const [featuredBeats, setFeaturedBeats] = useState([])
  const [isImageLoaded, setImageLoaded] = useState(false)
  const [beatsOpacity, setBeatsOpacity] = useState({})
  const sectionRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Get the currently playing track and play state from Redux store
  const currentTrack = useSelector((state) => state.audioPlayer.currentTrack)
  const isPlaying = useSelector((state) => state.audioPlayer.isPlaying)

  useEffect(() => {
    const fetchFeaturedBeats = async () => {
      try {
        console.log('FeaturedBeats: Fetching beats...')
        const response = await getBeats()
        console.log('FeaturedBeats: Received beats:', response)
        const latestBeats = response.slice(0, 6) // Reduced to 6 beats
        setFeaturedBeats(latestBeats)
      } catch (error) {
        console.error('Error fetching featured beats:', error)
        console.error('Error details:', error.response?.data, error.message)
      }
    }

    fetchFeaturedBeats()
  }, [])

  // Scroll-based opacity effect
  useEffect(() => {
    if (featuredBeats.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const beatId = entry.target.dataset.beatId
          if (beatId) {
            const ratio = entry.intersectionRatio
            // Calculate opacity based on intersection ratio
            // When fully visible (ratio = 1), opacity = 1
            // When not visible (ratio = 0), opacity = 0.3
            const opacity = Math.max(0.3, ratio)
            
            setBeatsOpacity(prev => ({
              ...prev,
              [beatId]: opacity
            }))
          }
        })
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100), // 0 to 1 in 0.01 steps
        rootMargin: '-10% 0px -10% 0px' // Start effect when element is 10% into viewport
      }
    )

    // Observe all beat cards
    const beatCards = document.querySelectorAll('[data-beat-id]')
    beatCards.forEach(card => observer.observe(card))

    return () => {
      beatCards.forEach(card => observer.unobserve(card))
    }
  }, [featuredBeats])

  const handleBeatClick = (beatId) => {
    navigate(`/beats/${beatId}`)
  }

  const handlePlayTrack = (e, beat) => {
    e.stopPropagation() // Prevent navigating to BeatDetail

    // Set the playlist with all featured beats
    dispatch(setPlaylist(featuredBeats))

    // Find the index of the selected beat
    const trackIndex = featuredBeats.findIndex((b) => b.id === beat.id)
    dispatch(setCurrentIndex(trackIndex))

    // Set the current track details
    dispatch(
      setCurrentTrack(`${API_BASE_URL}/${beat.audioURL}`)
    )
    dispatch(setCurrentTitle(beat.title))
    dispatch(setCurrentId(beat.id))
    dispatch(
      setCurrentCover(`${API_BASE_URL}/${beat.image}`)
    )

    // Toggle play/pause
    dispatch(togglePlayPause())
  }

  return (
    <div ref={sectionRef} className="relative py-4 sm:py-6 md:py-8 lg:py-10">
      <h2 className="page-title mb-4 sm:mb-6 md:mb-8">
        Featured Beats
      </h2>

      <div className="beats-grid pt-2 sm:pt-3 md:pt-4">
        {featuredBeats.map((beat) => (
          <div
            key={beat.id}
            data-beat-id={beat.id}
            className="group relative rounded-lg transition-all duration-500 hover:scale-105 hover:shadow-lg hover:z-50"
            style={{ 
              opacity: beatsOpacity[beat.id] || 0.3,
              transition: 'opacity 0.3s ease-out, transform 0.3s ease'
            }}
            onClick={() => handleBeatClick(beat.id)}
          >
            <div className="relative flex size-32 items-center justify-center rounded-lg overflow-hidden sm:size-36 md:size-40 lg:size-44 xl:size-48">
              {!isImageLoaded && (
                <div className="absolute inset-0 animate-pulse rounded-lg bg-gray-700"></div>
              )}

              <img
                src={`${API_BASE_URL}/${beat.image}`}
                alt={beat.title}
                className={`size-full rounded-lg object-cover ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ aspectRatio: '1 / 1' }}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  // Prevent infinite loop - only log once and set placeholder
                  if (!e.target.dataset.errorLogged) {
                    console.error('Error loading image:', beat.image)
                    e.target.dataset.errorLogged = 'true'
                    e.target.style.display = 'none'
                  }
                }}
              />

              <button
                onClick={(e) => handlePlayTrack(e, beat)}
                className="absolute inset-0 flex items-center justify-center rounded-lg p-2 text-cyan-400 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
              >
                {/* Conditionally render FaPlay or FaPause */}
                {currentTrack ===
                  `${API_BASE_URL}/${beat.audioURL}` &&
                isPlaying ? (
                  <FaPause size={32} />
                ) : (
                  <FaPlay size={32} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturedBeats
