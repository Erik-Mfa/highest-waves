import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaInstagram, FaTwitter, FaChevronDown } from 'react-icons/fa'

// CSS for fadeIn animation
const fadeInStyle = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`

const Hero = () => {
  const navigate = useNavigate()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [overlayPositions, setOverlayPositions] = useState([])

  const heroImages = [
    '/assets/hero-images/rizzo-e-compania.jpeg',
    '/assets/hero-images/happy-young-african-american-man-with-dreadlocks-p-2025-03-09-11-02-13-utc.jpg',
    '/assets/hero-images/Large Screen Mockup 02.jpg',
    '/assets/hero-images/urban-hype-wide-angle-portrait-of-an-african-man-2025-02-12-00-45-53-utc.jpg',
    '/assets/hero-images/pexels-aleksandr-neplokhov-486399-1238941.jpg',
    '/assets/hero-images/pexels-aleksandr-neplokhov-486399-1238989.jpg',
    '/assets/hero-images/Whisk_e07fc315c9.jpg'
  ]

  // Generate random positions for overlay images
  const generateRandomPositions = () => {
    const positions = []
    for (let i = 0; i < 7; i++) { // Use all 7 images
      const quadrants = [
        // Top-left quadrant
        { top: `${Math.random() * 30 + 5}%`, left: `${Math.random() * 30 + 5}%`, right: undefined },
        // Top-center quadrant  
        { top: `${Math.random() * 30 + 5}%`, left: `${Math.random() * 20 + 35}%`, right: undefined },
        // Top-right quadrant
        { top: `${Math.random() * 30 + 5}%`, left: undefined, right: `${Math.random() * 30 + 5}%` },
        // Middle-left quadrant
        { top: `${Math.random() * 20 + 35}%`, left: `${Math.random() * 30 + 5}%`, right: undefined },
        // Middle-right quadrant
        { top: `${Math.random() * 20 + 35}%`, left: undefined, right: `${Math.random() * 30 + 5}%` },
        // Bottom-left quadrant
        { top: `${Math.random() * 30 + 45}%`, left: `${Math.random() * 30 + 5}%`, right: undefined },
        // Bottom-right quadrant
        { top: `${Math.random() * 30 + 45}%`, left: undefined, right: `${Math.random() * 30 + 5}%` }
      ]
      
      positions.push({
        top: quadrants[i].top,
        left: quadrants[i].left,
        right: quadrants[i].right,
        width: `${Math.random() * 200 + 250}px`,
        height: `${Math.random() * 150 + 200}px`,
        opacity: 0 // Start all images invisible
      })
    }
    return positions
  }

  useEffect(() => {
    // Set initial positions with all images invisible
    setOverlayPositions(generateRandomPositions())
  }, [])

  // Inject fadeIn CSS animation
  useEffect(() => {
    const styleElement = document.createElement('style')
    styleElement.textContent = fadeInStyle
    document.head.appendChild(styleElement)

    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  // Show overlay images one by one with proper pop-up effect
  useEffect(() => {
    // Clear any existing timers first
    const timers = []
    
    // Function to show a single image at random position
    const showImage = (imageIndex, delay) => {
      const timer = setTimeout(() => {
        // Generate new random position for this specific image in a specific quadrant
        const getQuadrantPosition = (imageIndex) => {
          const quadrants = [
            // Top-left quadrant
            { top: `${Math.random() * 30 + 5}%`, left: `${Math.random() * 30 + 5}%`, right: undefined },
            // Top-center quadrant  
            { top: `${Math.random() * 30 + 5}%`, left: `${Math.random() * 20 + 35}%`, right: undefined },
            // Top-right quadrant
            { top: `${Math.random() * 30 + 5}%`, left: undefined, right: `${Math.random() * 30 + 5}%` },
            // Middle-left quadrant
            { top: `${Math.random() * 20 + 35}%`, left: `${Math.random() * 30 + 5}%`, right: undefined },
            // Middle-right quadrant
            { top: `${Math.random() * 20 + 35}%`, left: undefined, right: `${Math.random() * 30 + 5}%` },
            // Bottom-left quadrant
            { top: `${Math.random() * 30 + 45}%`, left: `${Math.random() * 30 + 5}%`, right: undefined },
            // Bottom-right quadrant
            { top: `${Math.random() * 30 + 45}%`, left: undefined, right: `${Math.random() * 30 + 5}%` }
          ]
          return quadrants[imageIndex]
        }
        
        const quadrantPos = getQuadrantPosition(imageIndex)
        const newPosition = {
          top: quadrantPos.top,
          left: quadrantPos.left,
          right: quadrantPos.right,
          width: `${Math.random() * 200 + 250}px`,
          height: `${Math.random() * 150 + 200}px`,
          opacity: 1
        }
        
        // Show this image while keeping previous ones visible
        setOverlayPositions(prevPositions => 
          prevPositions.map((pos, i) => 
            i === imageIndex ? newPosition : pos
          )
        )
        
        // Keep this image visible (no hiding after 2 seconds)
      }, delay)
      
      timers.push(timer)
    }
    
    // Start the sequence: show each image with proper delays
    showImage(0, 500)    // First image at 500ms
    showImage(1, 3000)   // Second image at 3 seconds (500ms + 2.5s)
    showImage(2, 5500)   // Third image at 5.5 seconds (3s + 2.5s)
    showImage(3, 8000)   // Fourth image at 8 seconds (5.5s + 2.5s)
    showImage(4, 10500)  // Fifth image at 10.5 seconds (8s + 2.5s)
    showImage(5, 13000)  // Sixth image at 13 seconds (10.5s + 2.5s)
    showImage(6, 15500)  // Seventh image at 15.5 seconds (13s + 2.5s)
    
    // Don't restart cycle - let images stay visible until background changes
    
    // Cleanup all timers
    return () => {
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [currentImageIndex])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      )
      // Generate new random positions when image changes
      setOverlayPositions(generateRandomPositions())
    }, 20000) // Change image every 20 seconds (to allow full overlay cycle of 7 images)

    return () => clearInterval(interval)
  }, [heroImages.length])



  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
    )
    // Generate new random positions when manually changing
    setOverlayPositions(generateRandomPositions())
  }

  const goToImage = (index) => {
    setCurrentImageIndex(index)
    // Generate new random positions when manually changing
    setOverlayPositions(generateRandomPositions())
  }

  const handleNavigation = (path, sectionId) => {
    if (window.location.pathname === '/') {
      document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(path)
      setTimeout(() => {
        document
          .getElementById(sectionId)
          .scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <section
      className="page-container page-bg-overlay relative overflow-hidden"
      style={{
        minHeight: '95vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      {/* Main Background Image */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url('${heroImages[currentImageIndex]}')`,
            backgroundPosition: 'center top',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </div>

      {/* Overlay Images - Randomly positioned */}
      {overlayPositions.map((position, index) => (
        <div
          key={`${currentImageIndex}-${index}`}
          className="absolute overflow-hidden shadow-2xl hover:scale-110 hover:z-20"
          style={{
            top: position.top,
            left: position.left,
            right: position.right,
            width: position.width,
            height: position.height,
            zIndex: 5,
            opacity: position.opacity || 0
          }}
        >
          <img
            src={heroImages[(currentImageIndex + index + 1) % heroImages.length]}
            alt="Hero overlay"
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />



      {/* Content */}
      <div className="page-content-wrapper page-centered relative z-20">
        <div className="page-card page-padding-xl">
          <div className="page-text-center">
            <img 
              src="/assets/highestwaves-white-logo.png" 
              alt="Highest Waves Logo" 
              className="max-w-md mx-auto mb-6"
              style={{ maxHeight: '200px' }}
            />
            <p className="text-white text-xl font-medium">
              Catch the wave, drop the beat
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <ul>
          <li className="text-xl text-white transition-transform duration-200 hover:scale-110 hover:bg-opacity-70">
            <button onClick={() => handleNavigation('/', 'beats-section')}>
              <FaChevronDown size={24} />
            </button>
          </li>
        </ul>
      </div>

      <div className="absolute bottom-10 left-5 flex space-x-4 z-20">
        <a
          href="https://www.instagram.com/highestwavess/"
          className="text-white transition-colors duration-200"
          style={{ '&:hover': { color: 'var(--brand-light)' } }}
          onMouseEnter={(e) => e.target.style.color = 'var(--brand-light)'}
          onMouseLeave={(e) => e.target.style.color = 'white'}
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://twitter.com"
          className="text-white transition-colors duration-200"
          style={{ '&:hover': { color: 'var(--brand-medium)' } }}
          onMouseEnter={(e) => e.target.style.color = 'var(--brand-medium)'}
          onMouseLeave={(e) => e.target.style.color = 'white'}
        >
          <FaTwitter size={24} />
        </a>
      </div>
    </section>
  )
}

export default Hero
