/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCurrentId,
  setCurrentTrack,
  setCurrentTitle,
  setCurrentOwner,
  setCurrentCover,
  togglePlayPause
} from '../../../../store/audioPlayerSlice' // use togglePlayPause
import { setPlaylist, setCurrentIndex } from '../../../../store/playlistSlice'
import { useNavigate } from 'react-router-dom'
import { FaPlay, FaPause } from 'react-icons/fa' // Import FaPause for the pause button
import './BeatList.css'

function BeatList({ beats, filters }) {
  const [isImageLoaded, setImageLoaded] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Get the currently playing track and play state from Redux store
  const currentTrack = useSelector((state) => state.audioPlayer.currentTrack)
  const isPlaying = useSelector((state) => state.audioPlayer.isPlaying)

  const getLowestLicensePrice = (beat) => {
    if (!beat.licenses || !Array.isArray(beat.licenses) || beat.licenses.length === 0) {
      return 0;
    }
    const validPrices = beat.licenses
      .map(license => license.basePrice)
      .filter(price => price && !isNaN(parseFloat(price)))
      .map(price => parseFloat(price));
    return validPrices.length > 0 ? Math.min(...validPrices) : 0;
  };

  const filteredBeats = beats.filter((beat) => {
    const beatPrice = getLowestLicensePrice(beat);
    const matchesPrice = Array.isArray(filters.priceRange) 
      ? beatPrice >= filters.priceRange[0] && beatPrice <= filters.priceRange[1]
      : beatPrice >= (filters.price?.min || 0) && beatPrice <= (filters.price?.max || 300);
      
    const beatTagIds = beat.tags.map((tag) => tag.id)
    const matchesTag =
      (filters.tags && filters.tags.length > 0)
        ? filters.tags.every((tagId) => beatTagIds.includes(tagId))
        : (filters.tag && filters.tag.length > 0)
        ? filters.tag.every((tagId) => beatTagIds.includes(tagId))
        : true
        
    const bpmValue = parseInt(beat.bpm);
    const matchesBpm = filters.bpmRange 
      ? (filters.bpmRange === '60-90' && bpmValue >= 60 && bpmValue <= 90) ||
        (filters.bpmRange === '91-120' && bpmValue >= 91 && bpmValue <= 120) ||
        (filters.bpmRange === '121-150' && bpmValue >= 121 && bpmValue <= 150) ||
        (filters.bpmRange === '151+' && bpmValue >= 151)
      : filters.bpm 
      ? bpmValue >= filters.bpm.min && bpmValue <= filters.bpm.max
      : true;
      
    const matchesTone = filters.tone ? beat.tone === filters.tone : true
    const matchesUser = filters.producer
      ? beat.owner.username === filters.producer
      : filters.user
      ? beat.owner.username === filters.user
      : true

    return (
      matchesPrice && matchesTag && matchesBpm && matchesTone && matchesUser
    )
  })

  const handleBeatClick = (beatId) => {
    navigate(`/beats/${beatId}`)
  }

  const handlePlayTrack = (e, beat) => {
    e.stopPropagation()

    // Set the playlist with all filtered beats
    dispatch(setPlaylist(filteredBeats))

    // Find the index of the selected beat
    const trackIndex = filteredBeats.findIndex((b) => b.id === beat.id)
    dispatch(setCurrentIndex(trackIndex))

    // Set the current track details
    dispatch(
      setCurrentTrack(`${process.env.REACT_APP_BACKEND_URL}/${beat.audioURL}`)
    )
    dispatch(setCurrentTitle(beat.title))
    dispatch(setCurrentId(beat.id))
    dispatch(setCurrentOwner(beat.owner.username))
    dispatch(
      setCurrentCover(`${process.env.REACT_APP_BACKEND_URL}/${beat.image}`)
    )

    // Toggle play/pause
    dispatch(togglePlayPause())
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
        {filteredBeats.map((beat) => (
          <div
            key={beat.id}
            className="group relative w-full cursor-pointer overflow-hidden rounded-lg bg-gray-800/30 p-2 sm:p-3 transition-all duration-300 hover:bg-gray-800/50 hover:shadow-lg"
            onClick={() => handleBeatClick(beat.id)}
          >
            {/* Image Container */}
            <div className="relative">
              {!isImageLoaded && (
                <div className="absolute inset-0 animate-pulse rounded-lg bg-gray-700"></div>
              )}

              <div className="relative w-full overflow-hidden rounded-lg pt-[100%]">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/${beat.image}`}
                  alt={beat.title}
                  className={`absolute left-0 top-0 size-full object-cover transition-all duration-300 ${
                    isImageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />

                {/* Play/Pause Button */}
                <button
                  onClick={(e) => handlePlayTrack(e, beat)}
                  aria-label={
                    currentTrack === `${process.env.REACT_APP_BACKEND_URL}/${beat.audioURL}` && isPlaying
                      ? 'Pause preview'
                      : 'Play preview'
                  }
                  className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-transparent p-0 text-cyan-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-active:opacity-100 hover:scale-110 focus:scale-110 focus:outline-none"
                >
                  {currentTrack ===
                    `${process.env.REACT_APP_BACKEND_URL}/${beat.audioURL}` &&
                  isPlaying ? (
                    <FaPause size={28} />
                  ) : (
                    <FaPlay size={28} />
                  )}
                </button>

                {/* Beat Info Overlay */}
                <div className="absolute bottom-0 left-0 w-full translate-y-full bg-black/70 p-1 sm:p-2 text-white backdrop-blur-sm transition-transform duration-300 ease-out group-hover:translate-y-0 group-active:translate-y-0">
                  <p className="text-xs sm:text-sm font-medium">by {beat.owner.username}</p>
                  <h3 className="text-sm sm:text-lg font-bold">From ${getLowestLicensePrice(beat).toFixed(2)}</h3>
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="mt-2 sm:mt-3 px-1">
              <h3 className="truncate text-center text-sm sm:text-base font-semibold text-white">
                {beat.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      {filteredBeats.length === 0 && (
        <p className="mt-4 text-center text-lg text-white">No beats available.</p>
      )}
    </div>
  )
}

export default BeatList
