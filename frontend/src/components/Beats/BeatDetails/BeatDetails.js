/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthenticated } from '../../../services/api/auth'
import { getBeatById } from '../../../services/api/beats'
import { addToCartAndUpdate } from '../../../store/cartSlice'
import { FaPlay, FaPause, FaShoppingCart, FaCrown, FaStar, FaGem, FaMedal, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import ChooseLicenseMessage from '../../Messages/ChooseLicenseMessage/ChooseLicenseMessage'
import CannotPurchaseMessage from '../../Messages/CannotPurchaseMessage/CannotPurchaseMessage'
// License details dropdown is rendered inline within each card

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
  const licensesScrollerRef = useRef(null)
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
    const chosenLicense = license || selectedLicense
    if (!chosenLicense) {
      return
    }
    if (!user) {
      setPurchase(true)
      return
    }
    confirmPurchase(chosenLicense)
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

  const formatStreamLimit = (limit) => {
    if (limit === -1) return 'Unlimited'
    return Number(limit).toLocaleString()
  }

  const formatVideoLimit = (limit) => {
    if (limit === -1) return 'Unlimited'
    return limit
  }

  // Handling loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="loader"></div>
        <p className="text-xl text-brand-blue">Loading... Please wait.</p>
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
        <a href="/beats" className="mt-4 text-brand-blue hover:text-brand-blue-dark">
          Explore more beats
        </a>
      </div>
    )
  }

  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-start bg-brand-gradient p-20 pt-16 ${isFadeIn ? 'fade-in-active' : 'fade-in'}`}
    >
  

{purchase && !user && (
  <CannotPurchaseMessage onCancel={cancelDelete} />
)}

      <div className="flex w-full items-stretch panel rounded-2xl">
    {/* Left Side: Beat Image & Play Button */}
    <div className="flex w-1/3 items-center justify-center mr-6 h-full">
      {/* Image */}
        <div
          className="relative w-full cursor-pointer bg-brand-gradient rounded-2xl my-auto flex items-center justify-center"
        onClick={handlePlayTrack}
      >
        {/* Play/Pause button with hover effect */}
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/${beat.image}`}
              alt={beat.title}
              className="w-full aspect-square object-cover rounded-2xl"
            />
            <div className="absolute inset-0 flex items-center justify-center transition-all duration-[0.8s] ease-in-out rounded-2xl">
              <div className="flex size-full items-center justify-center bg-brand-overlay transition-all duration-[1.2s] ease-in-out hover:bg-opacity-0 rounded-2xl">
            {currentTrack ===
              `${process.env.REACT_APP_BACKEND_URL}/${beat.audioURL}` &&
            isPlaying ? (
                  <FaPause size={64} className="text-brand-light transition-all duration-[1.2s] ease-in-out hover:scale-125" />
            ) : (
                  <FaPlay size={64} className="text-brand-light transition-all duration-[1.2s] ease-in-out hover:scale-125" />
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Right Side: Beat Info */}
        <div className="flex w-2/3 flex-col space-y-6 text-brand-contrast">
      <div className="space-y-4">
            <h2 className="text-3xl font-extrabold tracking-wide text-brand-contrast">
        {beat.title}
      </h2>
            <p className="flex items-center space-x-2 text-lg text-brand-contrast">
              <span className="font-semibold text-brand-light">By:</span>
        <span>{beat.owner.username}</span>
      </p>

        {/* BPM and TONE - moved up here for better visibility */}
            <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
                <span className="text-sm text-brand-contrast">BPM:</span>
                <span className="badge text-lg">
              {beat.bpm}
            </span>
          </div>
          <div className="flex items-center space-x-2">
                <span className="text-sm text-brand-contrast">TONE:</span>
                <span className="badge text-lg">
              {beat.tone}
            </span>
          </div>
        </div>
      </div>

      {/* Licenses Row (single row with horizontal scroll on small screens) */}
      <div className="relative my-1 edges-fade border-y border-white/10 py-1">
        {/* Scroll Left Button */}
        <button
          type="button"
          aria-label="Scroll licenses left"
          onClick={() => {
            const el = licensesScrollerRef.current
            if (el) {
              el.scrollBy({ left: -Math.round(el.clientWidth * 0.8), behavior: 'smooth' })
            }
          }}
          className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center text-brand-light transition-transform duration-300 hover:scale-110"
        >
          <FaChevronLeft size={28} />
        </button>

        {/* Scrollable Row */}
        <div ref={licensesScrollerRef} className="licenses-row flex w-full gap-3 lg:gap-4 overflow-x-auto no-scrollbar smooth-scroll snap-x snap-mandatory px-6 lg:px-8">
        {beat.licenses && beat.licenses.map((license) => {
          const licenseStyles = {
            gold: {
              icon: <FaMedal className="text-2xl text-yellow-400" />,
              text: "text-yellow-400",
              border: "border-yellow-400/30",
              borderSelected: "border-yellow-400/60",
              gradient: "from-yellow-600/10 to-yellow-800/10"
            },
            platinum: {
              icon: <FaStar className="text-2xl text-slate-400" />,
              text: "text-slate-400",
              border: "border-slate-400/30",
              borderSelected: "border-slate-400/60",
              gradient: "from-slate-600/10 to-slate-800/10"
            },
            diamond: {
              icon: <FaGem className="text-2xl text-brand-blue" />,
              text: "text-brand-blue",
              border: "border-brand-blue/30",
              borderSelected: "border-brand-blue/60",
              gradient: "from-brand-blue/10 to-brand-blue-dark/10"
            },
            exclusive: {
              icon: <FaCrown className="text-2xl text-purple-400" />,
              text: "text-purple-400",
              border: "border-purple-400/30",
              borderSelected: "border-purple-400/60",
              gradient: "from-purple-600/10 to-purple-800/10"
            }
          }
          const style = licenseStyles[license.icon] || licenseStyles.gold
          const isSelected = selectedLicense?.id === license.id
          const isCompressed = !!selectedLicense && selectedLicense.id !== license.id

          return (
            <div
              key={license.id}
              onClick={() => setSelectedLicense(license)}
              className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${style.gradient} backdrop-blur-sm border transform-gpu cursor-pointer smooth-transition-long will-change-transform scale-fade-in gpu-smooth snap-start ${
                isSelected
                  ? `z-10 border-2 ${style.borderSelected} p-4 lg:p-4 min-h-[240px] min-w-[380px]`
                  : isCompressed
                  ? `${style.border} p-2 h-[100px] min-w-[160px] flex flex-col justify-center`
                  : `${style.border} p-2 h-[100px] min-w-[160px] flex flex-col justify-center`
              }`}
            >
              <div className={`flex items-center justify-between mb-2 transition-opacity duration-500 opacity-100`}>
                {style.icon}
                <span className={`text-base font-bold ${style.text}`}>${license.basePrice}</span>
              </div>
              <h3 className={`text-base font-bold ${style.text} transition-opacity duration-500 opacity-100`}>{license.name}</h3>

              {/* Inline overlay details (no layout push) */}
              {isSelected && (
                <div
                  className={`absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black/85 to-black/40 backdrop-blur-md p-3 lg:p-3 border-t ${style.border} max-h-[18rem] min-h-[120px] overflow-y-auto z-20 smooth-transition-long will-change-transform scale-fade-in gpu-smooth`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-brand-contrast font-semibold text-xs md:text-sm">{license.name}</h4>
                    <span className={`${style.text} font-bold text-xs md:text-sm`}>${Number(license.basePrice).toFixed(2)}</span>
                  </div>

                  {license.description && (
                    <p className="text-xs md:text-sm text-brand-contrast/90 mb-2 leading-snug">{license.description}</p>
                  )}
                  <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
                    <div className={`flex items-center justify-between bg-black/25 p-2 rounded-md border ${style.border}`}>
                      <span className="text-brand-contrast/80">Streams</span>
                      <span className={`${style.text} font-semibold`}>{formatStreamLimit(license.streamLimit)}</span>
                    </div>
                    <div className={`flex items-center justify-between bg-black/25 p-2 rounded-md border ${style.border}`}>
                      <span className="text-brand-contrast/80">Video Clips</span>
                      <span className={`${style.text} font-semibold`}>{formatVideoLimit(license.videoClipLimit)}</span>
                    </div>
                    <div className={`flex items-center justify-between bg-black/25 p-2 rounded-md border ${style.border}`}>
                      <span className="text-brand-contrast/80">Publishing</span>
                      <span className={`${style.text} font-semibold`}>{license.publishingRoyalty}%</span>
                    </div>
                    <div className={`flex items-center justify-between bg-black/25 p-2 rounded-md border ${style.border}`}>
                      <span className="text-brand-contrast/80">Master</span>
                      <span className={`${style.text} font-semibold`}>{license.masterRoyalty}%</span>
                    </div>
                  </div>
                  {license.terms && (
                    <p className="mt-2 text-[10px] md:text-xs text-brand-contrast/70">Terms: {license.terms}</p>
                  )}
                </div>
              )}
            </div>
          )
        })}
        </div>

        {/* Scroll Right Button */}
        <button
          type="button"
          aria-label="Scroll licenses right"
          onClick={() => {
            const el = licensesScrollerRef.current
            if (el) {
              el.scrollBy({ left: Math.round(el.clientWidth * 0.8), behavior: 'smooth' })
            }
          }}
          className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center text-brand-light transition-transform duration-300 hover:scale-110"
        >
          <FaChevronRight size={28} />
        </button>
      </div>

      {/* Selected License Details are shown inline via dropdown inside the chosen card */}

      {/* Call-to-Action Section */}
        <div className="mt-8 panel bg-brand-gradient p-6 rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-3">
              <h3 className="text-xl font-bold text-brand-contrast">Ready to get this beat?</h3>
              <p className="text-brand-contrast">Choose a license above and add to your cart</p>
            <div className="flex items-center space-x-2">
                <span className="text-sm text-brand-contrast">Starting from</span>
                <span className="text-2xl font-bold text-brand-light">
                {cheapestPrice ? `$${cheapestPrice.toFixed(2)}` : 'Price not available'}
              </span>
            </div>
          </div>
          
        <button
          onClick={() => handleAddToCart(selectedLicense)}
          disabled={!selectedLicense}
          className={`px-8 py-4 ${selectedLicense ? 'btn-primary' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
        >
          <div className="flex items-center space-x-3">
            <FaShoppingCart className={`text-xl ${selectedLicense ? 'text-brand-contrast' : 'text-gray-400'}`} />
            <span className={`text-lg font-semibold ${selectedLicense ? 'text-brand-contrast' : 'text-gray-400'}`}>
              {selectedLicense ? 'Add to Cart' : 'Select a License'}
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
