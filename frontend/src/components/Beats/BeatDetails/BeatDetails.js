/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthenticated } from '../../../services/api/auth'
import { getBeatById } from '../../../services/api/beats'
import { addToCartAndUpdate } from '../../../store/cartSlice'
import { FaPlay, FaPause, FaShoppingCart, FaCrown, FaStar, FaGem } from 'react-icons/fa'
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

      {/* License Icons */}
      <div className="flex items-center justify-start space-x-4">
        {beat.licenses && beat.licenses.map((license) => {
          const licenseStyles = {
            gold: {
              icon: <FaCrown className="text-2xl text-yellow-400" />,
              bg: "bg-yellow-600/20",
              text: "text-yellow-400",
              border: "border-yellow-400/30"
            },
            platinum: {
              icon: <FaStar className="text-2xl text-purple-400" />,
              bg: "bg-purple-600/20",
              text: "text-purple-400",
              border: "border-purple-400/30"
            },
            diamond: {
              icon: <FaGem className="text-2xl text-teal-400" />,
              bg: "bg-teal-600/20",
              text: "text-teal-400",
              border: "border-teal-400/30"
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

          return (
            <div key={license.id} 
              className={`flex flex-col rounded-lg ${style.bg} p-3 border ${style.border} min-w-[200px]`}
            >
              <div className="flex items-center space-x-2 mb-2">
                {style.icon}
                <span className={`text-sm font-bold ${style.text}`}>{license.name}</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-400">
                  Streams: {formatStreamLimit(license.streamLimit)}
                </p>
                <p className="text-xs text-gray-400">
                  Video Clips: {formatVideoLimit(license.videoClipLimit)}
                </p>
                {!license.isExclusive && (
                  <>
                    <p className="text-xs text-gray-400">
                      Publishing: {license.publishingRoyalty}%
                    </p>
                    <p className="text-xs text-gray-400">
                      Master: {license.masterRoyalty}%
                    </p>
                  </>
                )}
                {license.isExclusive && (
                  <p className={`text-xs ${style.text} font-bold`}>
                    Exclusive Rights
                  </p>
                )}
                <p className={`text-sm font-bold ${style.text} mt-2`}>
                  ${license.basePrice}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between space-x-2 text-lg text-gray-300">
        <button
          onClick={() => handleAddToCart(selectedLicense)}
          className="flex items-center space-x-2 rounded-lg bg-teal-800 px-4 py-2 text-lg text-white transition-all duration-300 hover:scale-110 hover:bg-teal-700 hover:shadow-lg"
        >
          <FaShoppingCart /> <span>Add to Cart</span>
        </button>
        <span className="text-4xl font-bold text-cyan-300">
          {cheapestPrice ? `From $${cheapestPrice.toFixed(2)}` : 'Price not available'}
        </span>
      </div>
      <div className="h-px w-full bg-gray-700"></div>
      <div className="flex justify-around text-gray-400 lg:justify-start lg:space-x-10">
        <div className="flex flex-col lg:items-start">
          <span
            className="shadow-tag rounded-lg px-2 text-1xl text-white"
            style={{ fontFamily: '"Russo One"' }}
          >
            BPM {beat.bpm}
          </span>
        </div>
        <div className="flex flex-col lg:items-start">
          <span
            className="shadow-tag rounded-lg px-2 text-1xl text-white"
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
