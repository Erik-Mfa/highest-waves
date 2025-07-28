/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthenticated } from '../../../services/api/auth'
import { getBeatById } from '../../../services/api/beats'
import { addToCartAndUpdate } from '../../../store/cartSlice'
import { FaPlay, FaPause, FaShoppingCart, FaCrown, FaStar, FaGem, FaMedal } from 'react-icons/fa'
import ChooseLicenseMessage from '../../Messages/ChooseLicenseMessage/ChooseLicenseMessage'
import CannotPurchaseMessage from '../../Messages/CannotPurchaseMessage/CannotPurchaseMessage'

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
  const [selectedLicense, setSelectedLicense] = useState(null)
  const [cheapestPrice, setCheapestPrice] = useState(null)
  const navigate = useNavigate()

  const { id: beatId } = useParams()
  const dispatch = useDispatch()

  const currentTrack = useSelector((state) => state.audioPlayer.currentTrack)
  const isPlaying = useSelector((state) => state.audioPlayer.isPlaying)

  useEffect(() => {
    const fetchBeatDetails = async () => {
      try {
        const userToken = await isAuthenticated()
        console.log('User token from isAuthenticated:', userToken)
        const beatData = await getBeatById(beatId)
        setBeat(beatData)
        
        // Find the cheapest license price
        if (beatData.licenses && Array.isArray(beatData.licenses) && beatData.licenses.length > 0) {
          const validPrices = beatData.licenses
            .map(license => license.basePrice)
            .filter(price => price && !isNaN(parseFloat(price)))
            .map(price => parseFloat(price));
            
          if (validPrices.length > 0) {
            const lowestPrice = Math.min(...validPrices);
            setCheapestPrice(lowestPrice);
          }
        }
        
        if (userToken && userToken.userId) {
          setUser(userToken)
        } else {
          console.error('No valid user data found in token')
          setUser(null)
        }
      } catch (error) {
        console.error('Error fetching beat details:', error)
        setUser(null)
      } finally {
        setIsLoading(false)
        setIsFadeIn(true)
      }
    }

    fetchBeatDetails()
  }, [beatId])

  const handleAddToCart = async (license = null) => {
    if (license) {
      setSelectedLicense(license)
    }
    setPurchase(true)
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
      dispatch(togglePlayPause())
    }
  }

  const cancelDelete = () => {
    setPurchase(false)
  }

  const confirmPurchase = (selectedLicense) => {
    if (selectedLicense && user && user.userId) {
      console.log('User data in confirmPurchase:', user)
      console.log('Selected license:', selectedLicense)
      
      // Calculate final price from the license basePrice
      const finalPrice = parseFloat(selectedLicense.basePrice);
      
      if (isNaN(finalPrice)) {
        console.error('Invalid price:', selectedLicense.basePrice);
        return;
      }

      dispatch(addToCartAndUpdate({ 
        beat: beat._id,
        user: parseInt(user.userId),
        license: parseInt(selectedLicense.id),
        finalPrice: finalPrice
      }))
      setPurchase(false)
    } else {
      console.error('Missing required data:', { user, selectedLicense })
      setPurchase(false)
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
  user ? (
    <ChooseLicenseMessage
      onConfirm={confirmPurchase}
      onCancel={cancelDelete}
      id={beat.id}
    />
  ) : (
    <CannotPurchaseMessage
      onCancel={cancelDelete}
    />
  )
)}

  <div className="flex w-full items-start rounded-2xl border border-gray-700 bg-gray-800 p-10">
    {/* Left Side: Beat Image & Play Button */}
    <div className="flex w-1/3 items-start mr-10">
      {/* Image */}
      <div
        className="relative w-full cursor-pointer rounded-2xl bg-gradient-to-br from-teal-800 to-gray-800 sticky top-4"
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
    <div className="flex w-2/3 flex-col space-y-6 text-white">
      <div className="space-y-4">
        <h2 className="text-3xl font-extrabold tracking-wide text-white">
        {beat.title}
      </h2>
        <p className="flex items-center space-x-2 text-lg text-gray-300">
        <span className="font-semibold text-teal-400">By:</span>
        <span>{beat.owner.username}</span>
      </p>

        {/* BPM and TONE - moved up here for better visibility */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">BPM:</span>
            <span className="bg-teal-600/20 border border-teal-400/30 rounded-lg px-3 py-1 text-lg font-bold text-teal-400">
              {beat.bpm}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">TONE:</span>
            <span className="bg-teal-600/20 border border-teal-400/30 rounded-lg px-3 py-1 text-lg font-bold text-teal-400">
              {beat.tone}
            </span>
          </div>
        </div>
      </div>

      {/* License Icons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {beat.licenses && beat.licenses.map((license) => {
          const licenseStyles = {
            gold: {
              icon: <FaMedal className="text-2xl text-yellow-400" />,
              bg: "bg-yellow-600/20",
              text: "text-yellow-400",
              border: "border-yellow-400/30",
              gradient: "from-yellow-600/10 to-yellow-800/10"
            },
            platinum: {
              icon: <FaStar className="text-2xl text-slate-400" />,
              bg: "bg-slate-600/20",
              text: "text-slate-400",
              border: "border-slate-400/30",
              gradient: "from-slate-600/10 to-slate-800/10"
            },
            diamond: {
              icon: <FaGem className="text-2xl text-teal-400" />,
              bg: "bg-teal-600/20",
              text: "text-teal-400",
              border: "border-teal-400/30",
              gradient: "from-teal-600/10 to-teal-800/10"
            },
            exclusive: {
              icon: <FaCrown className="text-2xl text-purple-400" />,
              bg: "bg-purple-600/20",
              text: "text-purple-400",
              border: "border-purple-400/30",
              gradient: "from-purple-600/10 to-purple-800/10"
            }
          };

          const style = licenseStyles[license.icon] || licenseStyles.gold;
          
          const formatStreamLimit = (limit) => {
            if (limit === -1) return 'Unlimited';
            return limit.toLocaleString();
          };

          const formatVideoLimit = (limit) => {
            if (limit === -1) return 'Unlimited';
            return limit;
          };

        })}
      </div>

      {/* Call-to-Action Section */}
      <div className="mt-8 rounded-2xl bg-gradient-to-r from-teal-900/30 to-cyan-900/30 border border-teal-400/20 p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-3">
            <h3 className="text-xl font-bold text-white">Ready to get this beat?</h3>
            <p className="text-gray-300">Choose a license above and add to your cart</p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">Starting from</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                {cheapestPrice ? `$${cheapestPrice.toFixed(2)}` : 'Price not available'}
              </span>
            </div>
          </div>
          
        <button
          onClick={() => handleAddToCart(selectedLicense)}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 p-1 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/25"
        >
            <div className="flex items-center space-x-3 rounded-xl bg-gray-900 px-8 py-4 transition-all duration-300 group-hover:bg-transparent">
              <FaShoppingCart className="text-xl text-teal-400 group-hover:text-white transition-colors duration-300" />
              <span className="text-lg font-semibold text-teal-400 group-hover:text-white transition-colors duration-300">
                Add to Cart
          </span>
        </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default BeatDetails
