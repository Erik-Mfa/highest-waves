/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import { createBeat, getBeats, deleteBeat } from '../../../services/api/beats'
import { FaImage, FaVideo, FaChevronDown, FaTrash } from 'react-icons/fa'
import { getTags } from '../../../services/api/tags'
import UserRegisterError from '../../Error/UserRegisterError/UserRegisterError' // Adjust import path

const ManageBeats = () => {
  const [beatDetails, setBeatDetails] = useState({
    title: '',
    description: '',
    price: '',
    bpm: '',
    tone: '',
    image: '',
    audioURL: '',
    owner: '',
    tags: []
  })

  const [tags, setTags] = useState([])
  const [beats, setBeats] = useState([])
  const [isFormDropdownOpen, setIsFormDropdownOpen] = useState(false)
  const [isTagsDropdownOpen, setIsTagsDropdownOpen] = useState(false)
  const [imageName, setImageName] = useState('No file chosen')
  const [audioName, setAudioName] = useState('No file chosen')
  const [validationErrors, setValidationErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [isImageLoaded, setImageLoaded] = useState(false)

  const validateForm = () => {
    const errors = {}

    if (!beatDetails.title) errors.title = 'Title is required'
    if (!beatDetails.description) errors.description = 'Description is required'
    if (!beatDetails.price) errors.price = 'Price is required'
    if (!beatDetails.bpm) errors.bpm = 'BPM is required'
    if (!beatDetails.tone) errors.tone = 'Tone is required'
    if (!beatDetails.image) errors.image = 'Image is required'
    if (!beatDetails.audioURL) errors.audioURL = 'Audio file is required'

    setValidationErrors(errors)

    return Object.keys(errors).length === 0
  }

  const handleCreateBeat = async () => {
    if (!validateForm()) return // Prevent submission if there are validation errors

    try {
      const response = await createBeat(beatDetails)
      if (response.success) {
        setSuccessMessage('Beat created successfully!')
        setBeatDetails({
          title: '',
          description: '',
          price: '',
          bpm: '',
          tone: '',
          image: '',
          audioURL: '',
          owner: '',
          tags: []
        })
        setIsFormDropdownOpen(false)
        fetchBeats()
        setTimeout(() => setSuccessMessage(''), 3000) // Fade out message after 3 seconds
      } else {
        console.error('Failed to create beat')
      }
    } catch (error) {
      console.error('Error creating beat:', error)
    }
  }

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

  const fetchBeats = async () => {
    try {
      const data = await getBeats()
      setBeats(data)
    } catch (error) {
      console.error('Error fetching beats:', error)
    }
  }

  const fetchTags = async () => {
    try {
      const tags = await getTags()
      setTags(tags)
    } catch (error) {
      console.error('Error fetching tags:', error)
    }
  }

  useEffect(() => {
    fetchTags()
    fetchBeats()
  }, [])

  const toggleFormDropdown = () => {
    setIsFormDropdownOpen(!isFormDropdownOpen)
    setIsTagsDropdownOpen(false) // Ensure tags dropdown is closed when form dropdown is toggled
  }

  const toggleTagsDropdown = () => {
    setIsTagsDropdownOpen(!isTagsDropdownOpen)
  }

  const handleTagSelect = (tagId) => {
    const newTags = beatDetails.tags.includes(tagId)
      ? beatDetails.tags.filter((id) => id !== tagId)
      : [...beatDetails.tags, tagId]

    setBeatDetails({ ...beatDetails, tags: newTags })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setBeatDetails({ ...beatDetails, image: file })
      setImageName(file.name)
    }
  }

  const handleAudioChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setBeatDetails({ ...beatDetails, audioURL: file })
      setAudioName(file.name)
    }
  }

  return (
    <div className="shadow-header-shadow m-10 rounded-lg bg-gray-800 p-10">
      {successMessage && (
        <div className="mb-8 rounded-md bg-green-600 px-4 py-2 text-white transition-opacity duration-300 ease-in-out">
          {successMessage}
        </div>
      )}

      <div className="mx-10 flex justify-center">
        <button
          onClick={toggleFormDropdown}
          className="rounded-lg bg-teal-800 px-8 py-2 text-lg text-white transition-all duration-300 hover:scale-110 hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/50"
        >
          Create Beat
        </button>
      </div>

      {isFormDropdownOpen && (
        <form className="mx-12 mb-8 mt-6 rounded-lg bg-gray-800 py-10">
          {/* Title */}
          <div className="mx-10 mb-8">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter beat title"
              value={beatDetails.title}
              onChange={(e) =>
                setBeatDetails({ ...beatDetails, title: e.target.value })
              }
              className={`mt-1 block w-full border px-4 py-2 ${validationErrors.title ? 'border-red-500' : 'border-gray-600'} rounded-md bg-gray-900 text-white shadow-sm transition-transform duration-300 hover:scale-105 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm`}
            />
            {validationErrors.title && (
              <p className="text-sm text-red-500">{validationErrors.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="mx-10 mb-8">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter beat description"
              value={beatDetails.description}
              onChange={(e) =>
                setBeatDetails({ ...beatDetails, description: e.target.value })
              }
              className={`mt-1 block w-full border px-4 py-2 ${validationErrors.description ? 'border-red-500' : 'border-gray-600'} rounded-md bg-gray-900 text-white shadow-sm transition-transform duration-300 hover:scale-105 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm`}
            />
            {validationErrors.description && (
              <p className="text-sm text-red-500">
                {validationErrors.description}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="mx-10 mb-8">
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-medium text-white"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              placeholder="Enter beat price"
              value={beatDetails.price}
              onChange={(e) =>
                setBeatDetails({ ...beatDetails, price: e.target.value })
              }
              className={`mt-1 block w-full border px-4 py-2 ${validationErrors.price ? 'border-red-500' : 'border-gray-600'} rounded-md bg-gray-900 text-white shadow-sm transition-transform duration-300 hover:scale-105 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm`}
            />
            {validationErrors.price && (
              <p className="text-sm text-red-500">{validationErrors.price}</p>
            )}
          </div>

          {/* BPM */}
          <div className="mx-10 mb-8">
            <label
              htmlFor="bpm"
              className="mb-2 block text-sm font-medium text-white"
            >
              BPM
            </label>
            <input
              type="text"
              id="bpm"
              placeholder="Enter BPM"
              value={beatDetails.bpm}
              onChange={(e) =>
                setBeatDetails({ ...beatDetails, bpm: e.target.value })
              }
              className={`mt-1 block w-full border px-4 py-2 ${validationErrors.bpm ? 'border-red-500' : 'border-gray-600'} rounded-md bg-gray-900 text-white shadow-sm transition-transform duration-300 hover:scale-105 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm`}
            />
            {validationErrors.bpm && (
              <p className="text-sm text-red-500">{validationErrors.bpm}</p>
            )}
          </div>

          {/* Tone */}
          <div className="mx-10 mb-8">
            <label
              htmlFor="tone"
              className="mb-2 block text-sm font-medium text-white"
            >
              Tone
            </label>
            <input
              type="text"
              id="tone"
              placeholder="Enter tone"
              value={beatDetails.tone}
              onChange={(e) =>
                setBeatDetails({ ...beatDetails, tone: e.target.value })
              }
              className={`mt-1 block w-full border px-4 py-2 ${validationErrors.tone ? 'border-red-500' : 'border-gray-600'} rounded-md bg-gray-900 text-white shadow-sm transition-transform duration-300 hover:scale-105 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm`}
            />
            {validationErrors.tone && (
              <p className="text-sm text-red-500">{validationErrors.tone}</p>
            )}
          </div>

          <div className="flex justify-center">
            {/* Image */}
            <div className="mx-10 mb-8">
              <label
                htmlFor="image"
                className="block p-2 text-center text-sm font-medium text-white"
              >
                Image
              </label>
              <div className="flex items-center">
                <label className="flex cursor-pointer items-center rounded-md bg-gray-700 px-3 py-2 shadow-sm hover:bg-gray-600">
                  <FaImage className="mr-2" />
                  <span>{imageName}</span>
                  <input
                    type="file"
                    id="image"
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
              {validationErrors.image && (
                <p className="text-sm text-red-500">{validationErrors.image}</p>
              )}
            </div>

            {/* Audio File */}
            <div className="mx-10 mb-8">
              <label
                htmlFor="audioURL"
                className="block p-2 text-center text-sm font-medium text-white"
              >
                Audio
              </label>
              <div className="flex items-center">
                <label className="flex cursor-pointer items-center rounded-md bg-gray-700 px-3 py-2 shadow-sm hover:bg-gray-600">
                  <FaVideo className="mr-2" />
                  <span>{audioName}</span>
                  <input
                    type="file"
                    id="audioURL"
                    onChange={handleAudioChange}
                    className="hidden"
                    accept="audio/*"
                  />
                </label>
              </div>
              {validationErrors.audioURL && (
                <p className="text-sm text-red-500">
                  {validationErrors.audioURL}
                </p>
              )}
            </div>
          </div>

          {/* Tags Dropdown */}
          <div className="mx-10 mb-8">
            <label
              htmlFor="tags"
              className="mb-2 block text-sm font-medium text-white"
            >
              Tags
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={toggleTagsDropdown}
                className="w-full rounded-md border border-gray-600 bg-gray-900 px-4 py-2 text-left text-white shadow-sm hover:bg-gray-800"
              >
                Select Tags <FaChevronDown className="ml-2 inline-block" />
              </button>
              {isTagsDropdownOpen && (
                <div className="absolute z-10 mt-2 w-full rounded-md border border-gray-600 bg-gray-900 shadow-lg">
                  {tags.map((tag) => (
                    <div
                      key={tag.id}
                      className={`cursor-pointer px-4 py-2 ${
                        beatDetails.tags.includes(tag.id)
                          ? 'bg-cyan-600 text-white'
                          : 'text-white hover:bg-gray-800'
                      }`}
                      onClick={() => handleTagSelect(tag.id)}
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Create Beat */}
          <div className="mx-10 mb-8">
            <button
              type="button"
              onClick={handleCreateBeat}
              className="w-full rounded-md border border-transparent bg-cyan-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:bg-cyan-700"
            >
              Create Beat
            </button>
          </div>

          {/* Form validation errors */}
          {Object.keys(validationErrors).length > 0 && (
            <UserRegisterError message="Please fix the errors above and try again." />
          )}
        </form>
      )}

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
                      src={`${process.env.REACT_APP_API_URL}/${beat.image}`}
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
