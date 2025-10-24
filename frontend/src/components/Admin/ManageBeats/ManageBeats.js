/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import { getBeats, deleteBeat } from '../../../services/api/beats'
import { FaTrash } from 'react-icons/fa'
import CreateBeatForm from './CreateBeatForm/CreateBeatForm'

const ManageBeats = () => {
  const [beats, setBeats] = useState([])
  const [formOpen, setFormOpen] = useState([false])
  const [loadedImages, setLoadedImages] = useState(new Set())

  const handleDeleteBeat = async (beatId) => {
    try {
      const response = await deleteBeat(beatId)
      if (response.success) {
        setBeats(beats.filter((beat) => beat.id !== beatId))
        fetchBeats()
      } else {
        console.error('Failed to delete beat')
      }
    } catch (error) {
      console.error('Error deleting beat:', error)
    }
  }

  const toggleForm = () => {
    setFormOpen((prev) => !prev)
  }

  const fetchBeats = async () => {
    try {
      const data = await getBeats()
      setBeats(data)
      // Reset loaded images when beats change
      setLoadedImages(new Set())
    } catch (error) {
      console.error('Error fetching beats:', error)
    }
  }

  const handleImageLoad = (beatId) => {
    setLoadedImages(prev => new Set([...prev, beatId]))
  }

  useEffect(() => {
    fetchBeats()
  }, [])

  return (
    <div className="m-10 rounded-xl bg-white shadow-xl">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-brand-blue to-brand-blue-dark rounded-t-xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Manage Beats</h1>
            <p className="text-brand-gray-light opacity-90">Create and manage your beat collection</p>
          </div>
          <button
            onClick={toggleForm}
            className="bg-white text-brand-blue px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-white/30"
          >
            + Create Beat
          </button>
        </div>
      </div>

      <CreateBeatForm formOpen={formOpen} />

      {/* Beats Grid Section */}
      <div className="p-8">
        {beats.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 text-brand-gray">🎵</div>
            <h3 className="text-xl font-semibold text-brand-black mb-2">No beats yet</h3>
            <p className="text-brand-gray">Create your first beat to get started</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-brand-black">Your Beats ({beats.length})</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {beats.map((beat, index) => {
                return (
                  <div
                    key={beat.id}
                    className="group bg-white border border-brand-gray-light rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden">
                      {/* Loading placeholder */}
                      {!loadedImages.has(beat.id) && (
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-gray-light to-brand-gray animate-pulse"></div>
                      )}

                      <img
                        src={`${process.env.REACT_APP_BACKEND_URL}/${beat.image}`}
                        alt={`${beat.title} cover art`}
                        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                          loadedImages.has(beat.id) ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => handleImageLoad(beat.id)}
                      />
                      
                      {/* Overlay with delete button */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                        <button
                          onClick={() => handleDeleteBeat(beat.id)}
                          className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-500/30"
                          aria-label={`Delete ${beat.title}`}
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Beat Information */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-brand-black mb-4 line-clamp-2 group-hover:text-brand-blue transition-colors duration-300 leading-tight">
                        {beat.title}
                      </h3>
                      
                      {/* Beat Details with Better Contrast */}
                      <div className="bg-brand-blue/5 rounded-lg p-4 mb-4 border border-brand-blue/20">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-xs font-bold text-brand-blue uppercase tracking-wide mb-2">BPM</div>
                            <div className="text-xl font-black text-brand-black bg-white px-4 py-2 rounded-lg shadow-md border-2 border-brand-blue/30">
                              {beat.bpm}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs font-bold text-brand-blue uppercase tracking-wide mb-2">TONE</div>
                            <div className="text-xl font-black text-brand-black bg-white px-4 py-2 rounded-lg shadow-md border-2 border-brand-blue/30">
                              {beat.tone}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Price Section with Enhanced Styling */}
                      <div className="flex items-center justify-between pt-4 border-t-2 border-brand-blue/20">
                        <div className="flex items-center space-x-2">
                          <div className="text-2xl font-bold text-brand-blue">
                            ${beat.price}
                          </div>
                          <div className="text-sm text-brand-gray-dark font-medium">USD</div>
                        </div>
                        <div className="bg-brand-blue text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                          Beat #{index + 1}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ManageBeats
