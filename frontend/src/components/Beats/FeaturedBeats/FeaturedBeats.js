/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
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
import './FeaturedBeats.css'

function FeaturedBeats() {
  const [featuredBeats, setFeaturedBeats] = useState([])
  const [isImageLoaded, setImageLoaded] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Get the currently playing track and play state from Redux store
  const currentTrack = useSelector((state) => state.audioPlayer.currentTrack)
  const isPlaying = useSelector((state) => state.audioPlayer.isPlaying)

  useEffect(() => {
    const fetchFeaturedBeats = async () => {
      try {
        const response = await getBeats()
        const latestBeats = response.slice(0, 10) // Increased from 7 to 10 beats
        setFeaturedBeats(latestBeats)
      } catch (error) {
        console.error('Error fetching featured beats:', error)
      }
    }

    fetchFeaturedBeats()
  }, [])

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
      setCurrentTrack(`${process.env.REACT_APP_BACKEND_URL}/${beat.audioURL}`)
    )
    dispatch(setCurrentTitle(beat.title))
    dispatch(setCurrentId(beat.id))
    dispatch(
      setCurrentCover(`${process.env.REACT_APP_BACKEND_URL}/${beat.image}`)
    )

    // Toggle play/pause
    dispatch(togglePlayPause())
  }

  return (
    <div className="relative py-8 sm:py-12 md:py-16 lg:py-20">
      <h2 className="page-title mb-8 sm:mb-10 md:mb-12">
        Featured Beats
      </h2>

      <div className="marquee-container pt-4 sm:pt-6 md:pt-8">
        <div className="marquee-content">
          {featuredBeats.concat(featuredBeats).map((beat, index) => (
            <div
              key={`${beat.id}-${index}`}
              className="group relative mr-3 inline-block rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:z-50"
              onClick={() => handleBeatClick(beat.id)}
            >
              <div className="relative flex size-48 items-center justify-center rounded-lg overflow-hidden sm:size-56 md:size-60 lg:size-64 xl:size-72">
                {!isImageLoaded && (
                  <div className="absolute inset-0 animate-pulse rounded-lg bg-gray-700"></div>
                )}

                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/${beat.image}`}
                  alt={beat.title}
                  className={`size-full rounded-lg object-cover ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  style={{ aspectRatio: '1 / 1' }}
                  onLoad={() => setImageLoaded(true)}
                />

                <button
                  onClick={(e) => handlePlayTrack(e, beat)}
                  className="absolute inset-0 flex items-center justify-center rounded-lg p-2 text-cyan-400 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                >
                  {/* Conditionally render FaPlay or FaPause */}
                  {currentTrack ===
                    `${process.env.REACT_APP_BACKEND_URL}/${beat.audioURL}` &&
                  isPlaying ? (
                    <FaPause size={48} />
                  ) : (
                    <FaPlay size={48} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedBeats
