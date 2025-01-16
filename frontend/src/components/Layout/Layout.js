import React, { useState, useEffect } from 'react'
import Header from '../Header/Header'
import { isAdmin, isAuthenticated } from '../../services/api/auth'
import {
  togglePlayPause,
  selectCurrentTrack,
  selectIsPlaying
} from '../../store/audioPlayerSlice'
import { useSelector, useDispatch } from 'react-redux'
import PurchaseCart from '../PurchaseCart/PurchaseCart'
import AudioPlayer from '../AudioPlayer/AudioPlayer'

const Layout = ({ children }) => {
  const [showPurchaseCart, setShowPurchaseCart] = useState(false)
  const [admin, setAdmin] = useState(null)
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const currentTrack = useSelector(selectCurrentTrack)
  const isPlaying = useSelector(selectIsPlaying)

  // Fetch user and admin info
  useEffect(() => {
    const fetchData = async () => {
      try {
        const authenticatedUser = await isAuthenticated()
        const isUserAdmin = authenticatedUser ? await isAdmin() : false

        setUser(authenticatedUser)
        setAdmin(isUserAdmin)
      } catch (error) {
        console.error('Error fetching user/admin data:', error)
        setUser(null)
        setAdmin(false)
      }
    }

    fetchData()

    // Periodic token validation (checks every 1 minute)
    const interval = setInterval(async () => {
      const authenticatedUser = await isAuthenticated()
      if (!authenticatedUser) {
        setUser(null)
        setAdmin(false)
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const handlePlayPause = () => {
    dispatch(togglePlayPause())
  }

  return (
    <>
      {/* Header Component */}
      <Header
        setShowPurchaseCart={setShowPurchaseCart}
        user={user}
        admin={admin}
      />

      {/* Main Content */}
      <main className="pt-16">{children}</main>

      {/* Purchase Cart Modal */}
      {showPurchaseCart && (
        <PurchaseCart onClose={() => setShowPurchaseCart(false)} />
      )}

      {/* Audio Player */}
      {currentTrack && (
        <AudioPlayer
          url={currentTrack}
          playing={isPlaying}
          onPlayPause={handlePlayPause}
        />
      )}
    </>
  )
}

export default Layout
