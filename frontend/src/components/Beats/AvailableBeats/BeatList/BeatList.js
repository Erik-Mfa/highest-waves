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

  const filteredBeats = beats.filter((beat) => {
    const matchesPrice =
      beat.price >= filters.price.min && beat.price <= filters.price.max
    const beatTagIds = beat.tags.map((tag) => tag.id)
    const matchesTag =
      filters.tag.length > 0
        ? filters.tag.every((tagId) => beatTagIds.includes(tagId))
        : true
    const matchesBpm =
      beat.bpm >= filters.bpm.min && beat.bpm <= filters.bpm.max
    const matchesTone = filters.tone ? beat.tone === filters.tone : true
    const matchesUser = filters.user
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
      {filteredBeats.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBeats.map((beat) => (
            <div
              key={beat.id}
              className="group relative w-full cursor-pointer overflow-hidden rounded-lg transition-transform hover:scale-105"
              onClick={() => handleBeatClick(beat.id)}
            >
              {/* Image Container */}
              <div className="relative">
                {!isImageLoaded && (
                  <div className="absolute inset-0 animate-pulse rounded-md bg-gray-700"></div>
                )}

                <div className="relative w-full overflow-hidden rounded-lg pt-[100%]">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/${beat.image}`}
                    alt={beat.title}
                    className={`absolute left-0 top-0 size-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-60 ${
                      isImageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />

                  {/* Play/Pause Button */}
                  <button
                    onClick={(e) => handlePlayTrack(e, beat)}
                    className="absolute left-1/2 top-1/2 z-10 mt-2 -translate-x-1/2 -translate-y-1/2 rounded-full p-1.5 text-cyan-400 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
                  >
                    {/* Conditionally render FaPlay or FaPause */}
                    {currentTrack ===
                      `${process.env.REACT_APP_BACKEND_URL}/${beat.audioURL}` &&
                    isPlaying ? (
                      <FaPause size={35} />
                    ) : (
                      <FaPlay size={35} />
                    )}
                  </button>

                  {/* Black Overlay */}
                  <div className="absolute bottom-0 left-0 w-full translate-y-full bg-black bg-opacity-60 p-2 text-white transition-transform duration-500 ease-out group-hover:translate-y-0">
                    <p className="text-sm">by {beat.owner.username}</p>
                    <h3 className="">{beat.price}$</h3>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="mt-2 px-2 text-center">
                <h3 className="text-md truncate font-semibold text-white">
                  {beat.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">No beats available.</p>
      )}
    </div>
  )
}

export default BeatList
