/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import { getBeats, deleteBeat } from '../../../services/api/beats'
import { FaTrash } from 'react-icons/fa'
import CreateBeatForm from './CreateBeatForm/CreateBeatForm'

const ManageBeats = () => {
  const [beats, setBeats] = useState([])
  const [formOpen, setFormOpen] = useState([false])
  const [isImageLoaded, setImageLoaded] = useState(false)

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
    } catch (error) {
      console.error('Error fetching beats:', error)
    }
  }

  useEffect(() => {
    fetchBeats()
  }, [])

  return (
    <div className="shadow-header-shadow m-10 rounded-lg bg-gray-800 p-10">
      <div className="mx-10 flex justify-center">
        <button
          onClick={toggleForm}
          className="rounded-lg  px-8 py-2 text-lg text-white transition-all duration-300 hover:scale-110 hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/50"
        >
          Create Beat
        </button>
      </div>

      <CreateBeatForm formOpen={formOpen} />

      <div className="mx-auto max-w-5xl rounded-lg text-white">
        <div className="m-6 rounded-lg bg-gray-800 p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {beats.map((beat) => {
              return (
                <div
                  key={beat.id}
                  className="flex items-center rounded-lg border border-teal-600 bg-gray-800 p-4 transition-colors duration-300 ease-in-out hover:bg-gray-700"
                >
                  {/* Image Container */}
                  <div className="relative mr-4 size-32 shrink-0">
                    {/* Gray placeholder effect while image is loading */}
                    {!isImageLoaded && (
                      <div className="absolute inset-0 animate-pulse rounded-md bg-gray-700"></div>
                    )}

                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/${beat.image}`}
                      alt="Cover Art"
                      className={`size-full rounded-md object-cover transition-opacity duration-500 ${
                        isImageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => setImageLoaded(true)}
                    />
                  </div>

                  {/* Beat Information */}
                  <div className="flex grow flex-col text-left">
                    <h3 className="text-md mb-8 font-semibold text-white">
                      {beat.title}
                    </h3>
                    <p className="text-sm text-gray-400">BPM: {beat.bpm}</p>
                    <p className="text-sm text-gray-400">Tone: {beat.tone}</p>

                    {/* Flex container to keep Tone and Trash on the same line */}
                    <div className="mt-2 flex items-center justify-between">
                      <p className="mt-2 text-sm font-bold text-gray-400">
                        ${beat.price}
                      </p>

                      <button
                        onClick={() => handleDeleteBeat(beat.id)}
                        className="flex items-center justify-center rounded-full bg-red-600 p-2 text-white transition-all duration-300 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageBeats
