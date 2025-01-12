/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthenticated } from '../../../services/api/auth'
import { getBeatById } from '../../../services/api/beats'
import { addToCartAndUpdate } from '../../../store/cartSlice'
import { FaPlay, FaPause, FaShoppingCart } from 'react-icons/fa' // Import FaPause
import ChooseLicenseMessage from '../../Messages/ChooseLicenseMessage/ChooseLicenseMessage'
import {
  setCurrentId,
  setCurrentTrack,
  setCurrentTitle,
  setCurrentCover,
  togglePlayPause
} from '../../../store/audioPlayerSlice'

function BeatDetails() {
  const [beat, setBeat] = useState(null)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFadeIn, setIsFadeIn] = useState(false)
  const [purchase, setPurchase] = useState(false)
  const navigate = useNavigate()

  const { id: beatId } = useParams()
  const dispatch = useDispatch()

  const currentTrack = useSelector((state) => state.audioPlayer.currentTrack)
  const isPlaying = useSelector((state) => state.audioPlayer.isPlaying)

  useEffect(() => {
    const fetchBeatDetails = async () => {
      try {
        const userToken = await isAuthenticated()
        const beatData = await getBeatById(beatId)
        setBeat(beatData)
        setUser(userToken)
      } catch (error) {
        console.error('Error fetching beat details:', error)
      } finally {
        setIsLoading(false)
        setIsFadeIn(true)
      }
    }

    fetchBeatDetails()
  }, [beatId])

  const handleAddToCart = async () => {
    if (!user) {
      alert('You must be logged in to add items to your cart.')
      return
    }

    setPurchase(true)

    dispatch(addToCartAndUpdate({ beatId: beat.id, userId: user.userId }))
  }

  const handlePlayTrack = () => {
    if (
      currentTrack !== `${process.env.REACT_APP_BACKEND_URL}/${beat.audioURL}`
    ) {
      dispatch(
        setCurrentTrack(`${process.env.REACT_APP_BACKEND_URL}/${beat.audioURL}`)
      )
      dispatch(setCurrentTitle(beat.title))
      dispatch(setCurrentId(beat.id))
      dispatch(
        setCurrentCover(`${process.env.REACT_APP_BACKEND_URL}/${beat.image}`)
      )
      if (!isPlaying) {
        dispatch(togglePlayPause(true))
      }
    } else {
      dispatch(togglePlayPause()) // Toggle if it's the same track
    }
  }

  const cancelDelete = () => {
    setPurchase(false)
  }

  const confirmDelete = async () => {
    if (userToDelete) {
      await handleDeleteUser(userToDelete.id)
      setUserToDelete(null)
    }
  }

  // Handling loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="loader"></div>
        <p className="text-xl text-teal-400">Loading... Please wait.</p>
      </div>
    )
  }

  // Handling no beat found or error
  if (!beat && !isLoading) {
    // Optionally redirect to beat list after 5 seconds
    setTimeout(() => {
      navigate('/beats')
    }, 5000)

    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <img
          src="/assets/images/error-beat.png"
          alt="Beat not found"
          className="mb-6 size-64"
        />
        <p className="text-2xl font-bold text-red-500">
          Oops, we couldn't find this beat.
        </p>
        <a href="/beats" className="mt-4 text-teal-400 hover:text-teal-500">
          Explore more beats
        </a>
      </div>
    )
  }

  return (
<div
  className={`flex min-h-screen flex-col items-center justify-start bg-gradient-to-br from-sky-950 to-black p-20 pt-16 ${isFadeIn ? 'fade-in-active' : 'fade-in'}`}
>
  {purchase && (
    <ChooseLicenseMessage
      onConfirm={confirmDelete}
      onCancel={cancelDelete}
      id={beat.id}
    />
  )}
  {/* Beat Description */}
  <div className="mb-8 flex w-full max-w-5xl justify-center">
    <blockquote className="mt-4 max-w-3xl border-teal-500 text-center text-3xl font-bold italic text-teal-500 lg:text-center lg:text-4xl">
      &ldquo;{beat.description}&rdquo;
    </blockquote>
  </div>

  <div className="flex w-full items-start rounded-2xl border border-gray-700 bg-gray-800 p-10">
    {/* Left Side: Beat Image & Play Button */}
    <div className="flex w-1/3 items-start relative rounded-2xl mb-6 mr-10 lg:mb-0">
      {/* Image */}
      <div
        className="relative w-full cursor-pointer rounded-2xl bg-gradient-to-br from-teal-800 to-gray-800"
        onClick={handlePlayTrack}
      >
        {/* Play/Pause button with hover effect */}
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/${beat.image}`}
          alt={beat.title}
          className="w-full aspect-square rounded-2xl object-cover"
        />
        <div className="absolute inset-0 rounded-2xl flex items-center justify-center transition-all duration-[0.8s] ease-in-out">
          <div className="flex size-full items-center rounded-2xl justify-center bg-black bg-opacity-60 transition-all duration-[1.2s] ease-in-out hover:bg-opacity-0">
            {currentTrack ===
              `${process.env.REACT_APP_BACKEND_URL}/${beat.audioURL}` &&
            isPlaying ? (
              <FaPause
                size={64}
                className="text-teal-400 transition-all duration-[1.2s] ease-in-out hover:scale-125 hover:text-teal-500"
              />
            ) : (
              <FaPlay
                size={64}
                className="text-teal-400 transition-all duration-[1.2s] ease-in-out hover:scale-125 hover:text-teal-500"
              />
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Right Side: Beat Info */}
    <div className="flex w-2/3 flex-col space-y-6 p-6 text-center text-white lg:px-0 lg:text-left">
      <h2 className="text-2xl font-extrabold tracking-wide text-white lg:text-3xl">
        {beat.title}
      </h2>
      <p className="flex items-center justify-center space-x-2 text-lg text-gray-300 lg:justify-start">
        <span className="font-semibold text-teal-400">By:</span>
        <span>{beat.owner.username}</span>
      </p>
      <div className="flex items-center justify-between space-x-2 text-lg text-gray-300">
        <button
          onClick={handleAddToCart}
          className="flex items-center space-x-2 rounded-lg bg-teal-800 px-4 py-2 text-lg text-white transition-all duration-300 hover:scale-110 hover:bg-teal-700 hover:shadow-lg"
        >
          <FaShoppingCart /> <span>Add to Cart</span>
        </button>
        <span className="text-4xl font-bold text-cyan-300">
          ${beat.price}
        </span>
      </div>
      <div className="h-px w-full bg-gray-700"></div>
      <div className="flex justify-around text-gray-400 lg:justify-start lg:space-x-10">
        <div className="flex flex-col lg:items-start">
          <span
            className="shadow-tag rounded-lg bg-cyan-800 px-2 text-1xl text-white"
            style={{ fontFamily: '"Russo One"' }}
          >
            BPM {beat.bpm}
          </span>
        </div>
        <div className="flex flex-col lg:items-start">
          <span
            className="shadow-tag rounded-lg bg-cyan-800 px-2 text-1xl text-white"
            style={{ fontFamily: '"Russo One"' }}
          >
            TONE {beat.tone}
          </span>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default BeatDetails
